import { useEffect, useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import AdditionalSections from './components/AdditionalSections'
import './poc.css'

gsap.registerPlugin(ScrollTrigger)

function POCPage() {
  const [navMode, setNavMode] = useState('light')
  const [bgClass, setBgClass] = useState('bg-[#F5F0E8]')
  const pageRef = useRef(null)
  const solutionControlsRef = useRef(false) // Track if solution section is controlling background

  // Callback for SolutionSection to control background
  const handleSolutionBackgroundChange = useCallback((mode, bg) => {
    solutionControlsRef.current = true
    setNavMode(mode)
    setBgClass(bg)
  }, [])

  // Track scroll position and update navbar mode + background
  useEffect(() => {
    // Use a scroll-based listener to determine background based on which section is visible
    const updateBackground = () => {
      const vh = window.innerHeight
      const heroSection = document.querySelector('#hero')
      const problemSection = document.querySelector('#problem')
      const aboutSection = document.querySelector('#about')

      if (!heroSection || !problemSection) return

      const heroBottom = heroSection.getBoundingClientRect().bottom
      const aboutTop = aboutSection?.getBoundingClientRect().top ?? Infinity

      // If we're past the solution section, let it control the background
      if (aboutTop <= vh) {
        // Solution section handles its own background via callback
        return
      }

      // Reset solution control flag when scrolling back up
      solutionControlsRef.current = false

      if (heroBottom > vh * 0.5) {
        // Hero section
        setNavMode('light')
        setBgClass('bg-[#F5F0E8]')
      } else {
        // Problem section - always dark gradient
        setNavMode('dark')
        
        // Check if we're in the message section or scrolling text section
        const problemBottom = problemSection.getBoundingClientRect().bottom
        if (problemBottom > vh * 0.8) {
          setBgClass('bg-gradient-to-t from-[#170808] to-[#360F0F]')
        } else {
          setBgClass('bg-gradient-to-t from-[#170808] to-[#110000]')
        }
      }
    }

    // Run on scroll and resize
    window.addEventListener('scroll', updateBackground, { passive: true })
    window.addEventListener('resize', updateBackground)
    
    // Initial call
    updateBackground()

    return () => {
      window.removeEventListener('scroll', updateBackground)
      window.removeEventListener('resize', updateBackground)
    }
  }, [])

  return (
    <div 
      ref={pageRef} 
      className="poc-page min-h-screen flex flex-col items-center relative"
    >
      {/* Fixed background layer that changes based on scroll */}
      <div 
        className={`fixed inset-0 transition-all duration-700 -z-10 ${bgClass}`}
        aria-hidden="true"
      />
      <Navbar mode={navMode} />

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection onBackgroundChange={handleSolutionBackgroundChange} />

      <AdditionalSections />
    </div>
  )
}

export default POCPage
