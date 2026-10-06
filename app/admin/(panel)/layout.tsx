import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/admin-data";
import type { Metadata } from "next";

export const runtime = "nodejs";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdminSession();
  return <AdminShell databaseConnected={isDatabaseConfigured()}>{children}</AdminShell>;
}
