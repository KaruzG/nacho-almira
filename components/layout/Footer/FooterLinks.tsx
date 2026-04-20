"use client"

import Link from "next/link";

const NavLinks = () => {

    const navLinksStyles = {
        base: "text-[14px] transition-colors hover:text-secondary"
    }

    const navLinks = [
        { href: "/", label: "INSTAGRAM" },
        { href: "/contact", label: "CONTACT" },
    ]

    const renderNavLinks = () => {
        return navLinks.map((link) => (
            <li key={link.href}>
                <Link
                    href={link.href}
                    className={navLinksStyles.base}
                >
                    {link.label}
                </Link>
            </li>
        ))
    }

    return (
        <ul className="flex gap-12">
            {renderNavLinks()}
        </ul>
    )
};

export default NavLinks;
