import { useEffect, useRef, useState } from 'react'
import { 
  Brain, 
  Heart, 
  Community, 
  Gym, 
  Apple, 
  Book, 
  HandCard,
  ArrowDown,
  Menu,
  Xmark,
  Mail
} from 'iconoir-react'
import './App.css'

function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return [ref, isInView]
}

function Section({ children, className = '', dark = true, id }) {
  const [ref, isInView] = useInView()
  
  return (
    <section 
      ref={ref}
      id={id}
      className={`section ${dark ? 'section-dark' : 'section-light'} ${isInView ? 'in-view' : ''} ${className}`}
    >
      {children}
    </section>
  )
}

function StatCard({ number, label, delay = 0 }) {
  const [ref, isInView] = useInView()
  
  return (
    <div 
      ref={ref}
      className={`stat-card ${isInView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function ProgramCard({ icon: Icon, title, description, delay = 0 }) {
  const [ref, isInView] = useInView()
  
  return (
    <div 
      ref={ref}
      className={`program-card ${isInView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="program-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-logo" onClick={() => scrollToSection('hero')}>
            <Brain />
            <span>Neuro Thrive</span>
          </div>
          
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <Xmark /> : <Menu />}
          </button>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('programs')}>Programs</button>
            <button onClick={() => scrollToSection('impact')}>Impact</button>
            <button onClick={() => scrollToSection('involved')} className="nav-cta">Get Involved</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line">Every mind</span>
            <span className="hero-line accent">deserves to thrive.</span>
          </h1>
          <p className="hero-subtitle">
            Not despite being different.<br />
            <strong>Because of it.</strong>
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollToSection('involved')}>
              Join the Movement
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection('about')}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-scroll" onClick={() => scrollToSection('problem')}>
          <span>Scroll to explore</span>
          <ArrowDown />
        </div>
      </section>

      {/* Problem Statement */}
      <Section id="problem" dark={true}>
        <div className="content-narrow">
          <p className="eyebrow">The Reality</p>
          <h2 className="statement">
            <span className="highlight">1 in 36</span> children are diagnosed with autism.
          </h2>
          <p className="statement-sub">
            Yet most lose access to wellness services the moment they become adults.
          </p>
        </div>
      </Section>

      {/* The Gap */}
      <Section dark={false}>
        <div className="content-narrow">
          <p className="eyebrow dark">The Gap</p>
          <h2 className="statement dark">
            Traditional fitness spaces weren't built for neurodivergent minds.
          </h2>
          <p className="body-text dark">
            Overwhelming environments. Rigid routines. Zero understanding of sensory needs. 
            The result? A population left behind—facing higher rates of obesity, anxiety, 
            and isolation than their neurotypical peers.
          </p>
        </div>
      </Section>

      {/* The Solution */}
      <Section id="about" dark={true}>
        <div className="content-narrow">
          <p className="eyebrow">The Solution</p>
          <h2 className="statement">
            We're building something <span className="highlight">different.</span>
          </h2>
          <p className="body-text">
            Neuro Thrive Foundation is a community-based center where neurodivergent 
            youth and adults discover strength, confidence, and wellness through 
            adaptive fitness and evidence-based routines designed specifically for 
            how their minds work.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section dark={false} className="values-section">
        <div className="content-wide">
          <p className="eyebrow dark">Our Belief</p>
          <div className="values-grid">
            <div className="value-item">
              <h3>Everyone belongs.</h3>
            </div>
            <div className="value-item">
              <h3>Every routine matters.</h3>
            </div>
            <div className="value-item">
              <h3>Every achievement counts.</h3>
            </div>
          </div>
        </div>
      </Section>

      {/* Programs */}
      <Section id="programs" dark={true} className="programs-section">
        <div className="content-wide">
          <p className="eyebrow">What We Do</p>
          <h2 className="section-title">Programs Built for You</h2>
          <div className="programs-grid">
            <ProgramCard 
              icon={Gym}
              title="Adaptive Fitness"
              description="Small group classes and 1:1 coaching focused on strength, coordination, self-regulation, and independence."
              delay={0}
            />
            <ProgramCard 
              icon={Apple}
              title="Nutrition & Healthy Living"
              description="Interactive sessions in meal planning, safe cooking, and nutrition education tailored to neurodivergent learning styles."
              delay={100}
            />
            <ProgramCard 
              icon={Book}
              title="Wellness Education"
              description="Workshops connecting movement with executive functioning, sleep, hygiene, and time management skills."
              delay={200}
            />
            <ProgramCard 
              icon={Community}
              title="Community Wellness"
              description="Inclusive outings, seasonal camps, weekend clubs, and public events with local partners."
              delay={300}
            />
          </div>
        </div>
      </Section>

      {/* For Families */}
      <Section dark={false}>
        <div className="content-narrow">
          <p className="eyebrow dark">For Families & Caregivers</p>
          <h2 className="statement dark">
            You're not alone in this journey.
          </h2>
          <p className="body-text dark">
            We provide specialized training on supporting exercise, nutrition, sleep, 
            and hygiene through behavior-based strategies. Access guides, instructional 
            videos, referral lists, and connect with a growing peer network of families 
            who understand.
          </p>
        </div>
      </Section>

      {/* Impact Section */}
      <Section id="impact" dark={true} className="impact-section">
        <div className="content-wide">
          <p className="eyebrow">Our Impact</p>
          <h2 className="section-title">Real Change. Measured.</h2>
          <div className="stats-grid">
            <StatCard number="100%" label="Inclusive Environment" delay={0} />
            <StatCard number="∞" label="Potential Unlocked" delay={100} />
            <StatCard number="1" label="Community at a Time" delay={200} />
          </div>
          <p className="impact-note">
            We track progress in physical health, living skills, executive function, 
            routine adherence, confidence, and social engagement.
          </p>
        </div>
      </Section>

      {/* Testimonial */}
      <Section dark={false} className="testimonial-section">
        <div className="content-narrow">
          <blockquote className="testimonial">
            "Neuro Thrive transformed my son's relationship with exercise. 
            For the first time, he looks forward to being active."
          </blockquote>
          <p className="testimonial-author">— Parent of Program Participant</p>
        </div>
      </Section>

      {/* Get Involved */}
      <Section id="involved" dark={true} className="involved-section">
        <div className="content-wide">
          <p className="eyebrow">Take Action</p>
          <h2 className="statement">
            Be part of the <span className="highlight">change.</span>
          </h2>
          <div className="involved-grid">
            <div className="involved-card">
              <HandCard className="involved-icon" />
              <h3>Donate</h3>
              <p>Fund scholarships, equipment, and program expansion.</p>
              <button className="btn-outline">Give Now</button>
            </div>
            <div className="involved-card">
              <Community className="involved-icon" />
              <h3>Volunteer</h3>
              <p>Support classes, outings, events, or administration.</p>
              <button className="btn-outline">Sign Up</button>
            </div>
            <div className="involved-card">
              <Heart className="involved-icon" />
              <h3>Partner</h3>
              <p>Corporate partnerships and in-kind contributions welcome.</p>
              <button className="btn-outline">Connect</button>
            </div>
          </div>
        </div>
      </Section>

      {/* Newsletter */}
      <Section dark={false} className="newsletter-section">
        <div className="content-narrow">
          <Mail className="newsletter-icon" />
          <h2 className="section-title dark">Stay Connected</h2>
          <p className="body-text dark center">
            Get updates on programs, news, and opportunities to make a difference.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <Brain />
              <span>Neuro Thrive Foundation</span>
            </div>
            <p className="footer-mission">
              Advancing health, wellness, and independent living skills 
              for neurodivergent youth and adults.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Programs</h4>
              <a href="#programs">Adaptive Fitness</a>
              <a href="#programs">Nutrition</a>
              <a href="#programs">Wellness Education</a>
            </div>
            <div className="footer-column">
              <h4>Get Involved</h4>
              <a href="#involved">Donate</a>
              <a href="#involved">Volunteer</a>
              <a href="#involved">Partner</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#about">About Us</a>
              <a href="#impact">Impact</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Neuro Thrive Foundation. All rights reserved.</p>
          <p className="accessibility-note">
            Committed to physical, cognitive, and communication access—online and in-person.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
