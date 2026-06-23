import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky top-0 z-50 sticky-wrapper${scrolled ? ' scrolled' : ''}`}>
      <div className="px-4 md:px-[50px] py-4 bg-[#F9EFE7]">
        <header className="flex justify-between items-center px-5 md:px-[60px] bg-[#1E2235] rounded-3xl text-[#F9EFE7]">

          {/* Logo */}
          <div>
            <h2 className="font-bold text-lg">Henrique Andraus</h2>
          </div>

          {/* Nav desktop */}
          <nav className="hidden md:block">
            <ul className="flex list-none gap-[80px] py-5">
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          {/* Localização desktop */}
          <h5 className="hidden md:block text-[#F9EFE7]/50 text-sm font-normal">
            Based in Curitiba, Brazil
          </h5>

          {/* Botão hamburger mobile */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 py-4"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#F9EFE7] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#F9EFE7] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#F9EFE7] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

        </header>

        {/* Menu mobile dropdown */}
        {menuOpen && (
          <nav className="md:hidden bg-[#1E2235] rounded-2xl mt-2 mx-0 px-6 py-4">
            <ul className="flex flex-col list-none gap-4 text-center">
              <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
              <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
              <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}
