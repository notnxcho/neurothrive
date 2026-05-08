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

    // Grow the hero curtain as the next section (intro video) comes in.
    // We tween width + borderRadius so the rounded slab progressively
    // becomes a full-bleed panel that covers the viewport.
    if (gradient) {
      gsap.to(gradient, {
        bottom: '-100vh',
        height: '200vh',
        width: '100vw',
        maxWidth: '100vw',
        borderRadius: 0,
        scrollTrigger: {
          trigger: '#intro-video',
          start: 'top bottom',
          end: 'top 75%',
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
        className="absolute left-1/2 -translate-x-1/2 -bottom-[calc(100vh-(10vh+40px))] w-[calc(100vw-48px)] md:w-[calc(100vw-24px)] max-w-[1200px] h-[100vh] bg-gradient-to-t from-[#2D080Baa] to-[#360f0f] rounded-[24px] z-[-1]"
      />
    </section>
  )
}

export default HeroSection
