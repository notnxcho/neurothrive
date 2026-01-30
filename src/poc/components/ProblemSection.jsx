import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Grid visualization component for statistics
function StatsGrid({ highlightCount = 1, totalSquares = 36, className = '' }) {
  const cols = 6
  
  // Pattern for which squares to highlight - scattered positions
  const getHighlightedSquares = (count) => {
    const pattern = [
      14, // center
      7, 20, 27, 4, 17, 30, 10, 23, // spread outward
      0, 5, 11, 13, 22, 24, 29, 35, 2, 9, 16, 19, 26, 33, 1, 8, 15, 21, 28, 34, 3, 6, 12, 18, 25, 31, 32
    ]
    return pattern.slice(0, count)
  }
  
  const highlighted = getHighlightedSquares(highlightCount)
  
  return (
    <div 
      className={`grid gap-2 md:gap-3 ${className}`}
      style={{ 
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        width: '100%',
        maxWidth: '380px'
      }}
    >
      {Array.from({ length: totalSquares }).map((_, i) => (
        <div
          key={i}
          className={`aspect-square rounded-xl transition-all duration-700 ${
            highlighted.includes(i) 
              ? 'bg-[#F5F0E8] shadow-lg' 
              : 'bg-[#5C4A3D]/50'
          }`}
        />
      ))}
    </div>
  )
}

// Words for the scrolling text
const SCROLL_WORDS = [
  'Overwhelming', 'environments.', 'Rigid', 'routines.',
  'Zero', 'understanding', 'of', 'sensory', 'needs.',
  'The', 'result?', 'A', 'population', 'left', 'behind—',
  'facing', 'higher', 'rates', 'of', 'obesity,',
  'anxiety,', 'and', 'isolation', 'than', 'their',
  'neurotypical', 'peers.'
]

