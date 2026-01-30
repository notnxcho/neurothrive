import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Spark } from 'iconoir-react'
import Button from './button'

gsap.registerPlugin(ScrollTrigger)

function HeroSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const gradientRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const gradient = gradientRef.current

    // Pin the hero and fade out on scroll
    gsap.to(content, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    })

    // Fade the gradient panel as the next section comes in
    if (gradient) {
      gsap.to(gradient, {
        // opacity: 0,
        bottom: "-100vh",
        // onUpdate: () => {
        //   const element = gradientRef.current
        //   if (!element) return

        //   const viewportWidth = window.innerWidth || 1
        //   const elementWidth = element.offsetWidth || 1
        //   const scaleFactor = elementWidth / viewportWidth

        //   element.style.transform = `scaleX(${scaleFactor})`
        // },
        height: '200vh',
        width: '100vw',
        maxWidth: '100vw',
        scrollTrigger: {
          trigger: '#problem',
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const scrollToNext = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="min-h-screen w-full flex flex-col justify-center items-center relative"
    >
      <div ref={contentRef} className="container-main mb-[80px] text-center flex flex-col items-center gap-4">
        {/* Decorative stars */}
        <div className="flex gap-2 items-end">
          <Spark className="w-5 h-5 text-[#2A1810]" strokeWidth={2} fill="#2A1810" />
          <Spark className="w-5 h-5 mb-2 text-[#2A1810]" strokeWidth={2} fill="#2A1810" />
          <Spark className="w-5 h-5 text-[#2A1810]" strokeWidth={2} fill="#2A1810" />
        </div>

        {/* Main headline */}
        <h1 className="font-black text-[#2A1810]">
          <span className="block text-[54px] lg:text-[94px] leading-[94%]">EVERY MIND</span>
          <span className="block text-[54px] lg:text-[94px] leading-[94%]">DESERVES TO THRIVE</span>
        </h1>

        {/* Subtitle */}
        <p className=" py-4 text-[#5C5045] text-[14px] lg:text-[18px] leading-[140%] max-w-[680px]">
          We are a community-based center where neurodivergent youth and adults discover 
          strength, confidence, and wellness through adaptive fitness and proven routines.
          <br/>
          NeuroThrive Foundation offers evidence-based coaching and sensory-friendly 
          programming specifically designed for those with autism and related support needs.
        </p>

        {/* CTA Button */}
        <Button onClick={scrollToNext}>
          GET INVOLVED
        </Button>
      </div>
      <div 
        ref={gradientRef}
        className="absolute -bottom-[calc(100vh-(10vh+40px))] container-main h-[100vh] w-full bg-gradient-to-t from-[#360F0F] to-[#170808] rounded-[24px] z-[-1]"
      />
    </section>
  )
}

export default HeroSection
