"use client"

import { useState, useEffect } from "react"
import NavTitle from "./NavTitle"
import NavLinks from "./NavLinks"

const Nav = () => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navStyles = {
        base: "flex justify-between items-center px-[32px] sticky top-0 z-50 transition-all duration-300 bg-[#131313]/80 backdrop-blur-md",
        scrolled: "py-[12px] shadow-sm shadow-black/20",
        default: "py-[24px]"
    }

    return (
        <nav className={`${navStyles.base} ${scrolled ? navStyles.scrolled : navStyles.default}`}>
            <NavTitle />
            <NavLinks />
        </nav>
    )
}

export default Nav