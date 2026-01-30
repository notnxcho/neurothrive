import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Apple, Book, Community, Gym, HandCard, Heart, Mail } from 'iconoir-react'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  'Everyone belongs.',
  'Every routine matters.',
  'Every achievement counts.'
]

const PROGRAMS = [
  {
    icon: Gym,
    title: 'Adaptive Fitness',
    description: 'Small-group classes and 1:1 coaching built for strength, regulation, and independence.',
    accentClass: 'bg-[#F2D8C4]'
  },
  {
    icon: Apple,
    title: 'Nutrition & Healthy Living',
    description: 'Sensory-friendly nutrition routines with simple meal planning and safe cooking skills.',
    accentClass: 'bg-[#DCE3F2]'
  },
  {
    icon: Book,
    title: 'Wellness Education',
    description: 'Workshops connecting movement with sleep, hygiene, executive function, and time management.',
    accentClass: 'bg-[#D6EFE7]'
  },
  {
    icon: Community,
    title: 'Community Wellness',
    description: 'Inclusive outings, seasonal camps, and partner-led events designed for belonging.',
    accentClass: 'bg-[#F3E7C8]'
  }
]

const IMPACT_STATS = [
  { label: 'Inclusive environment', value: '100%' },
  { label: 'Potential unlocked', value: '∞' },
  { label: 'Community at a time', value: '1' }
]

const INVOLVED = [
  {
    title: 'Donate',
    description: 'Fund scholarships, sensory-safe equipment, and program expansion.',
    action: 'Give now',
    Icon: HandCard,
    accentClass: 'bg-[#F2D8C4]'
  },
  {
    title: 'Volunteer',
    description: 'Support classes, outings, and community events alongside our team.',
    action: 'Sign up',
    Icon: Community,
    accentClass: 'bg-[#DCE3F2]'
  },
  {
    title: 'Partner',
    description: 'Collaborate through corporate partnerships and in-kind support.',
    action: 'Connect',
    Icon: Heart,
    accentClass: 'bg-[#D6EFE7]'
  }
]

