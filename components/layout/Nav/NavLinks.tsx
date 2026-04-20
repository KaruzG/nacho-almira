"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    const pathname = usePathname()

    const navLinksStyles = {
        base: "text-[14px] transition-colors",
        active: "text-accent underline underline-offset-4 decoration-2",
        inactive: "text-secondary hover:text-accent"
    }

    const navLinks = [
        { href: "/", label: "PROJECTS" },
        { href: "/contact", label: "CONTACT" },
    ]

    const renderNavLinks = () => {
        return navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
                <li key={link.href} className={isActive ? "hidden md:block" : ""}>
                    <Link 
                        href={link.href} 
                        className={`text-[14px] transition-colors ${
                            isActive 
                                ? navLinksStyles.active 
                                : navLinksStyles.inactive
                        }`}
                    >
                        {link.label}
                    </Link>
                </li>
            )
        })
    }

  return (
    <ul className="flex gap-6 md:gap-12">
        {renderNavLinks()}
    </ul>
  )
};

export default NavLinks;
