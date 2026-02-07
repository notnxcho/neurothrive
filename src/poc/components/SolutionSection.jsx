import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import adaptiveFitnessPattern from '../../assets/adaptive-fitness-pattern-bg.svg'
import nutritionPattern from '../../assets/nutrition-pattern-bg.svg'
import wellnessPattern from '../../assets/wellness-pattern-bg.svg'
import communityPattern from '../../assets/community-pattern-bg.svg'
import isoNegative from '../../assets/iso-negative.svg'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    title: 'Adaptive Fitness',
    description: 'Personalized movement plans that meet every body where it is and build confidence over time.',
    pattern: adaptiveFitnessPattern
  },
  {
    title: 'Nutrition & Healthy Living',
    description: 'Simple, sensory-friendly nutrition habits that support energy, focus, and daily routines.',
    pattern: nutritionPattern
  },
  {
    title: 'Wellness Education',
    description: 'Skill-building sessions that turn health concepts into practical, repeatable actions.',
    pattern: wellnessPattern
  },
  {
    title: 'Community Wellness',
    description: 'A welcoming environment that builds belonging, social connection, and shared progress.',
    pattern: communityPattern
  }
]

function ServiceCard({ title, description, pattern, highlighted, onMouseEnter, onMouseLeave, cardRef }) {
  return (
    <article
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative min-w-[280px] sm:min-w-[320px] md:min-w-0 h-[440px] rounded-[24px] overflow-hidden snap-center md:snap-none transition-transform duration-300 ${
        highlighted ? '' : ''
      }`}
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-[#110000]/10" />
      
      {/* White backdrop - reveals when active */}
      <div 
        className={`absolute inset-0 bg-white transition-opacity duration-300 ${highlighted ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Pattern background - reveals when active */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${highlighted ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${pattern})` }}
      />
      
      {/* Gradient overlay for readability - white at bottom to transparent at top */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent transition-opacity duration-300 ${highlighted ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Logo - always visible */}
      <img 
        src={isoNegative} 
        alt="" 
        className="absolute top-3 left-3 w-8 h-8 z-10"
      />
      
      <div className="relative z-10 h-full flex flex-col justify-end items-start p-6 text-left">
        <div className="text-[28px] md:text-[34px] text-[#110000] font-semibold leading-[108%] tracking-tight">
          {title}
        </div>
        <div
          className={`mt-3 text-[16px] md:text-[18px] leading-[140%] text-[#110000] overflow-hidden transition-all duration-300 ${
            highlighted ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-2'
          }`}
        >
          {description}
        </div>
      </div>
    </article>
  )
}

function SolutionSection({ onBackgroundChange }) {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headlineRef = useRef(null)
  const cardsRef = useRef(null)
  const cardRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const label = labelRef.current
      const headline = headlineRef.current
      const cards = cardsRef.current

      // Set initial states
      gsap.set(headline, { opacity: 0, y: 60 })
      gsap.set(cards, { opacity: 0, y: 60, height: 0 })

      const cardsHeight = 440

      // Main pinned animation
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress

            if (progress < 0.2) {
              onBackgroundChange?.('dark', 'bg-gradient-to-t from-[#170808] to-[#110000]')
            } else {
              onBackgroundChange?.('light', 'bg-[#F5F0E8]')
            }
          }
        }
      })

      // "Our solution" subtle lift
      tl.to(label, { y: -0, duration: 0.1 }, 0)
      tl.to(label, { color: 'rgba(17, 0, 0, 0.4)', y: -50, duration: 0.1 }, 0.2)

      // Reveal headline and keep it on screen
      tl.to(headline, { opacity: 1, y: -40, duration: 0.1 }, 0.3)

      // Cards appear while "Our solution" fades away
      tl.to(label, { opacity: 0, duration: 0.2 }, 0.6)
      tl.to(cards, { opacity: 1, y: 0, height: cardsHeight, duration: 0.3 }, 0.6)

      // make cards stay
      tl.to(cards, { y: -40, duration: 0.1 }, 1)
      

    }, sectionRef)

    return () => ctx.revert()
  }, [onBackgroundChange])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(media.matches)

    update()

    if (media.addEventListener) {
      media.addEventListener('change', update)
    } else {
      media.addListener(update)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', update)
      } else {
        media.removeListener(update)
      }
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      setHoveredIndex(null)
    }
  }, [isDesktop])

  useEffect(() => {
    const container = cardsRef.current
    if (!container) return

    let frame = null

    const updateActive = () => {
      frame = null
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      let closestIndex = 0
      let closestDistance = Infinity

      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(cardCenter - centerX)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(updateActive)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    updateActive()

    return () => {
      container.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const spotlightIndex = isDesktop ? hoveredIndex : activeIndex

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
    >
      <div className="container-main max-w-[1248px] px-2 md:px-6 text-center relative z-10 flex flex-col items-center">
        <p 
          ref={labelRef}
          className="font-semibold text-[32px] md:text-[64px] leading-[100%]"
          style={{ color: '#F5F2EB' }}
        >
          Our solution
        </p>
        <h2 
          ref={headlineRef}
          className="font-black text-[#110000] text-[32px] md:text-[64px] leading-[100%] tracking-tight"
        >
          Build something different
        </h2>
        <div 
          ref={cardsRef}
          className="w-full mt-4 overflow-x-auto overflow-y-clip snap-x snap-mandatory scrollbar-hide md:overflow-visible md:snap-none"
        >
          <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:w-full">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                pattern={service.pattern}
                highlighted={spotlightIndex !== null && index === spotlightIndex}
                onMouseEnter={() => {
                  if (isDesktop) setHoveredIndex(index)
                }}
                onMouseLeave={() => {
                  if (isDesktop) setHoveredIndex(null)
                }}
                cardRef={(el) => {
                  cardRefs.current[index] = el
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
