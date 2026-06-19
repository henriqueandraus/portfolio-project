import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky top-0 z-50 sticky-wrapper${scrolled ? ' scrolled' : ''}`}>
      <div className="px-[50px] py-4 bg-[#F9EFE7]">
        <header className="flex justify-between items-center px-[60px] bg-[#1E2235] rounded-3xl text-[#F9EFE7]">
          <div>
            <h2 className="font-bold text-lg">Henrique Andraus</h2>
          </div>
          <nav>
            <ul className="flex list-none gap-[80px] py-5">
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <h5 className="text-[#F9EFE7]/50 text-sm font-normal">Based in Curitiba, Brazil</h5>
        </header>
      </div>
    </div>
  )
}