function ProblemSection() {
  const sectionRef = useRef(null)
  const foldsContainerRef = useRef(null)
  const messageRef = useRef(null)
  const scrollTextSectionRef = useRef(null)
  const scrollTextParagraphRef = useRef(null)
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)
  const text3Ref = useRef(null)
  const gridRef = useRef(null)
  const wordsRef = useRef([])
  const [highlightCount, setHighlightCount] = useState(1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text1 = text1Ref.current
      const text2 = text2Ref.current
      const text3 = text3Ref.current
      const grid = gridRef.current

      // Initial state
      if (text2) gsap.set(text2, { opacity: 0, y: 30 })
      if (text3) gsap.set(text3, { opacity: 0, y: 30 })

      // Pin the folds container and animate through three screens
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: foldsContainerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update highlight count based on progress
            const progress = self.progress
            if (progress < 0.33) {
              setHighlightCount(1)
            } else {
              setHighlightCount(7)
            }
          }
        }
      })

      // Transition 1 → 2 (at ~33%)
      tl.to(text1, { opacity: 0, y: -30, duration: 0.15 }, 0.28)
      tl.to(text2, { opacity: 1, y: 0, duration: 0.15 }, 0.33)

      // Transition 2 → 3 (at ~66%)
      tl.to(text2, { opacity: 0, y: -30, duration: 0.15 }, 0.66)
      tl.to(text3, { opacity: 1, y: 0, duration: 0.15 }, 0.75)

      // Fade out grid at the end of screen 3
      tl.to(grid, { opacity: 0, y: -50, duration: 0.2 }, 0.75)

      // Pin message section - extended duration for slower feel
      ScrollTrigger.create({
        trigger: messageRef.current,
        start: 'top top',
        end: '+=100%', // Much longer scroll distance required
        pin: true,
        pinSpacing: true,
      })

      // Scrolling text with word-by-word snap fill
      // Pin the section and use onUpdate for manual, instant color changes
      const words = wordsRef.current.filter(Boolean)
      const totalWords = words.length
      const paragraph = scrollTextParagraphRef.current
      
      ScrollTrigger.create({
        trigger: scrollTextSectionRef.current,
        start: 'top top',
        end: '+=400%', // Long scroll distance for heavy feel
        pin: true,
        pinSpacing: true,
        scrub: 2.5, // Higher value = more "weight" / lag behind scroll
        onUpdate: (self) => {
          const progress = self.progress
          
          // TranslateY from 0% to 69% tied to scroll progression
          if (paragraph) {
            const translateY = progress * 69
            paragraph.style.transform = `translateY(-${translateY}%)`
          }
          
          // Each word lights up at its threshold - instant snap, no easing
          words.forEach((word, i) => {
            // Calculate when this word should light up (distributed across 10%-90% of progress)
            const wordThreshold = 0.1 + (i / totalWords) * 0.8
            // Snap: either fully dim or fully lit
            if (progress >= wordThreshold) {
              word.style.color = '#F5F0E8'
            } else {
              word.style.color = 'rgba(160, 144, 128, 0.2)'
            }
          })
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="problem" className="w-full flex flex-col items-center">
      {/* First three folds - pinned container with transitioning content */}
      <section 
        ref={foldsContainerRef}
        className="h-screen w-full flex items-center justify-center relative"
      >
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[44px] items-center relative z-10">
          {/* Left column: Text content */}
          <div className="relative min-h-[280px] order-2 lg:order-1">
            <div ref={text1Ref} className="absolute inset-0 flex flex-col justify-center">
              <p className="text-[#A09080] text-sm tracking-[0.2em] mb-6 uppercase">Understanding the Gap</p>
              <h2 className="font-black text-[#F5F0E8] text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
                1 in 36 children are diagnosed with autism
              </h2>
            </div>
            <div ref={text2Ref} className="absolute inset-0 flex flex-col justify-center">
              <p className="text-[#A09080] text-sm tracking-[0.2em] mb-6 uppercase">Understanding the Gap</p>
              <h2 className="font-black text-[#F5F0E8] text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
                7 in 36 are within the spectrum of neurodivergence
              </h2>
            </div>
            <div ref={text3Ref} className="absolute inset-0 flex flex-col justify-center">
              <p className="text-[#A09080] text-sm tracking-[0.2em] mb-6 uppercase">Understanding the Gap</p>
              <h2 className="font-black text-[#F5F0E8] text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
                Yet most of them will lose access to wellness services the moment they become adults
              </h2>
            </div>
          </div>

          {/* Right column: Grid */}
          <div ref={gridRef} className="flex items-center justify-center lg:justify-end order-1 lg:order-2">
            <StatsGrid highlightCount={highlightCount} />
          </div>
        </div>
      </section>

      {/* Message: Traditional fitness */}
      <section 
        ref={messageRef}
        className="h-screen w-full flex items-center justify-center relative"
      >
        <div className="container-main text-center flex flex-col items-center relative z-10">
          <h2 className="font-black text-[#F5F0E8] max-w-[800px] text-[44px] md:text-[64px] leading-[1.2] tracking-tight">
            Traditional fitness spaces weren't built for neurodivergent minds.
          </h2>
        </div>
      </section>

      {/* Scrolling text with word-by-word snap fill - pinned with heavy scrub */}
      <section 
        ref={scrollTextSectionRef}
        className="h-screen w-full flex items-center justify-center relative"
      >
        <div className="container-main relative z-10">
          <p 
            ref={scrollTextParagraphRef}
            className="font-black text-[clamp(1.8rem,5vw,4rem)] leading-[1.4] tracking-tight text-center max-w-5xl mx-auto mt-[40vh]"
            style={{ transform: 'translateY(0%)' }}
          >
            {SCROLL_WORDS.map((word, i) => (
              <span
                key={i}
                ref={el => wordsRef.current[i] = el}
                className="inline-block mr-[0.3em]"
                style={{ color: 'rgba(160, 144, 128, 0.2)' }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  )
}

export default ProblemSection
