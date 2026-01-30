import { useState } from 'react'
import { Spark } from 'iconoir-react'
import Logo from './Logo'

function Navbar({ mode = 'light' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const isLight = mode === 'light'
  const logoFill = isLight ? '#110000' : '#F5F0E8'

  const scrollToSection = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full flex flex-col justify-center items-center ${menuOpen ? "backdrop-blur-md md:backdrop-blur-none" : ""}`}>
      <div className="container-main py-5 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="cursor-pointer transition-opacity duration-300 hover:opacity-80" 
          onClick={() => scrollToSection('hero')}
        >
          <Logo 
            fill={logoFill} 
            className="h-10 md:h-12 w-auto transition-all duration-500"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => scrollToSection('about')}
            className={`font-semibold text-sm tracking-wide transition-colors duration-500 hover:opacity-70 ${
              isLight ? 'text-[#2A1810]' : 'text-[#F5F0E8]'
            }`}
          >
            ABOUT
          </button>
          <button 
            onClick={() => scrollToSection('programs')}
            className={`font-semibold text-sm tracking-wide transition-colors duration-500 hover:opacity-70 ${
              isLight ? 'text-[#2A1810]' : 'text-[#F5F0E8]'
            }`}
          >
            PROGRAMS
          </button>
          <button 
            onClick={() => scrollToSection('impact')}
            className={`font-semibold text-sm tracking-wide transition-colors duration-500 hover:opacity-70 ${
              isLight ? 'text-[#2A1810]' : 'text-[#F5F0E8]'
            }`}
          >
            IMPACT
          </button>
          <button 
            onClick={() => scrollToSection('involved')}
            className={`px-4 py-2 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 flex items-center gap-2 ${
              isLight 
                ? 'bg-[#2A1810] text-[#F5F0E8] hover:bg-[#3D2A1F]' 
                : 'bg-[#F5F0E8] text-[#2A1810] hover:bg-white'
            }`}
          >
            GET INVOLVED
            <Spark className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            className={`transition-colors duration-500 ${isLight ? 'text-[#2A1810]' : 'text-[#F5F0E8]'}`}
          >
            {menuOpen ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 w-full ${
        menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 flex flex-col gap-4">
          <button 
            onClick={() => scrollToSection('about')}
            className={`font-semibold text-sm tracking-wide text-left py-2 ${
              isLight ? 'text-[#2A1810]' : 'text-[#F5F0E8]'
            }`}
          >
            ABOUT
          </button>
          <button 
            onClick={() => scrollToSection('programs')}
            className={`font-semibold text-sm tracking-wide text-left py-2 ${
              isLight ? 'text-[#2A1810]' : 'text-[#F5F0E8]'
            }`}
          >
            PROGRAMS
          </button>
          <button 
            onClick={() => scrollToSection('impact')}
            className={`font-semibold text-sm tracking-wide text-left py-2 ${
              isLight ? 'text-[#2A1810]' : 'text-[#F5F0E8]'
            }`}
          >
            IMPACT
          </button>
          <button 
            onClick={() => scrollToSection('involved')}
            className={`px-5 py-3 rounded-full font-semibold text-sm tracking-wide w-full ${
              isLight 
                ? 'bg-[#2A1810] text-[#F5F0E8]' 
                : 'bg-[#F5F0E8] text-[#2A1810]'
            }`}
          >
            GET INVOLVED
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
