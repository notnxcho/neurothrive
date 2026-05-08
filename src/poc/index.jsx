import { useEffect, useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import IntroVideoSection from './components/IntroVideoSection'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import AdditionalSections from './components/AdditionalSections'
import './poc.css'

gsap.registerPlugin(ScrollTrigger)

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function POCPage() {
  const [navMode, setNavMode] = useState('light')

  // Scroll-driven layer opacities (0..1). We stack background layers and
  // smoothly cross-fade their opacity instead of swapping a single className,
  // because CSS cannot interpolate between a solid color and a gradient.
  const [darkOpacity, setDarkOpacity] = useState(0)
  const [darkVariantBOpacity, setDarkVariantBOpacity] = useState(0)

  // Optional override layer driven by SolutionSection (e.g. light card area).
  const [solutionLayer, setSolutionLayer] = useState({ active: false, className: 'bg-[#F5F0E8]' })

  const pageRef = useRef(null)

  const handleSolutionBackgroundChange = useCallback((mode, bg) => {
    setNavMode(mode)
    setSolutionLayer({ active: true, className: bg })
  }, [])

  useEffect(() => {
    let ticking = false

    const compute = () => {
      ticking = false
      const vh = window.innerHeight
      const heroSection = document.querySelector('#hero')
      const problemSection = document.querySelector('#problem')
      const aboutSection = document.querySelector('#about')

      if (!heroSection) return

      const heroBottom = heroSection.getBoundingClientRect().bottom
      const aboutTop = aboutSection?.getBoundingClientRect().top ?? Infinity

      // Smoothly fade in the dark gradient as the hero scrolls out.
      // Start the fade when the hero bottom enters the viewport edge,
      // finish before it fully leaves so it lines up with the dark
      // rectangle that grows during the hero's GSAP timeline.
      const fadeStart = vh * 1.0
      const fadeEnd = vh * 0.35
      const darkProgress = clamp(
        (fadeStart - heroBottom) / (fadeStart - fadeEnd),
        0,
        1
      )
      setDarkOpacity(darkProgress)

      // Smooth cross-fade between the two dark variants based on how far
      // the problem section has been scrolled.
      if (problemSection) {
        const problemBottom = problemSection.getBoundingClientRect().bottom
        const variantStart = vh * 1.1
        const variantEnd = vh * 0.6
        const variantProgress = clamp(
          (variantStart - problemBottom) / (variantStart - variantEnd),
          0,
          1
        )
        setDarkVariantBOpacity(variantProgress)
      }

      // When we scroll back up above the solution section, release its override.
      if (aboutTop > vh) {
        setSolutionLayer((prev) => (prev.active ? { ...prev, active: false } : prev))
        setNavMode(darkProgress > 0.5 ? 'dark' : 'light')
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(compute)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    compute()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Cap dark variant fade at the current dark opacity so variant B never
  // exceeds the dark layer it shares the canvas with.
  const variantBOpacity = darkOpacity * darkVariantBOpacity

  return (
    <div
      ref={pageRef}
      className="poc-page min-h-screen flex flex-col items-center relative"
    >
      <SEO />

      {/* Stacked fixed background layers — opacity is the only animated
          property so transitions stay smooth. */}
      <div className="fixed inset-0 -z-10 bg-[#F5F0E8]" aria-hidden="true" />
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-t from-[#170808] to-[#360F0F] transition-opacity duration-300 ease-out will-change-[opacity]"
        style={{ opacity: darkOpacity }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-t from-[#170808] to-[#110000] transition-opacity duration-500 ease-out will-change-[opacity]"
        style={{ opacity: variantBOpacity }}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-0 -z-10 transition-opacity duration-700 ease-out will-change-[opacity] ${solutionLayer.className}`}
        style={{ opacity: solutionLayer.active ? 1 : 0 }}
        aria-hidden="true"
      />

      <Navbar mode={navMode} />

      <HeroSection />

      <IntroVideoSection />

      <ProblemSection />

      <SolutionSection onBackgroundChange={handleSolutionBackgroundChange} />

      <AdditionalSections />
    </div>
  )
}

export default POCPage
