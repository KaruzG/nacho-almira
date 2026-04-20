import FooterLinks from "./FooterLinks"

const Footer = () => {
    return (
        <footer className="flex flex-col justify-between items-center p-6 md:p-12 text-secondary-dark text-sm md:text-base" >
            <div className="flex w-full border-t border-secondary-dark py-2"></div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full mt-4 px-0 md:px-6 gap-4 md:gap-0">
                <p className="text-center md:text-left">© 2026 Nacho Almira. All rights reserved.</p>
                <FooterLinks />
            </div>
        </footer>
    )
}

export default Footer