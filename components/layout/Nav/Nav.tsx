"use client"

import useHandleScroll from "@/hooks/useHandleScroll"
import NavTitle from "./NavTitle"
import NavLinks from "./NavLinks"

const Nav = () => {
    const scrolled = useHandleScroll({threshold: 20})

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