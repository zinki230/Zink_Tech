"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  adminAuthConfigured,
  adminPasswordSetupState,
  createAdminPasswordOnce,
  destroyAdminSession,
  establishAdminSession,
  requireAdminSession,
} from "@/lib/admin-auth";

export async function createInitialAdminPassword(formData: FormData) {
  if (adminPasswordSetupState() !== "setup") {
    redirect("/admin/connexion?verrouille=1");
  }

  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  let hostname = "";
  try {
    hostname = new URL(`http://${host}`).hostname.toLowerCase();
  } catch {
    redirect("/admin/connexion?creation=local");
  }
  if (!["localhost", "127.0.0.1", "[::1]", "::1"].includes(hostname)) {
    redirect("/admin/connexion?creation=local");
  }

  const password = String(formData.get("password") || "");
  const confirmation = String(formData.get("confirmation") || "");

  if (password !== confirmation) redirect("/admin/connexion?creation=confirmation");
  const result = await createAdminPasswordOnce(password);
  if (result === "created") redirect("/admin/connexion?cree=1");
  if (result === "locked") redirect("/admin/connexion?verrouille=1");
  if (result === "weak-password") redirect("/admin/connexion?creation=longueur");
  redirect("/admin/connexion?creation=erreur");
}

export async function loginAdmin(formData: FormData) {
  if (!adminAuthConfigured()) redirect("/admin/connexion?configuration=requise");
  const password = String(formData.get("password") || "");
  if (!(await establishAdminSession(password))) {
    redirect("/admin/connexion?erreur=1");
  }
  redirect("/admin");
}

export async function logoutAdmin() {
  await requireAdminSession();
  await destroyAdminSession();
  redirect("/admin/connexion");
}
