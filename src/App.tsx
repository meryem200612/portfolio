import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import profilePhoto from './assets/profile-photo.jpg'
import sehaScreenshot from './assets/seha-screenshot.png'
import crmScreenshot from './assets/crm-screenshot.png'
import ameoraScreenshot from './assets/ameora-screenshot.png'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} className={`section-fade ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </section>
  )
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const MailIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Home','About','Skills','Projects','Experience','Education','Contact']
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <button onClick={() => scrollTo('home')} className="font-display font-800 text-xl text-navy tracking-tight">
            Temara Meryem<span className="text-blue">.</span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)} className="text-sm font-medium text-slate-600 hover:text-blue transition-colors duration-200">
                {l}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button onClick={() => scrollTo('Contact')} className="px-5 py-2.5 bg-blue text-white text-sm font-semibold rounded-xl hover:bg-navy-700 transition-all duration-200 shadow-sm hover:shadow-md">
              Let's Talk
            </button>
          </div>

          <button className="md:hidden text-navy" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XIcon/> : <MenuIcon/>}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)} className="text-left text-base font-medium text-navy hover:text-blue transition-colors py-1">
                {l}
              </button>
            ))}
            <button onClick={() => scrollTo('Contact')} className="mt-2 px-5 py-3 bg-blue text-white text-sm font-semibold rounded-xl">
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const techBadges = [
    { label: 'React.js', pos: 'top-6 -right-4', color: 'bg-blue-50 text-blue border-blue/20' },
    { label: 'Laravel', pos: 'top-1/3 -right-8', color: 'bg-pink-50 text-pink border-pink/20' },
    { label: 'PHP', pos: 'bottom-24 -right-4', color: 'bg-slate-100 text-slate-700 border-slate-200' },
    { label: 'MySQL', pos: 'bottom-10 right-8', color: 'bg-blue-50 text-blue border-blue/20' },
    { label: 'REST API', pos: 'top-10 left-0 -translate-x-1/2', color: 'bg-pink-50 text-pink border-pink/20' },
  ]

  return (
    <section id="home" className="min-h-screen bg-navy flex items-center pt-16 relative overflow-hidden">
      {/* subtle grid bg */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize:'40px 40px'}}/>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{background:'radial-gradient(ellipse at 70% 30%, #3B82F6 0%, transparent 60%)'}}/>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="animate-fade-in-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-pink"/>
              <span className="text-xs font-semibold tracking-widest text-pink uppercase">Full Stack Developer</span>
            </div>

            <h1 className="font-display font-800 text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-4">
              Meryem<br/><span className="text-blue-light">Temara</span>
            </h1>

            <h2 className="font-display font-700 text-xl lg:text-2xl xl:text-3xl text-slate-300 leading-snug mb-6">
              I build modern web experiences<br className="hidden lg:block"/> from idea to deployment.
            </h2>

            <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
              Full Stack Web Developer graduated from OFPPT in Digital Development – Full Stack. I build modern web applications from intuitive user interfaces to backend systems, REST APIs and databases.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}
                className="px-6 py-3 bg-blue text-white font-semibold rounded-xl hover:bg-blue-light transition-all duration-200 shadow-lg hover:shadow-blue/25 hover:-translate-y-0.5">
                View My Projects
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
                className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200">
                Contact Me
              </button>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/meryem200612" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200">
                <GithubIcon size={20}/><span className="text-sm">GitHub</span>
              </a>
              <span className="w-px h-4 bg-slate-600"/>
              <a href="https://linkedin.com/in/meryem-temara-0b5b04427/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200">
                <LinkedinIcon size={20}/><span className="text-sm">LinkedIn</span>
              </a>
              <span className="w-px h-4 bg-slate-600"/>
              <a href="mailto:temarameryem@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200">
                <MailIcon size={20}/><span className="text-sm">Email</span>
              </a>
            </div>
          </div>

          {/* Right — Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in" style={{animationDelay:'0.2s'}}>
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* decorative ring */}
              <div className="absolute inset-0 rounded-3xl rotate-3 bg-gradient-to-br from-blue/30 to-pink/20 blur-sm"/>
              <div className="absolute inset-0 rounded-3xl -rotate-2 border border-blue/30"/>

              {/* photo */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500">
                <img
                  src={profilePhoto}
                  alt="Meryem Temara — Full Stack Web Developer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent"/>
              </div>

              {/* floating badges */}
              {techBadges.map(b => (
                <div key={b.label} className={`absolute ${b.pos} animate-float`}
                  style={{animationDelay: `${Math.random()*2}s`}}>
                  <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold border ${b.color} backdrop-blur-sm shadow-lg whitespace-nowrap`}>
                    {b.label}
                  </span>
                </div>
              ))}

              {/* blue dot accent */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-blue shadow-lg"/>
              <div className="absolute -top-4 right-12 w-4 h-4 rounded-full bg-pink shadow-lg"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── QUICK PROFILE CARDS ─────────────────────────────────────────────────────
function QuickProfile() {
  const cards = [
    { icon: '💻', label: 'Full Stack Developer', sub: 'React.js · Laravel · PHP' },
    { icon: '🎓', label: 'OFPPT', sub: 'Full Stack Development' },
    { icon: '📍', label: 'Casablanca, Morocco', sub: 'Open to remote' },
    { icon: '✅', label: 'Open to Opportunities', sub: 'Ready to join a team' },
  ]
  return (
    <div className="bg-slate py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => (
            <div key={c.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="text-2xl mb-2">{c.icon}</div>
              <p className="font-semibold text-navy text-sm">{c.label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const { ref, visible } = useInView()
  return (
    <section id="about" ref={ref} className={`section-fade ${visible?'visible':''} py-24 bg-white`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-semibold tracking-widest text-blue uppercase">About Me</span>
            <h2 className="font-display font-800 text-3xl lg:text-4xl text-navy mt-3 mb-6">
              Turning ideas into<br/><span className="text-blue">digital experiences</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              I am a Full Stack Web Developer graduated from OFPPT in Digital Development – Full Stack. I enjoy turning ideas into practical web applications, from user interface design to backend development and database management.
            </p>
            <p className="text-slate-600 leading-relaxed">
              During my education and professional experience, I have worked on several projects using React.js, Laravel, PHP, MySQL and REST APIs. I am particularly interested in building modern web applications, intuitive interfaces and useful digital solutions.
            </p>
          </div>

          {/* Tech flow diagram */}
          <div className="bg-slate rounded-2xl p-8 border border-slate-200/60">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-6">My Development Stack</p>
            <div className="flex items-center gap-3 flex-wrap">
              {['Frontend', 'REST API', 'Backend', 'Database'].map((item, i, arr) => (
                <div key={item} className="flex items-center gap-3">
                  <div className={`px-5 py-3 rounded-xl text-sm font-semibold border-2 ${
                    item==='Frontend' ? 'bg-blue/10 border-blue/30 text-blue' :
                    item==='REST API' ? 'bg-pink-50 border-pink/30 text-pink' :
                    item==='Backend' ? 'bg-navy/10 border-navy/30 text-navy' :
                    'bg-slate-100 border-slate-300 text-slate-700'
                  }`}>
                    {item}
                  </div>
                  {i < arr.length-1 && <span className="text-slate-400 text-xl">→</span>}
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { num: '3', label: 'Featured Projects' },
                { num: '2+', label: 'Years of Study' },
                { num: '15+', label: 'Technologies' },
                { num: '2', label: 'Internships' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200/60">
                  <p className="font-display font-800 text-2xl text-blue">{s.num}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────
function Skills() {
  const { ref, visible } = useInView()
  const categories = [
    {
      title: 'Frontend', color: 'text-blue', bg: 'bg-blue/10', border: 'border-blue/20',
      skills: ['HTML','CSS','JavaScript','React.js','Bootstrap','Tailwind CSS','Axios']
    },
    {
      title: 'Backend', color: 'text-navy', bg: 'bg-navy/10', border: 'border-navy/20',
      skills: ['PHP','Laravel','Node.js','REST API','MVC','CRUD','Authentication']
    },
    {
      title: 'Database', color: 'text-pink', bg: 'bg-pink-50', border: 'border-pink/20',
      skills: ['MySQL','MongoDB']
    },
    {
      title: 'Tools', color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200',
      skills: ['Git','GitHub','VS Code','Postman','Jira','Microsoft Office']
    },
    {
      title: 'Methodologies', color: 'text-blue', bg: 'bg-blue/10', border: 'border-blue/20',
      skills: ['Agile','Scrum','OOP']
    },
    {
      title: 'Languages', color: 'text-pink', bg: 'bg-pink-50', border: 'border-pink/20',
      skills: ['Arabic — Native','French — Fluent','English — Intermediate']
    },
  ]

  return (
    <section id="skills" ref={ref} className={`section-fade ${visible?'visible':''} py-24 bg-slate`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue uppercase">Skills & Technologies</span>
          <h2 className="font-display font-800 text-3xl lg:text-4xl text-navy mt-3">
            My Technical Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div key={cat.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200">
              <h3 className={`font-display font-700 text-sm uppercase tracking-wider mb-4 ${cat.color}`}>{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(s => (
                  <span key={s} className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${cat.bg} ${cat.border} ${cat.color} hover:-translate-y-0.5 transition-transform duration-150 cursor-default`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PROJECT MOCKUPS ─────────────────────────────────────────────────────────
function SEHAMockup() {
  return (
    <div className="w-full h-48 rounded-xl overflow-hidden bg-white">
      <img
        src={sehaScreenshot}
        alt="Capture d’écran de la page d’accueil de la plateforme SEHA"
        className="w-full h-full object-cover object-top"
      />
    </div>
  )
}

function CRMMockup() {
  return (
    <div className="w-full h-48 rounded-xl overflow-hidden bg-white">
      <img
        src={crmScreenshot}
        alt="Capture d’écran du CRM MJ Informatique"
        className="w-full h-full object-cover object-top"
      />
    </div>
  )
}

function AMEORAMockup() {
  return (
    <div className="w-full h-48 rounded-xl overflow-hidden bg-white">
      <img
        src={ameoraScreenshot}
        alt="Capture d’écran de la boutique AMEORA"
        className="w-full h-full object-cover object-top"
      />
    </div>
  )
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
function Projects() {
  const { ref, visible } = useInView()
  const projects = [
    {
      name: 'SEHA',
      subtitle: 'Telemedicine Platform',
      badge: 'Graduation Project',
      badgeColor: 'bg-blue/10 text-blue border-blue/20',
      description: 'SEHA is a telemedicine platform designed to connect patients and doctors through digital healthcare services.',
      tech: ['React.js','Laravel 12','PHP','MySQL','Tailwind CSS','Axios','REST API','WebRTC','PeerJS'],
      features: ['Patient / Doctor auth','Doctor & specialty search','Appointment booking','Video consultation','Secure messaging','Prescriptions & programs','Role management & security'],
      github: 'https://github.com/meryem200612/seha-medical-platform',
      Mockup: SEHAMockup,
    },
    {
      name: 'CRM — MJ Informatique',
      subtitle: 'Client & Intervention Management',
      badge: 'Internship · Apr–May 2026',
      badgeColor: 'bg-pink-50 text-pink border-pink/20',
      description: 'Developed a web-based CRM application for managing clients and interventions, with a SPA frontend and REST API backend.',
      tech: ['React.js','Laravel','MySQL','Axios','REST API'],
      features: ['Client management','Intervention management','CRUD operations','Dashboard','Search & filters','Frontend/Backend integration'],
      github: 'https://github.com/meryem200612/crm-laravel-react',
      Mockup: CRMMockup,
    },
    {
      name: 'AMEORA',
      subtitle: 'Jewelry E-commerce',
      badge: 'Personal Project',
      badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
      description: 'AMEORA is a modern e-commerce project focused on women\'s jewelry and accessories, combining an elegant user interface with a Full Stack architecture.',
      tech: ['React.js','Laravel','PHP','MySQL','REST API'],
      features: ['Product catalog & categories','Stock management','Shopping cart','E-commerce interface','REST API','Product administration'],
      github: 'https://github.com/meryem200612/ameora',
      Mockup: AMEORAMockup,
    },
  ]

  return (
    <section id="projects" ref={ref} className={`section-fade ${visible?'visible':''} py-24 bg-navy`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-pink uppercase">Featured Projects</span>
          <h2 className="font-display font-800 text-3xl lg:text-4xl text-white mt-3">
            A selection of projects I have<br/>designed and developed.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.name} className="bg-navy-800 border border-white/10 rounded-2xl overflow-hidden group hover:border-blue/40 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue/10">
              <div className="p-4">
                <p.Mockup/>
              </div>
              <div className="px-5 pb-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-display font-800 text-lg text-white">{p.name}</h3>
                    <p className="text-slate-400 text-sm">{p.subtitle}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300 rounded-md">{t}</span>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Features</p>
                  <div className="grid grid-cols-1 gap-1">
                    {p.features.slice(0,4).map(f => (
                      <div key={f} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue shrink-0"/>
                        <span className="text-xs text-slate-400">{f}</span>
                      </div>
                    ))}
                    {p.features.length > 4 && (
                      <span className="text-xs text-slate-500 mt-0.5">+{p.features.length-4} more</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-white/15 text-white text-xs font-semibold rounded-xl hover:bg-white/10 transition-colors">
                      <GithubIcon size={14}/>GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const { ref, visible } = useInView()
  const experiences = [
    {
      title: 'Web Developer — Internship',
      company: 'ASAO MEDIA',
      period: 'Oct 2026 – Present',
      location: 'Casablanca, Morocco · On-site',
      current: true,
      description:
        'As a Web Development Intern at ASAO MEDIA in Casablanca, I contribute to the development and improvement of modern websites. I work with React.js to build responsive and user-friendly interfaces, integrate designs, and improve website functionality and user experience. I also take part in website maintenance and development tasks, using Git and GitHub as part of the development workflow.',
      tech: ['React.js', 'Responsive Design', 'UI Integration', 'Git', 'GitHub', 'Maintenance'],
    },
    {
      title: 'Full Stack Developer — Internship',
      company: 'MJ Informatique',
      period: 'April 2026 – May 2026',
      location: 'Casablanca, Morocco',
      current: false,
      description:
        'Participated in the development of a CRM application using React.js, Laravel, MySQL, Axios and REST APIs. Worked on frontend development, backend integration, data management, CRUD functionality, dashboard features, search and filtering.',
      tech: ['React.js', 'Laravel', 'MySQL', 'Axios', 'REST API', 'CRUD', 'Dashboard'],
    },
  ]

  return (
    <section id="experience" ref={ref} className={`section-fade ${visible?'visible':''} py-24 bg-white`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue uppercase">Professional Experience</span>
          <h2 className="font-display font-800 text-3xl lg:text-4xl text-navy mt-3">My Journey</h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200"/>
          <div className="space-y-6">
            {experiences.map(exp => (
              <div key={exp.company} className="relative pl-16">
                <div className={`absolute left-4 top-1 w-5 h-5 rounded-full border-4 border-white shadow-md ${exp.current ? 'bg-blue' : 'bg-slate-300'}`}/>
                <div className={`bg-slate rounded-2xl p-6 lg:p-8 border hover:shadow-md transition-shadow duration-200 ${exp.current ? 'border-blue/20' : 'border-slate-200/60'}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display font-700 text-lg text-navy">{exp.title}</h3>
                      <p className="text-blue font-semibold text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue/10 text-blue text-xs font-semibold rounded-full border border-blue/20">
                        {exp.current && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>}
                        {exp.period}
                      </span>
                      <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1 justify-end">
                        <span>📍</span> {exp.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
  const { ref, visible } = useInView()
  const items = [
    {
      years: '2024 – 2026',
      school: 'OFPPT / ISTA NTIC 2 Sidi Maarouf',
      location: 'Casablanca',
      degree: 'Digital Development – Full Stack',
      accent: true,
    },
    {
      years: '2023 – 2024',
      school: 'Faculty of Sciences Ben M\'Sik',
      location: 'Casablanca',
      degree: 'First year — Mathematical and Physical Sciences',
      accent: false,
    },
    {
      years: '2022 – 2023',
      school: 'Lycée Hassan II',
      location: 'Casablanca',
      degree: 'High School Diploma — Physical Sciences',
      accent: false,
    },
  ]

  return (
    <section id="education" ref={ref} className={`section-fade ${visible?'visible':''} py-24 bg-slate`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue uppercase">Education</span>
          <h2 className="font-display font-800 text-3xl lg:text-4xl text-navy mt-3">Academic Background</h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200"/>
          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="relative pl-16">
                <div className={`absolute left-4 top-5 w-5 h-5 rounded-full border-4 border-white shadow-md ${item.accent ? 'bg-blue' : 'bg-slate-300'}`}/>
                <div className={`rounded-2xl p-6 border transition-shadow duration-200 hover:shadow-md ${item.accent ? 'bg-white border-blue/20 shadow-sm' : 'bg-white border-slate-200/60'}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-700 text-base text-navy">{item.school}</h3>
                      <p className={`font-semibold text-sm mt-0.5 ${item.accent ? 'text-blue' : 'text-slate-500'}`}>{item.degree}</p>
                      <p className="text-slate-400 text-xs mt-1">📍 {item.location}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${item.accent ? 'bg-blue/10 text-blue border-blue/20' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {item.years}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── WHAT I CAN BUILD ─────────────────────────────────────────────────────────
function WhatICanBuild() {
  const { ref, visible } = useInView()
  const cards = [
    { icon: '🎨', title: 'Frontend Development', desc: 'Modern and responsive interfaces with React.js', color: 'group-hover:text-blue' },
    { icon: '⚙️', title: 'Backend Development', desc: 'Laravel applications and REST APIs', color: 'group-hover:text-navy' },
    { icon: '🗄️', title: 'Database Development', desc: 'Database design and management with MySQL', color: 'group-hover:text-pink' },
    { icon: '🚀', title: 'Full Stack Applications', desc: 'Complete frontend and backend web applications', color: 'group-hover:text-blue' },
  ]

  return (
    <section ref={ref} className={`section-fade ${visible?'visible':''} py-24 bg-white`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue uppercase">What I Can Build</span>
          <h2 className="font-display font-800 text-3xl lg:text-4xl text-navy mt-3">My Capabilities</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(c => (
            <div key={c.title} className="group bg-slate rounded-2xl p-6 border border-slate-200/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className={`font-display font-700 text-base text-navy mb-2 transition-colors duration-200 ${c.color}`}>{c.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── GITHUB SECTION ───────────────────────────────────────────────────────────
function GitHubSection() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} className={`section-fade ${visible?'visible':''} py-20 bg-navy`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <span className="text-xs font-semibold tracking-widest text-blue uppercase">My Code</span>
        <h2 className="font-display font-800 text-3xl lg:text-4xl text-white mt-3 mb-4">Open Source & Projects</h2>
        <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto">
          Explore my projects and follow my journey in web development.
        </p>
        <a href="https://github.com/meryem200612" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-navy font-semibold rounded-xl hover:bg-slate-100 transition-colors duration-200 shadow-lg">
          <GithubIcon size={20}/>
          View My GitHub
        </a>
      </div>
    </section>
  )
}

// ─── LINKEDIN ─────────────────────────────────────────────────────────────────
function LinkedInSection() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} className={`section-fade ${visible?'visible':''} py-20 bg-slate`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <span className="text-xs font-semibold tracking-widest text-blue uppercase">Let's Connect</span>
        <h2 className="font-display font-800 text-3xl lg:text-4xl text-navy mt-3 mb-4">Professional Network</h2>
        <p className="text-slate-500 text-base mb-8 max-w-lg mx-auto">
          Follow my professional journey, experiences and latest updates on LinkedIn.
        </p>
        <a href="https://linkedin.com/in/meryem-temara-0b5b04427/" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0077B5] text-white font-semibold rounded-xl hover:bg-[#005f91] transition-colors duration-200 shadow-lg">
          <LinkedinIcon size={20}/>
          LinkedIn Profile
        </a>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const { ref, visible } = useInView()
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '').trim()
    const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '').trim()
    const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '').trim()

    const emailBody = `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`

    if (!serviceId || !templateId || !publicKey) {
      window.location.href = `mailto:temarameryem@gmail.com?subject=${encodeURIComponent(`Contact from Meryem Temara Portfolio - ${form.subject || 'General inquiry'}`)}&body=${encodeURIComponent(emailBody)}`
      setSent(true)
      setTimeout(() => setSent(false), 3000)
      setForm({ name:'', email:'', subject:'', message:'' })
      return
    }

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      }, { publicKey })

      setSent(true)
      setTimeout(() => setSent(false), 3000)
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch (error) {
      console.error('Email delivery failed', error)
      window.location.href = `mailto:temarameryem@gmail.com?subject=${encodeURIComponent(`Contact from Meryem Temara Portfolio - ${form.subject || 'General inquiry'}`)}&body=${encodeURIComponent(emailBody)}`
      setSent(true)
      setTimeout(() => setSent(false), 3000)
      setForm({ name:'', email:'', subject:'', message:'' })
    }
  }

  return (
    <section id="contact" ref={ref} className={`section-fade ${visible?'visible':''} py-24 bg-white`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue uppercase">Contact</span>
          <h2 className="font-display font-800 text-3xl lg:text-4xl text-navy mt-3">Let's Work Together</h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto">
            Have an opportunity, a project or a position in web development? Feel free to get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h3 className="font-display font-700 text-xl text-navy mb-6">Get In Touch</h3>
            <div className="space-y-4">
              {[
                { icon: <MailIcon size={18}/>, label: 'Email', val: 'temarameryem@gmail.com', href: 'mailto:temarameryem@gmail.com' },
                { icon: <LinkedinIcon size={18}/>, label: 'LinkedIn', val: 'LinkedIn Profile', href: 'https://linkedin.com/in/meryem-temara-0b5b04427/' },
                { icon: <GithubIcon size={18}/>, label: 'GitHub', val: 'github.com/meryem200612', href: 'https://github.com/meryem200612' },
              ].map(item => (
                <a key={item.label} href={item.href} target={item.href.startsWith('mailto')?'_self':'_blank'} rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate rounded-xl border border-slate-200/60 hover:border-blue/30 hover:shadow-sm transition-all duration-200 group">
                  <div className="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all duration-200">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-medium text-navy">{item.val}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1.5 block">Name</label>
                <input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all"/>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1.5 block">Email</label>
                <input value={form.email} onChange={e => setForm({...form,email:e.target.value})} type="email" required placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all"/>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">Subject</label>
              <input value={form.subject} onChange={e => setForm({...form,subject:e.target.value})} required placeholder="How can I help?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all"/>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">Message</label>
              <textarea value={form.message} onChange={e => setForm({...form,message:e.target.value})} required rows={5} placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all resize-none"/>
            </div>
            <button type="submit"
              className={`w-full py-3.5 font-semibold rounded-xl transition-all duration-200 ${sent ? 'bg-emerald-500 text-white' : 'bg-blue text-white hover:bg-navy-700 hover:shadow-lg hover:-translate-y-0.5'}`}>
              {sent ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const links = ['Home','About','Skills','Projects','Experience','Education','Contact']
  const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:'smooth'})

  return (
    <footer className="bg-navy border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display font-800 text-xl text-white">Meryem<span className="text-blue">.</span></p>
            <p className="text-slate-400 text-sm mt-2">Full Stack Web Developer</p>
            <p className="text-slate-500 text-xs mt-1">Casablanca, Morocco</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Navigation</p>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
              {links.map(l => (
                <button key={l} onClick={() => scrollTo(l)} className="text-left text-slate-400 hover:text-white text-sm transition-colors">
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Connect</p>
            <div className="flex gap-3">
              {[
                { href:'https://github.com/meryem200612', icon:<GithubIcon/>, label:'GitHub' },
                { href:'https://linkedin.com/in/meryem-temara-0b5b04427/', icon:<LinkedinIcon/>, label:'LinkedIn' },
                { href:'mailto:temarameryem@gmail.com', icon:<MailIcon/>, label:'Email' },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('mailto')?'_self':'_blank'} rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/15 transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-slate-500 text-sm">© 2026 Meryem Temara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-body">
      <Navbar/>
      <Hero/>
      <QuickProfile/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Education/>
      <WhatICanBuild/>
      <GitHubSection/>
      <LinkedInSection/>
      <Contact/>
      <Footer/>
    </div>
  )
}