"use client";

import AdminSidebarLink from "@/components/admin/layout/AdminSidebarLink";
import AdminSidebarUser from "@/components/admin/layout/AdminSidebarUser";
import { FiGrid, FiUploadCloud, FiFolder, FiSettings } from "react-icons/fi";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: FiGrid },
  { href: "/admin/uploads", label: "Uploads", icon: FiUploadCloud },
  { href: "/admin/categories", label: "Categories", icon: FiFolder },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-[200px] bg-primary-light border-r border-secondary-dark/10 flex flex-col z-40">
      <div className="px-6 py-8">
        <span className="text-secondary-dark text-sm font-light tracking-wide">
          Admin Panel
        </span>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <AdminSidebarLink key={link.href} {...link} />
          ))}
        </ul>
      </nav>

      <AdminSidebarUser />
    </aside>
  );
}
