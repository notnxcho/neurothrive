import { useState, useEffect, useCallback } from 'react'
import { Xmark, Linkedin, OpenNewWindow, MapPin } from 'iconoir-react'

const FOUNDERS = [
  {
    name: 'Melanie Castro',
    credentials: 'M.S., BCBA',
    role: 'Co-Founder',
    image: null,
    accentClass: 'bg-[#F2D8C4]',
    linkedin: 'https://www.linkedin.com/in/melanie-castro-bcba/',
    location: 'San Francisco, CA',
    bio: [
      'Co-Founder and Board Certified Behavior Analyst with 14+ years of clinical leadership in applied behavior analysis (ABA), Acceptance and Commitment Therapy (ACT), and adaptive fitness program development.',
      'Extensive experience in comprehensive assessment, individualized program design, and the implementation of sensory-informed, evidence-based intervention for neurodivergent individuals across home, school, community and health settings.',
      'Committed to ethical practice, clinical integrity, inclusion, health equity, and data-driven decision-making.',
      'Supported by interdisciplinary advisory partners across healthcare, education, and fitness to ensure quality, accountability, and systems-level impact.'
    ],
    experience: [
      { title: 'Co-Founder', org: 'Neuro Thrive Foundation', period: 'Present' },
      { title: 'Board Certified Behavior Analyst', org: 'Clinical Practice', period: '14+ years' },
      { title: 'ABA & ACT Specialist', org: 'Various Settings', period: 'Home, School, Community & Health' }
    ],
    education: [
      { degree: 'Master of Science (M.S.)', institution: 'Behavior Analysis' },
      { degree: 'BCBA Certification', institution: 'Board Certified Behavior Analyst' }
    ]
  },
  {
    name: 'Uzi Sasson',
    credentials: 'CPA',
    role: 'Co-Founder & CEO',
    image: null,
    accentClass: 'bg-[#DCE3F2]',
    linkedin: 'https://www.linkedin.com/in/uzi-sasson/',
    location: 'San Francisco, CA',
    bio: [
      'Co-Founder and Chief Executive Officer of Neuro Thrive Foundation and a seasoned leader with deep experience scaling industrial and technology-enabled business through organic growth and acquisition.',
      'He previously served as CFO, COO, and later CEO of IXYS Corporation where he helped grow revenue from approximately $80M to over $750M, led more than 12 acquisitions, and structured the company\'s $940M sale to Littelfuse.',
      'Uzi now advises growth-stage and pre-IPO companies through his firm Oraya LLC and has raised or structured more than $900M in debt and equity financing across public and private markets.',
      'He brings Big 4 (PwC) training, SEC and regulatory expertise, and a track record of building high-performing finance organizations.',
      'He is now applying to strengthen Neuro Thrive\'s financial framework and long-term sustainability.'
    ],
    experience: [
      { title: 'Co-Founder & CEO', org: 'Neuro Thrive Foundation', period: 'Present' },
      { title: 'Founder & Advisor', org: 'Oraya LLC', period: 'Growth-stage & Pre-IPO Advisory' },
      { title: 'CEO', org: 'IXYS Corporation', period: 'Grew revenue $80M → $750M' },
      { title: 'COO', org: 'IXYS Corporation', period: '12+ acquisitions' },
      { title: 'CFO', org: 'IXYS Corporation', period: 'Structured $940M sale to Littelfuse' }
    ],
    education: [
      { degree: 'CPA Certification', institution: 'Certified Public Accountant' },
      { degree: 'Big 4 Training', institution: 'PricewaterhouseCoopers (PwC)' }
    ]
  }
]

