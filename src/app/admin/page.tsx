import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Site admin",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin/" },
};
export default function AdminPage() {
  return <AdminPanel />;
}
