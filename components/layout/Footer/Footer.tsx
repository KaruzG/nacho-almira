import FooterLinks from "./FooterLinks"

const Footer = () => {
    return (
        <footer className="flex flex-col justify-between items-center p-12 text-secondary-dark" >
            <div className="flex py-2  w-full border-t border-secondary-dark"></div>
            <div className="flex justify-between w-full mt-4 px-6">
                <p>© 2026 Nacho Almira. All rights reserved.</p>
                <FooterLinks />
            </div>
        </footer>
    )
}

export default Footer