function ProgramCard({ icon: Icon, title, description, accentClass }) {
  return (
    <div className="relative rounded-[24px] bg-white/60 p-6 flex flex-col gap-4 shadow-[0_20px_60px_-50px_rgba(17,0,0,0.35)]">
      <div className={`w-12 h-12 rounded-full ${accentClass} flex items-center justify-center text-[#110000]`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-[22px] font-semibold text-[#110000]">{title}</h3>
        <p className="mt-2 text-[15px] leading-[150%] text-[#2A1810]">{description}</p>
      </div>
    </div>
  )
}

function ImpactCard({ value, label, className = '' }) {
  return (
    <div className={`rounded-[24px] bg-[#110000]/5 p-6 flex items-center gap-6 overflow-hidden ${className}`}>
      <div className="text-[48px] font-black text-[#110000] leading-none shrink-0">{value}</div>
      <div className="text-[14px] uppercase tracking-[0.15em] text-[#5C5045] leading-[140%]">{label}</div>
    </div>
  )
}

function InvolvedCard({ title, description, action, Icon, accentClass }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white/60 p-7 flex flex-col gap-6 shadow-[0_30px_80px_-60px_rgba(17,0,0,0.45)]">
      <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${accentClass} opacity-60 blur-2xl`} />
      <div className="relative z-10 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${accentClass} flex items-center justify-center text-[#110000]`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-[#5C5045]">Get involved</div>
      </div>
      <div className="relative z-10">
        <h3 className="text-[24px] font-semibold text-[#110000]">{title}</h3>
        <p className="mt-3 text-[15px] leading-[150%] text-[#2A1810]">{description}</p>
      </div>
      <div className="relative z-10 mt-auto">
        <button className="px-6 py-3 rounded-full bg-[#110000] text-[#F5F0E8] font-semibold text-sm tracking-wide hover:bg-[#2A1810] transition-colors">
          {action}
        </button>
      </div>
    </div>
  )
}

function AdditionalSections() {
  const programsSectionRef = useRef(null)
  const programCardsRef = useRef([])
  const impactSectionRef = useRef(null)
  const impactCardsRef = useRef([])

  useEffect(() => {
    // Programs section animation
    const programsCtx = gsap.context(() => {
      const section = programsSectionRef.current
      const cards = programCardsRef.current.filter(Boolean)

      if (!section || cards.length === 0) return

      // Set initial state for cards
      gsap.set(cards, { height: 0, y: 90, opacity: 0 })

      // Create pinned timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
        }
      })

      // Card 1 at 0.15 progress
      tl.to(cards[0], { height: 'auto', y: 0, opacity: 1, duration: 0.15 }, 0.15)
      // Card 2 at 0.35 progress
      tl.to(cards[1], { height: 'auto', y: 0, opacity: 1, duration: 0.15 }, 0.35)
      // Card 3 at 0.55 progress
      tl.to(cards[0], { height: 0, y: -90, opacity: 0, duration: 0.15 }, 0.55)
      tl.to(cards[2], { height: 'auto', y: 0, opacity: 1, duration: 0.15 }, 0.55)
      // Card 4 at 0.75 progress
      tl.to(cards[1], { height: 0, y: -90, opacity: 0, duration: 0.15 }, 0.75)
      tl.to(cards[3], { height: 'auto', y: 0, opacity: 1, duration: 0.15 }, 0.75)

    }, programsSectionRef)

    // Impact section animation
    const impactCtx = gsap.context(() => {
      const section = impactSectionRef.current
      const cards = impactCardsRef.current.filter(Boolean)

      if (!section || cards.length === 0) return

      // Set initial state for cards
      gsap.set(cards, { height: 0, y: 90, opacity: 0 })

      // Create pinned timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
        }
      })

      // Card 1 at 0.2 progress
      tl.to(cards[0], { height: 120, y: 0, opacity: 1, duration: 0.15 }, 0.2)
      // Card 2 at 0.5 progress
      tl.to(cards[1], { height: 120, y: 0, opacity: 1, duration: 0.15 }, 0.5)
      // Card 3 at 0.8 progress
      tl.to(cards[2], { height: 120, y: 0, opacity: 1, duration: 0.15 }, 0.8)
      // final cards stay
      tl.to(cards[0], { y: -40, duration: 0.2 }, 1)
      tl.to(cards[1], { y: -40, duration: 0.2 }, 1)
      tl.to(cards[2], { y: -40, duration: 0.2 }, 1)

    }, impactSectionRef)

    return () => {
      programsCtx.revert()
      impactCtx.revert()
    }
  }, [])

  return (
    <>
      <section className="w-full py-24">
        <div className="container-main">
          <p className="text-[#5C5045] text-sm tracking-[0.4em] uppercase mb-6">Our Belief</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <div key={value} className="rounded-[24px] bg-[#110000]/5 ring-1 ring-[#110000]/10 p-8">
                <p className="text-[24px] text-[#110000] font-semibold leading-[120%]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="programs" 
        ref={programsSectionRef}
        className="w-full h-screen"
      >
        <div className="container-main h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full items-center">
            {/* Left column - Text (pinned with section) */}
            <div className="flex flex-col justify-center">
              <p className="text-[#5C5045] text-sm tracking-[0.4em] uppercase mb-4">Programs</p>
              <h2 className="text-[clamp(2rem,5vw,3.8rem)] font-black text-[#110000] leading-[105%]">
                Built for<br />real-world routines
              </h2>
              <p className="mt-6 text-[#2A1810] max-w-lg text-[16px] leading-[160%]">
                Every program balances structure with sensory-aware flexibility so participants can grow at their own pace.
              </p>
            </div>

            {/* Right column - Stacking program cards */}
            <div className="flex flex-col gap-4 justify-center">
              {PROGRAMS.map((program, index) => (
                <div 
                  key={program.title}
                  ref={el => programCardsRef.current[index] = el}
                  className="overflow-hidden"
                >
                  <ProgramCard {...program} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24">
        <div className="container-main grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="text-[#5C5045] text-sm tracking-[0.4em] uppercase mb-4">For Families & Caregivers</p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black text-[#110000] leading-[115%]">
              You are not alone in this journey.
            </h2>
            <p className="mt-6 text-[#2A1810] text-[16px] leading-[160%]">
              We provide practical guidance for supporting exercise, nutrition, sleep, and hygiene through behavior-based strategies.
              Access resources, videos, and a growing peer network that understands the day-to-day.
            </p>
          </div>
          <div className="rounded-[24px] bg-white/60 p-8 shadow-[0_20px_60px_-50px_rgba(17,0,0,0.35)]">
            <div className="grid gap-6">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#5C5045]">Guidance</p>
                <p className="mt-2 text-[18px] font-semibold text-[#110000]">Coaching playbooks</p>
                <p className="mt-2 text-[15px] leading-[150%] text-[#2A1810]">
                  Visual schedules, routines, and step-by-step supports you can bring home.
                </p>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#5C5045]">Home setup</p>
                <p className="mt-2 text-[18px] font-semibold text-[#110000]">Sensory-aware routines</p>
                <p className="mt-2 text-[15px] leading-[150%] text-[#2A1810]">
                  Calm, repeatable practices for movement, nutrition, sleep, and hygiene.
                </p>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#5C5045]">Connections</p>
                <p className="mt-2 text-[18px] font-semibold text-[#110000]">Resource network</p>
                <p className="mt-2 text-[15px] leading-[150%] text-[#2A1810]">
                  Referrals, partner resources, and local services to keep progress moving.
                </p>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#5C5045]">Community</p>
                <p className="mt-2 text-[18px] font-semibold text-[#110000]">Peer support</p>
                <p className="mt-2 text-[15px] leading-[150%] text-[#2A1810]">
                  Groups and workshops that connect families who share the journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="impact" 
        ref={impactSectionRef}
        className="w-full h-screen"
      >
        <div className="container-main h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full items-center">
            {/* Left column - Text (pinned with section) */}
            <div className="flex flex-col justify-center">
              <p className="text-[#5C5045] text-sm tracking-[0.4em] uppercase mb-4">Impact</p>
              <h2 className="text-[clamp(2rem,5vw,3.8rem)] font-black text-[#110000] leading-[105%]">
                Real change.<br />Measured.
              </h2>
              <p className="mt-6 text-[#2A1810] max-w-lg text-[16px] leading-[160%]">
                We track progress in physical health, living skills, executive function, and social confidence.
              </p>
            </div>

            {/* Right column - Stacking KPI cards */}
            <div className="flex flex-col gap-4 justify-center">
              {IMPACT_STATS.map((stat, index) => (
                <div 
                  key={stat.label}
                  ref={el => impactCardsRef.current[index] = el}
                  className="overflow-hidden"
                >
                  <ImpactCard value={stat.value} label={stat.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24">
        <div className="container-main">
          <div className="rounded-[32px] bg-[#110000] text-[#F5F0E8] px-8 md:px-14 py-12 md:py-16">
            <p className="text-sm uppercase tracking-[0.4em] text-[#F5F0E8]/70">Testimonial</p>
            <blockquote className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[130%]">
              “Neuro Thrive transformed my son's relationship with exercise. For the first time, he looks forward to being active.”
            </blockquote>
            <p className="mt-6 text-[#F5F0E8]/70 text-sm">— Parent of Program Participant</p>
          </div>
        </div>
      </section>

      <section id="involved" className="w-full py-24">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[#5C5045] text-sm tracking-[0.4em] uppercase mb-4">Get Involved</p>
              <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-black text-[#110000] leading-[110%]">
                Be part of the change.
              </h2>
            </div>
            <p className="text-[#2A1810] max-w-xl text-[16px] leading-[150%]">
              Every contribution helps build accessible wellness for neurodivergent communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INVOLVED.map((item) => (
              <InvolvedCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-24">
        <div className="container-main">
          <div className="rounded-[28px] bg-white/70 ring-1 ring-[#110000]/10 px-8 md:px-14 py-12 md:py-14">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#110000]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#110000]" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-[#5C5045]">Newsletter</p>
                  <h3 className="text-[24px] font-semibold text-[#110000]">Stay connected</h3>
                  <p className="text-[#2A1810] text-[14px] mt-2">Updates on programs, events, and opportunities.</p>
                </div>
              </div>
              <form
                className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="px-4 py-3 rounded-full border border-[#110000]/20 bg-white/80 text-[#110000] focus:outline-none focus:ring-2 focus:ring-[#110000]/30"
                />
                <button className="px-6 py-3 rounded-full bg-[#110000] text-[#F5F0E8] font-semibold">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full pt-16 pb-10 border-t border-[#110000]/10">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div>
              <h3 className="text-[20px] font-semibold text-[#110000]">Neuro Thrive Foundation</h3>
              <p className="mt-3 text-[#2A1810] text-[15px] max-w-md leading-[150%]">
                Advancing health, wellness, and independent living skills for neurodivergent youth and adults.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-[14px] text-[#2A1810]">
              <div className="flex flex-col gap-2">
                <p className="uppercase tracking-[0.3em] text-[#5C5045] text-[11px]">Programs</p>
                <a href="#programs" className="hover:text-[#110000]">Adaptive Fitness</a>
                <a href="#programs" className="hover:text-[#110000]">Nutrition</a>
                <a href="#programs" className="hover:text-[#110000]">Wellness Education</a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="uppercase tracking-[0.3em] text-[#5C5045] text-[11px]">Get Involved</p>
                <a href="#involved" className="hover:text-[#110000]">Donate</a>
                <a href="#involved" className="hover:text-[#110000]">Volunteer</a>
                <a href="#involved" className="hover:text-[#110000]">Partner</a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="uppercase tracking-[0.3em] text-[#5C5045] text-[11px]">Learn</p>
                <a href="#about" className="hover:text-[#110000]">Our Solution</a>
                <a href="#impact" className="hover:text-[#110000]">Impact</a>
                <a href="#programs" className="hover:text-[#110000]">Programs</a>
              </div>
            </div>
          </div>
          <div className="mt-10 text-[12px] text-[#5C5045] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p>© {new Date().getFullYear()} Neuro Thrive Foundation. All rights reserved.</p>
            <p>Committed to physical, cognitive, and communication access—online and in-person.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AdditionalSections
