import "server-only";

import { createHmac, createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdir, open } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "zink_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;
const CREDENTIAL_FILE = join(process.cwd(), "data", "admin-credentials.json");

type StoredCredential = { version: 1; salt: string; hash: string; createdAt: string };

function readStoredCredential() {
  if (!existsSync(CREDENTIAL_FILE)) return { locked: false, credential: null };
  try {
    const parsed = JSON.parse(readFileSync(CREDENTIAL_FILE, "utf8")) as StoredCredential;
    if (
      parsed.version !== 1 ||
      !/^[a-f0-9]{32}$/i.test(parsed.salt) ||
      !/^[a-f0-9]{128}$/i.test(parsed.hash) ||
      typeof parsed.createdAt !== "string"
    ) {
      return { locked: true, credential: null };
    }
    return { locked: true, credential: parsed };
  } catch {
    // Fail closed: an existing but unreadable credential store must never reopen setup.
    return { locked: true, credential: null };
  }
}

export function adminAuthConfigured() {
  return Boolean(
    process.env.ADMIN_SESSION_SECRET &&
      process.env.ADMIN_SESSION_SECRET.length >= 32,
  );
}

export function adminPasswordSetupState(): "unconfigured" | "setup" | "locked" {
  if (!adminAuthConfigured()) return "unconfigured";
  return readStoredCredential().locked ? "locked" : "setup";
}

function sign(expiry: string) {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(`zink-admin:v1:${expiry}`)
    .digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

export async function establishAdminSession(password: string) {
  if (!adminAuthConfigured()) return false;
  const stored = readStoredCredential();
  if (stored.locked) {
    if (!stored.credential) return false;
    const expected = Buffer.from(stored.credential.hash, "hex");
    const actual = scryptSync(password, Buffer.from(stored.credential.salt, "hex"), 64);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;
  } else {
    return false;
  }

  const expiry = String(Date.now() + SESSION_SECONDS * 1000);
  const token = `${expiry}.${sign(expiry)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
  return true;
}

export async function createAdminPasswordOnce(
  password: string,
): Promise<"created" | "locked" | "weak-password" | "storage-error"> {
  if (!adminAuthConfigured()) return "storage-error";
  if (readStoredCredential().locked) return "locked";
  if (password.length < 12) return "weak-password";

  const salt = randomBytes(16);
  const record: StoredCredential = {
    version: 1,
    salt: salt.toString("hex"),
    hash: scryptSync(password, salt, 64).toString("hex"),
    createdAt: new Date().toISOString(),
  };

  try {
    await mkdir(dirname(CREDENTIAL_FILE), { recursive: true });
    const file = await open(CREDENTIAL_FILE, "wx", 0o600);
    try {
      await file.writeFile(JSON.stringify(record), "utf8");
      await file.sync();
    } finally {
      await file.close();
    }
    return "created";
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EEXIST" ? "locked" : "storage-error";
  }
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminSessionValid() {
  if (!adminAuthConfigured()) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [expiry, signature, extra] = token.split(".");
  if (!expiry || !signature || extra || !/^\d+$/.test(expiry)) return false;
  if (Number(expiry) <= Date.now()) return false;
  return safeEqual(signature, sign(expiry));
}

export async function requireAdminSession() {
  if (!(await isAdminSessionValid())) redirect("/admin/connexion");
}
