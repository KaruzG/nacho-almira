import Link from 'next/link'

const NavTitle = () => {
  return (
    <div>
        <Link href="/" className="text-[18px] md:text-[20px] font-bold transition-all duration-200 hover:[text-shadow:0_0_1px_var(--color-secondary)]">NACHO ALMIRA</Link>
    </div>
  )
}

export default NavTitle