function FounderCard({ founder, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative rounded-[24px] bg-white/60 p-6 md:p-8 flex flex-col items-center gap-5 shadow-[0_20px_60px_-50px_rgba(17,0,0,0.35)] cursor-pointer text-left w-full transition-all duration-300 hover:shadow-[0_30px_80px_-40px_rgba(17,0,0,0.4)] hover:-translate-y-1"
    >
      <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${founder.accentClass} opacity-40 blur-2xl`} />

      <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full ${founder.accentClass} overflow-hidden flex items-center justify-center`}>
        {founder.image ? (
          <img
            src={founder.image}
            alt={founder.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[40px] font-bold text-[#110000]/20 select-none">
            {founder.name.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-1">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C5045]">{founder.role}</p>
        <h3 className="text-[22px] md:text-[26px] font-semibold text-[#110000] leading-tight">
          {founder.name}
        </h3>
        <p className="text-[14px] text-[#5C5045]">{founder.credentials}</p>
      </div>

      <span className="relative z-10 mt-auto px-5 py-2.5 rounded-full bg-[#110000]/5 text-[#110000] text-sm font-medium group-hover:bg-[#110000] group-hover:text-[#F5F0E8] transition-colors duration-300">
        View profile
      </span>
    </button>
  )
}

function TimelineNode({ items, renderItem }) {
  return (
    <div className="relative flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="relative flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 shrink-0 mt-3.5 ${
              i === 0 ? 'bg-[#110000] border-[#110000]' : 'bg-transparent border-[#110000]/30'
            }`} />
            {i < items.length - 1 && (
              <div className="w-px flex-1 bg-[#110000]/12 min-h-[24px]" />
            )}
          </div>
          <div className="pb-6 last:pb-0">
            {renderItem(item, i)}
          </div>
        </div>
      ))}
    </div>
  )
}

function FounderModal({ founder, isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true))
      })
      document.body.style.overflow = 'hidden'
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setIsVisible(false), 400)
      document.body.style.overflow = ''
      return () => clearTimeout(timer)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isVisible || !founder) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-end justify-center transition-all duration-400 ${
        isAnimating ? 'bg-[#110000]/40 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-3xl max-h-[85vh] bg-[#F5F0E8] rounded-t-[32px] overflow-hidden flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="sticky top-0 z-10 bg-[#F5F0E8] px-8 pt-6 pb-4 flex items-start justify-between">
          <div className="w-12 h-1 rounded-full bg-[#110000]/15 absolute top-3 left-1/2 -translate-x-1/2" />
          <div className="flex items-center gap-5 mt-2">
            <div className={`w-16 h-16 rounded-full ${founder.accentClass} overflow-hidden flex items-center justify-center shrink-0`}>
              {founder.image ? (
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[22px] font-bold text-[#110000]/20 select-none">
                  {founder.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5C5045]">{founder.role}</p>
              <h3 className="text-[24px] md:text-[28px] font-bold text-[#110000] leading-tight">
                {founder.name}
              </h3>
              <p className="text-[14px] text-[#5C5045]">{founder.credentials}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-2 w-10 h-10 rounded-full bg-[#110000]/5 hover:bg-[#110000]/10 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <Xmark className="w-5 h-5 text-[#110000]" />
          </button>
        </div>

        <div className="px-6 md:px-8 pb-10 overflow-y-auto flex flex-col gap-4">
          {/* About card */}
          <div>
            <p className="text-[14px] font-semibold text-[#110000] mb-3">About</p>
            <div className="flex flex-col gap-3">
              {founder.bio.map((paragraph, i) => (
                <p key={i} className="text-[14px] md:text-[15px] leading-[165%] text-[#2A1810]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Location & Social row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {founder.location && (
              <div className="rounded-[20px] bg-[#11000008] p-6">
                <p className="text-[14px] font-semibold text-[#110000] mb-3">Location</p>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#5C5045]" />
                  <span className="text-[14px] text-[#2A1810]">{founder.location}</span>
                </div>
              </div>
            )}

            {founder.linkedin && (
              <div className="rounded-[20px] bg-[#11000008] p-6">
                <p className="text-[14px] font-semibold text-[#110000] mb-3">Social</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 group"
                >
                  <span className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center">
                    <Linkedin className="w-[18px] h-[18px] text-white" />
                  </span>
                  <OpenNewWindow className="w-3.5 h-3.5 text-[#5C5045] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            )}
          </div>

          {/* Experience card */}
          {founder.experience?.length > 0 && (
            <div>
              <p className="text-[14px] font-semibold text-[#110000] mb-5">Experience</p>
              <TimelineNode
                items={founder.experience}
                renderItem={(item) => (
                  <div className="flex gap-3.5 items-start">
                    <div className={`w-10 h-10 rounded-[10px] ${founder.accentClass} flex items-center justify-center shrink-0 text-[11px] font-bold text-[#110000]/30 select-none`}>
                      {item.org.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-[14px] md:text-[15px] font-semibold text-[#110000] leading-snug">
                        {item.title}
                      </p>
                      <p className="text-[13px] text-[#2A1810] mt-0.5">{item.org}</p>
                      <p className="text-[12px] text-[#5C5045] mt-0.5">{item.period}</p>
                    </div>
                  </div>
                )}
              />
            </div>
          )}

          {/* Education card */}
          {founder.education?.length > 0 && (
            <div>
              <p className="text-[14px] font-semibold text-[#110000] mb-5">Education</p>
              <TimelineNode
                items={founder.education}
                renderItem={(item) => (
                  <div className="flex gap-3.5 items-start">
                    <div className={`w-10 h-10 rounded-[10px] ${founder.accentClass} flex items-center justify-center shrink-0 text-[11px] font-bold text-[#110000]/30 select-none`}>
                      {item.institution.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-[14px] md:text-[15px] font-semibold text-[#110000] leading-snug">
                        {item.degree}
                      </p>
                      <p className="text-[13px] text-[#2A1810] mt-0.5">{item.institution}</p>
                    </div>
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FoundersSection() {
  const [selectedFounder, setSelectedFounder] = useState(null)

  return (
    <>
      <section id="leadership" className="w-full py-24">
        <div className="container-main">
          <div className="flex flex-col gap-6 mb-12">
            <div>
              <p className="text-[#5C5045] text-sm tracking-[0.4em] uppercase mb-4">Leadership & Team</p>
              <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-black text-[#110000] leading-[110%]">
                Who&apos;s behind Neuro Thrive
              </h2>
            </div>
            <p className="text-[#2A1810] max-w-xl text-[16px] leading-[150%]">
              A team combining clinical expertise and business acumen to build lasting impact for neurodivergent communities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {FOUNDERS.map((founder) => (
              <FounderCard
                key={founder.name}
                founder={founder}
                onClick={() => setSelectedFounder(founder)}
              />
            ))}
          </div>
        </div>
      </section>

      <FounderModal
        founder={selectedFounder}
        isOpen={!!selectedFounder}
        onClose={() => setSelectedFounder(null)}
      />
    </>
  )
}

export default FoundersSection
