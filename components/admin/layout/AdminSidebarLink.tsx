"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface AdminSidebarLinkProps {
  href: string;
  label: string;
  icon: IconType;
}

const linkStyles = {
  base: "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 border-l-[3px]",
  active: "text-accent border-accent bg-accent/5",
  inactive: "text-secondary-dark border-transparent hover:text-secondary hover:bg-secondary/5",
};

export default function AdminSidebarLink({ href, label, icon: Icon }: AdminSidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`${linkStyles.base} ${isActive ? linkStyles.active : linkStyles.inactive}`}
      >
        <Icon size={18} />
        {label}
      </Link>
    </li>
  );
}
