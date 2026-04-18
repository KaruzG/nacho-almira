import NavTitle from "./NavTitle"
import NavLinks from "./NavLinks"

const Nav = () => {

    return (
        <nav className="flex justify-between items-center px-[32px] py-[24px]">
            <NavTitle />
            <NavLinks />
        </nav>
    )
}

export default Nav