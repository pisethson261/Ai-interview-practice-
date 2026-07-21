import { useState, useRef, useEffect } from 'react'
import {
  IdCard,
  Briefcase,
  FileText,
  Sliders,
  ClipboardList,
  Award,
  Mic,
  Bell,
  User,
  ChevronDown,
  ChevronUp,
  Check,
  Building2,
  Rocket,
  Palette,
  Globe,
  MapPin,
  DollarSign,
  Clock,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Key,
  Target,
  MessageSquare,
  X,
  Home,
  LogOut,
  Sparkles,
  HelpCircle,
  FileCheck
} from 'lucide-react'

/* ── Static data ── */
const NAV_ITEMS = [
  { id: 'introduction', label: 'Private Introduction', Icon: IdCard },
  { id: 'jobs',         label: 'Recommended Jobs',    Icon: Briefcase },
  { id: 'cv',           label: 'CV Evaluation',        Icon: FileText },
  { id: 'preferences',  label: 'Job Preferences',      Icon: Sliders },
  { id: 'applied',      label: 'Applied Jobs',         Icon: ClipboardList },
  { id: 'assessments',  label: 'Past Assessments',     Icon: Award },
]

const NAV_SUBTITLES = {
  introduction: 'Introduce yourself to hiring companies and let the right ones reach out to you.',
  jobs:         'Jobs matched to your profile and preferences.',
  cv:           'Upload your CV and get instant AI-powered feedback.',
  preferences:  'Tell us what you are looking for in your next role.',
  applied:      'Track the status of your job applications.',
  assessments:  'Review your past AI interview and skills assessments.',
}

const SAMPLE_JOBS = [
  { id: 1, title: 'Frontend Developer',   company: 'TechCorp Asia',  location: 'Remote',        salary: '$80k – $100k', type: 'Full-time', match: 95, Icon: Building2, tags: ['React', 'TypeScript', 'Tailwind'] },
  { id: 2, title: 'React Engineer',        company: 'StartupXYZ',    location: 'Bangkok, TH',   salary: '$60k – $85k',  type: 'Full-time', match: 88, Icon: Rocket, tags: ['React', 'Node.js', 'PostgreSQL'] },
  { id: 3, title: 'UI / UX Developer',     company: 'DesignStudio',  location: 'Hybrid',        salary: '$70k – $90k',  type: 'Contract',  match: 82, Icon: Palette, tags: ['Figma', 'CSS', 'JavaScript'] },
  { id: 4, title: 'Full Stack Developer',  company: 'GlobalTech',    location: 'Remote',        salary: '$90k – $120k', type: 'Full-time', match: 78, Icon: Globe, tags: ['React', 'Python', 'AWS'] },
]

const INITIAL_APPLIED = [
  { id: 1, title: 'Product Designer', company: 'InnovateCo', date: 'Jul 15, 2026', status: 'Under Review' },
  { id: 2, title: 'UX Researcher',    company: 'DataViz Inc', date: 'Jul 10, 2026', status: 'Interview Scheduled' },
]

const ASSESSMENTS = [
  { id: 1, title: 'JavaScript Fundamentals',   date: 'Jul 18, 2026', score: 92, status: 'Passed', duration: '45 min' },
  { id: 2, title: 'React & State Management',  date: 'Jul 12, 2026', score: 85, status: 'Passed', duration: '60 min' },
  { id: 3, title: 'System Design Basics',      date: 'Jul 8, 2026',  score: 67, status: 'Passed', duration: '90 min' },
]

const PRACTICE_QUESTIONS = [
  'Tell me about yourself and your background.',
  'What is your greatest professional strength?',
  'Describe a challenging situation you faced at work and how you resolved it.',
]

const STATUS_COLOR = {
  'Under Review':        '#d97706',
  'Interview Scheduled': '#2f5de6',
  'Rejected':            '#dc2626',
  'Offered':             '#16a34a',
  'Passed':              '#16a34a',
  'Failed':              '#dc2626',
}
const STATUS_BG = {
  'Under Review':        'rgba(217, 119, 6, 0.1)',
  'Interview Scheduled': 'rgba(47, 93, 230, 0.1)',
  'Rejected':            'rgba(220, 38, 38, 0.1)',
  'Offered':             'rgba(22, 163, 74, 0.1)',
  'Passed':              'rgba(22, 163, 74, 0.1)',
  'Failed':              'rgba(220, 38, 38, 0.1)',
}

/* ── Notification Bell ── */
function NotificationBell({ count }) {
  const [open, setOpen] = useState(false)
  const [notifCount, setNotifCount] = useState(count)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleOpen = () => {
    setOpen(o => !o)
    if (!open) setNotifCount(0)
  }

  return (
    <div className="cdb-notif-wrap" ref={ref}>
      <button className="cdb-notif-btn" onClick={handleOpen} aria-label="Notifications">
        <Bell className="cdb-icon-svg" />
        {notifCount > 0 && <span className="cdb-notif-dot">{notifCount}</span>}
      </button>
      {open && (
        <div className="cdb-notif-dropdown">
          <p className="cdb-notif-title">Notifications</p>
          <div className="cdb-notif-item">
            <span className="cdb-notif-icon-dot blue" />
            <div>
              <p>Your profile was viewed by <strong>TechCorp Asia</strong></p>
              <small>2 hours ago</small>
            </div>
          </div>
          <div className="cdb-notif-item">
            <span className="cdb-notif-icon-dot green" />
            <div>
              <p>New job match: <strong>Frontend Developer</strong></p>
              <small>5 hours ago</small>
            </div>
          </div>
          <button className="cdb-notif-clear" onClick={() => setOpen(false)}>Mark all as read</button>
        </div>
      )}
    </div>
  )
}

/* ── User Avatar Menu ── */
function UserMenu({ onOpenLogin, onOpenSignup, onBackToLanding }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="cdb-user-wrap" ref={ref}>
      <button className="cdb-avatar-btn" onClick={() => setOpen(o => !o)} aria-label="User menu">
        <span className="cdb-avatar">R</span>
        <span className="cdb-avatar-name">Rin</span>
        {open ? <ChevronUp className="cdb-chevron-svg" /> : <ChevronDown className="cdb-chevron-svg" />}
      </button>
      {open && (
        <div className="cdb-user-dropdown">
          <div className="cdb-user-info">
            <span className="cdb-avatar lg">R</span>
            <div>
              <p className="cdb-user-name">Rin</p>
              <p className="cdb-user-email">rin@example.com</p>
            </div>
          </div>
          <hr className="cdb-dropdown-divider" />
          <button className="cdb-dropdown-item" onClick={() => { setOpen(false); onBackToLanding() }}>
            <Home className="cdb-dropdown-icon" /> Home
          </button>
          <button className="cdb-dropdown-item" onClick={() => { setOpen(false); onOpenLogin() }}>
            <LogOut className="cdb-dropdown-icon" /> Log in
          </button>
          <button className="cdb-dropdown-item accent" onClick={() => { setOpen(false); onOpenSignup() }}>
            <Sparkles className="cdb-dropdown-icon" /> Sign up
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Component ── */
export default function CandidateDashboard({ onOpenLogin, onOpenSignup, onBackToLanding }) {
  /* Nav */
  const [activeNav, setActiveNav] = useState('introduction')

  /* Private Introduction */
  const [introStarted, setIntroStarted] = useState(false)
  const [introSaved,   setIntroSaved]   = useState(false)
  const [introForm, setIntroForm] = useState({ headline: '', bio: '', skills: '', portfolio: '' })

  /* CV Evaluation */
  const [cvFile,      setCvFile]      = useState(null)
  const [cvAnalyzing, setCvAnalyzing] = useState(false)
  const [cvResult,    setCvResult]    = useState(null)
  const [dragOver,    setDragOver]    = useState(false)
  const fileInputRef = useRef(null)

  /* Job Preferences */
  const [preferences, setPreferences] = useState({
    role: '', location: '', minSalary: '50000', workType: 'any', industry: '', openToRemote: true,
  })
  const [prefSaved, setPrefSaved] = useState(false)

  /* Applied Jobs */
  const [appliedJobs, setAppliedJobs] = useState(INITIAL_APPLIED)
  const [appliedIds,  setAppliedIds]  = useState(new Set())

  /* Practice Modal & Flow */
  const [showPracticeModal, setShowPracticeModal] = useState(false)
  const [practiceModalStep, setPracticeModalStep] = useState('intro')
  const [practiceStep,       setPracticeStep]       = useState(0)
  const [practiceAnswer,     setPracticeAnswer]     = useState('')
  const [interviewLink,      setInterviewLink]      = useState('https://talent.pulse.ai/interview/candidate-practice')

  /* Accordions */
  const [openFaq, setOpenFaq] = useState(null)

  /* Feedback Modal */
  const [showFeedback,  setShowFeedback]  = useState(false)
  const [feedbackText,  setFeedbackText]  = useState('')
  const [feedbackSent,  setFeedbackSent]  = useState(false)

  /* Toast */
  const [toast, setToast] = useState(null)
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  /* ── Handlers ── */
  const openPractice = () => {
    setShowPracticeModal(true)
    setPracticeModalStep('intro')
    setPracticeStep(0)
    setPracticeAnswer('')
  }

  const startPracticeQuestions = () => {
    setPracticeModalStep('questions')
    setPracticeStep(0)
    setPracticeAnswer('')
  }

  const handleApply = (job) => {
    if (appliedIds.has(job.id)) return
    setAppliedIds(prev => new Set([...prev, job.id]))
    setAppliedJobs(prev => [{
      id: Date.now(),
      title: job.title,
      company: job.company,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Under Review',
    }, ...prev])
    showToast(`Applied to ${job.title} at ${job.company}!`)
  }

  const handleCvFile = (file) => {
    setCvFile(file); setCvResult(null); setCvAnalyzing(true)
    setTimeout(() => {
      setCvAnalyzing(false)
      setCvResult({
        score: 82, atsScore: 78,
        strengths:    ['Clear work history', 'Good use of action verbs', 'Quantified achievements'],
        improvements: ['Add a professional summary', 'Include LinkedIn URL', 'More keywords for ATS'],
        keywords:     ['React', 'JavaScript', 'TypeScript', 'Frontend', 'UI/UX'],
      })
    }, 2500)
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleCvFile(file)
  }

  const handleSaveIntro = (e) => {
    e.preventDefault()
    setIntroSaved(true)
    showToast('Introduction saved successfully!')
  }

  const handleSavePrefs = (e) => {
    e.preventDefault()
    setPrefSaved(true)
    showToast('Preferences saved!')
    setTimeout(() => setPrefSaved(false), 3000)
  }

  /* ── Current nav label ── */
  const navLabel = NAV_ITEMS.find(n => n.id === activeNav)?.label ?? ''

  return (
    <div className="cdb-root">

      {/* ── Toast ── */}
      {toast && (
        <div className={`cdb-toast cdb-toast-${toast.type}`}>
          <span className="cdb-toast-icon">
            <Check className="cdb-icon-xs" />
          </span>
          {toast.msg}
        </div>
      )}

      {/* ── Top bar ── */}
      <header className="cdb-topbar">
        <div className="cdb-brand">
          <img className="candidate-logo" src="/logo.svg" alt="TalentPulse logo" />
          <span>TalentPulse</span>
        </div>
        <div className="cdb-topbar-right">
          <NotificationBell count={2} />
          <UserMenu
            onOpenLogin={onOpenLogin}
            onOpenSignup={onOpenSignup}
            onBackToLanding={onBackToLanding}
          />
        </div>
      </header>

      {/* ── Body ── */}
      <div className="cdb-body">

        {/* Sidebar */}
        <aside className="cdb-sidebar">
          <p className="cdb-welcome">Welcome, Rin!</p>

          <nav className="cdb-nav">
            {NAV_ITEMS.map(item => {
              const ItemIcon = item.Icon
              return (
                <button
                  key={item.id}
                  className={`cdb-nav-btn${activeNav === item.id ? ' active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <ItemIcon className="cdb-nav-svg-icon" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Practice card */}
          <div className="cdb-practice-card">
            <div className="cdb-practice-icon-box">
              <Mic className="cdb-practice-svg" />
            </div>
            <strong>Have an upcoming interview?</strong>
            <p>Practice with AI first — get comfortable before it counts.</p>
            <button className="cdb-practice-btn" onClick={openPractice}>Start practicing</button>
          </div>
        </aside>

        {/* Main content */}
        <main className="cdb-main">
          <div className="cdb-main-header">
            <h1 className="cdb-page-title">{navLabel}</h1>
            <p className="cdb-page-subtitle">{NAV_SUBTITLES[activeNav]}</p>
          </div>

          {/* ═══════════════════════════════════
              PRIVATE INTRODUCTION
          ═══════════════════════════════════ */}
          {activeNav === 'introduction' && (
            !introStarted ? (
              <div className="cdb-card cdb-center-card cdb-intro-splash">
                <div className="cdb-intro-icon-wrap">
                  <IdCard className="cdb-intro-stroke-icon" />
                  <span className="cdb-intro-check-badge">
                    <Check className="cdb-icon-xs" />
                  </span>
                </div>
                <h2>Private Introduction</h2>
                <p className="cdb-card-desc">
                  We recommend you to potential employers only when there is a{' '}
                  <span className="cdb-highlight">clear match</span>. You stay in{' '}
                  <span className="cdb-highlight">full control</span>.
                </p>
                <ul className="cdb-checklist">
                  <li>
                    <span className="cdb-check-icon-circle">
                      <Check className="cdb-icon-xs" />
                    </span>
                    Shared only with companies with suitable roles
                  </li>
                  <li>
                    <span className="cdb-check-icon-circle">
                      <Check className="cdb-icon-xs" />
                    </span>
                    Receive interview requests and offers directly
                  </li>
                </ul>
                <button className="cdb-btn-primary cdb-btn-wide" onClick={() => setIntroStarted(true)}>
                  Get Started
                </button>
              </div>
            ) : introSaved ? (
              <div className="cdb-card cdb-center-card">
                <div className="cdb-card-icon-box">
                  <CheckCircle2 className="cdb-stroke-hero-icon green" />
                </div>
                <h2>You're all set!</h2>
                <p className="cdb-card-desc">
                  Your private introduction is live. Companies that are a great match can now reach out to you.
                </p>
                <button className="cdb-btn-outline" onClick={() => { setIntroSaved(false); setIntroStarted(true) }}>
                  Edit Introduction
                </button>
              </div>
            ) : (
              <div className="cdb-card">
                <h2 className="cdb-form-title">Your Introduction</h2>
                <form className="cdb-form" onSubmit={handleSaveIntro}>
                  <label>
                    <span>Professional Headline</span>
                    <input
                      type="text"
                      placeholder="e.g. Senior Frontend Developer with 5 years experience"
                      value={introForm.headline}
                      onChange={e => setIntroForm(f => ({ ...f, headline: e.target.value }))}
                      required
                    />
                  </label>
                  <label>
                    <span>Short Bio</span>
                    <textarea
                      rows={4}
                      placeholder="Tell employers about yourself, your background, and what you're looking for…"
                      value={introForm.bio}
                      onChange={e => setIntroForm(f => ({ ...f, bio: e.target.value }))}
                      required
                    />
                  </label>
                  <label>
                    <span>Key Skills (comma separated)</span>
                    <input
                      type="text"
                      placeholder="e.g. React, TypeScript, Node.js, UI/UX"
                      value={introForm.skills}
                      onChange={e => setIntroForm(f => ({ ...f, skills: e.target.value }))}
                    />
                  </label>
                  <label>
                    <span>Portfolio / LinkedIn URL</span>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={introForm.portfolio}
                      onChange={e => setIntroForm(f => ({ ...f, portfolio: e.target.value }))}
                    />
                  </label>
                  <div className="cdb-form-actions">
                    <button type="button" className="cdb-btn-outline" onClick={() => setIntroStarted(false)}>Back</button>
                    <button type="submit" className="cdb-btn-primary">Save Introduction</button>
                  </div>
                </form>
              </div>
            )
          )}

          {/* ═══════════════════════════════════
              RECOMMENDED JOBS
          ═══════════════════════════════════ */}
          {activeNav === 'jobs' && (
            <div className="cdb-jobs-grid">
              {SAMPLE_JOBS.map(job => {
                const JobLogo = job.Icon
                return (
                  <div key={job.id} className="cdb-job-card">
                    <div className="cdb-job-header">
                      <div className="cdb-job-logo">
                        <JobLogo className="cdb-job-logo-svg" />
                      </div>
                      <div className="cdb-job-meta">
                        <h3>{job.title}</h3>
                        <span>{job.company}</span>
                      </div>
                      <div className="cdb-match-badge">{job.match}% match</div>
                    </div>
                    <div className="cdb-job-details">
                      <span><MapPin className="cdb-inline-icon" /> {job.location}</span>
                      <span><DollarSign className="cdb-inline-icon" /> {job.salary}</span>
                      <span><Clock className="cdb-inline-icon" /> {job.type}</span>
                    </div>
                    <div className="cdb-job-tags">
                      {job.tags.map(tag => <span key={tag} className="cdb-tag">{tag}</span>)}
                    </div>
                    <button
                      className={appliedIds.has(job.id) ? 'cdb-btn-applied' : 'cdb-btn-primary'}
                      onClick={() => handleApply(job)}
                      disabled={appliedIds.has(job.id)}
                    >
                      {appliedIds.has(job.id) ? '✓ Applied' : 'Apply Now'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* ═══════════════════════════════════
              CV EVALUATION
          ═══════════════════════════════════ */}
          {activeNav === 'cv' && (
            <div className="cdb-card">
              {!cvFile ? (
                <div
                  className={`cdb-dropzone${dragOver ? ' drag-over' : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="cdb-drop-icon-svg" />
                  <p>Drag &amp; drop your CV here, or <span className="cdb-highlight">browse</span></p>
                  <small>Supports PDF, DOCX, DOC — Max 5 MB</small>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={e => e.target.files[0] && handleCvFile(e.target.files[0])}
                  />
                </div>
              ) : cvAnalyzing ? (
                <div className="cdb-center-state">
                  <div className="cdb-spinner" />
                  <p className="cdb-analyzing-text">Analyzing <strong>{cvFile.name}</strong>…</p>
                  <small style={{ color: '#94a3b8' }}>This usually takes a few seconds</small>
                </div>
              ) : cvResult ? (
                <div className="cdb-cv-result">
                  <div className="cdb-cv-score-row">
                    <div className="cdb-score-circle">
                      <span>{cvResult.score}</span>
                      <small>/100</small>
                    </div>
                    <div>
                      <h3>Overall CV Score</h3>
                      <p>ATS Compatibility: <strong style={{ color: '#2f5de6' }}>{cvResult.atsScore}%</strong></p>
                      <button
                        className="cdb-btn-outline cdb-small-btn"
                        onClick={() => { setCvFile(null); setCvResult(null) }}
                      >
                        Upload new CV
                      </button>
                    </div>
                  </div>
                  <div className="cdb-cv-sections">
                    <div className="cdb-cv-section">
                      <h4><CheckCircle2 className="cdb-heading-icon green" /> Strengths</h4>
                      <ul>
                        {cvResult.strengths.map(s => (
                          <li key={s}>
                            <span className="cdb-check-icon-circle green">
                              <Check className="cdb-icon-xs" />
                            </span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="cdb-cv-section">
                      <h4><AlertCircle className="cdb-heading-icon amber" /> Areas to Improve</h4>
                      <ul>
                        {cvResult.improvements.map(i => (
                          <li key={i}>
                            <span className="cdb-check-icon-circle amber">!</span>
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="cdb-keywords">
                    <h4><Key className="cdb-heading-icon" /> Detected Keywords</h4>
                    <div className="cdb-keyword-chips">
                      {cvResult.keywords.map(k => <span key={k} className="cdb-tag">{k}</span>)}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* ═══════════════════════════════════
              JOB PREFERENCES
          ═══════════════════════════════════ */}
          {activeNav === 'preferences' && (
            <div className="cdb-card">
              <form className="cdb-form" onSubmit={handleSavePrefs}>
                <div className="cdb-form-row">
                  <label>
                    <span>Desired Role</span>
                    <input
                      type="text"
                      placeholder="e.g. Frontend Developer, Product Designer"
                      value={preferences.role}
                      onChange={e => setPreferences(p => ({ ...p, role: e.target.value }))}
                    />
                  </label>
                  <label>
                    <span>Preferred Location</span>
                    <input
                      type="text"
                      placeholder="e.g. Bangkok, Singapore, Remote"
                      value={preferences.location}
                      onChange={e => setPreferences(p => ({ ...p, location: e.target.value }))}
                    />
                  </label>
                </div>
                <label>
                  <span>Minimum Salary (USD / year) — <strong style={{ color: '#2f5de6' }}>${Number(preferences.minSalary).toLocaleString()}</strong></span>
                  <input
                    type="range"
                    min="20000"
                    max="200000"
                    step="5000"
                    value={preferences.minSalary}
                    onChange={e => setPreferences(p => ({ ...p, minSalary: e.target.value }))}
                  />
                </label>
                <div className="cdb-form-row">
                  <label>
                    <span>Work Type</span>
                    <select
                      value={preferences.workType}
                      onChange={e => setPreferences(p => ({ ...p, workType: e.target.value }))}
                    >
                      <option value="any">Any</option>
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </label>
                  <label>
                    <span>Industry</span>
                    <input
                      type="text"
                      placeholder="e.g. Technology, Finance, Healthcare"
                      value={preferences.industry}
                      onChange={e => setPreferences(p => ({ ...p, industry: e.target.value }))}
                    />
                  </label>
                </div>
                <label className="cdb-toggle-label">
                  <input
                    type="checkbox"
                    checked={preferences.openToRemote}
                    onChange={e => setPreferences(p => ({ ...p, openToRemote: e.target.checked }))}
                  />
                  <span>Open to fully remote opportunities</span>
                </label>
                <div className="cdb-form-actions">
                  <button type="submit" className="cdb-btn-primary">Save Preferences</button>
                  {prefSaved && <span className="cdb-saved-msg">✓ Saved successfully!</span>}
                </div>
              </form>
            </div>
          )}

          {/* ═══════════════════════════════════
              APPLIED JOBS
          ═══════════════════════════════════ */}
          {activeNav === 'applied' && (
            appliedJobs.length === 0 ? (
              <div className="cdb-card cdb-center-card">
                <div className="cdb-card-icon-box">
                  <FileCheck className="cdb-stroke-hero-icon" />
                </div>
                <h2>No applications yet</h2>
                <p className="cdb-card-desc">Browse recommended jobs and apply — they'll appear here.</p>
                <button className="cdb-btn-primary" onClick={() => setActiveNav('jobs')}>Browse Jobs</button>
              </div>
            ) : (
              <div className="cdb-card">
                <table className="cdb-table">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Company</th>
                      <th>Applied</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedJobs.map(job => (
                      <tr key={job.id} className="cdb-table-row">
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.date}</td>
                        <td>
                          <span
                            className="cdb-status-badge"
                            style={{ background: STATUS_BG[job.status], color: STATUS_COLOR[job.status] }}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* ═══════════════════════════════════
              PAST ASSESSMENTS & PRACTICE SMART
          ═══════════════════════════════════ */}
          {activeNav === 'assessments' && (
            <div className="cdb-assessments">
              {/* Practice Hero Card */}
              <div className="cdb-card cdb-practice-hero-card">
                <div className="cdb-practice-header-badge">
                  <span className="cdb-icon-chip">
                    <FileText className="cdb-icon-svg" />
                  </span>
                  <strong>Have an upcoming TalentPulse interview?</strong>
                </div>
                <p className="cdb-practice-hero-sub">
                  Paste your interview link to practice with an AI session shaped like your real interview — before it counts.
                </p>
                <div className="cdb-practice-link-row">
                  <input
                    type="text"
                    className="cdb-practice-link-input"
                    value={interviewLink}
                    onChange={e => setInterviewLink(e.target.value)}
                    placeholder="https://talent.pulse.ai/interview/your-id..."
                  />
                  <button className="cdb-btn-dark" onClick={startPracticeQuestions}>
                    Begin Practice →
                  </button>
                </div>
              </div>

              {/* Accordions */}
              <div className="cdb-accordions">
                <div className="cdb-accordion-item">
                  <button
                    className="cdb-accordion-header"
                    onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  >
                    <span>Where can I find my interview link?</span>
                    {openFaq === 1 ? <ChevronUp className="cdb-chevron-svg" /> : <ChevronDown className="cdb-chevron-svg" />}
                  </button>
                  {openFaq === 1 && (
                    <div className="cdb-accordion-body">
                      Check the email invitation or message sent to you by the hiring company. The link usually starts with <code>https://talent.pulse.ai/interview/</code>.
                    </div>
                  )}
                </div>

                <div className="cdb-accordion-item">
                  <button
                    className="cdb-accordion-header"
                    onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  >
                    <span>Don't have an interview link?</span>
                    {openFaq === 2 ? <ChevronUp className="cdb-chevron-svg" /> : <ChevronDown className="cdb-chevron-svg" />}
                  </button>
                  {openFaq === 2 && (
                    <div className="cdb-accordion-body">
                      No problem! You can practice general role-based interview questions or skill assessments directly anytime.
                    </div>
                  )}
                </div>
              </div>

              {/* Past Assessments List */}
              <h3 className="cdb-sub-section-title">Past Assessment History</h3>
              {ASSESSMENTS.map(a => (
                <div key={a.id} className="cdb-assessment-card">
                  <div className="cdb-assessment-info">
                    <h3>{a.title}</h3>
                    <p>{a.date} · {a.duration}</p>
                  </div>
                  <div className="cdb-assessment-score">
                    <div className="cdb-score-ring" style={{ '--score': a.score }}>
                      <span>{a.score}%</span>
                    </div>
                    <span
                      className="cdb-status-badge"
                      style={{ background: STATUS_BG[a.status], color: STATUS_COLOR[a.status] }}
                    >
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="cdb-footer">
        <div className="cdb-footer-links">
          <button className="cdb-footer-link">Privacy Policy</button>
          <button className="cdb-footer-link">Terms of Service</button>
          <a href="mailto:contact@talentpulse.ai" className="cdb-footer-link">contact@talentpulse.ai</a>
        </div>
        <p className="cdb-footer-copy">© Princop Pte. Ltd. All rights reserved.</p>
      </footer>

      {/* ── Floating feedback button ── */}
      <button className="cdb-feedback-btn" onClick={() => setShowFeedback(true)}>
        <MessageSquare className="cdb-inline-icon" /> Feedback / Support
      </button>

      {/* ══════════════════════════════════════════
          PRACTICE INTERVIEW MODAL (Flowmingo Popup)
      ══════════════════════════════════════════ */}
      {showPracticeModal && (
        <div className="cdb-overlay" onClick={() => setShowPracticeModal(false)}>
          <div className="cdb-flowmingo-modal" onClick={e => e.stopPropagation()}>
            <button className="cdb-modal-close-dark" onClick={() => setShowPracticeModal(false)}>
              <X className="cdb-icon-xs" />
            </button>

            {practiceModalStep === 'intro' ? (
              <div className="cdb-interview-intro-modal">
                <div className="cdb-modal-header-gradient">
                  <h2>Got an interview link from a company?</h2>
                  <p>
                    Practice with an AI session shaped like your real interview — before it counts.
                  </p>
                </div>

                <div className="cdb-modal-body-content">
                  <ul className="cdb-flowmingo-checklist">
                    <li>
                      <span className="cdb-circle-check-stroke">
                        <Check className="cdb-icon-xs" />
                      </span>
                      <div>
                        <strong>Paste your interview link</strong> — the one the company sent you
                      </div>
                    </li>
                    <li>
                      <span className="cdb-circle-check-stroke">
                        <Check className="cdb-icon-xs" />
                      </span>
                      <div>
                        <strong>Start a practice session</strong> built on that interview's format
                      </div>
                    </li>
                    <li>
                      <span className="cdb-circle-check-stroke">
                        <Check className="cdb-icon-xs" />
                      </span>
                      <div>
                        <strong>Do the real interview</strong> through the company's link, as usual
                      </div>
                    </li>
                  </ul>

                  <button className="cdb-btn-dark cdb-btn-full" onClick={startPracticeQuestions}>
                    Start practicing
                  </button>
                </div>
              </div>
            ) : (
              <div className="cdb-interview-questions-modal">
                {practiceStep < PRACTICE_QUESTIONS.length ? (
                  <>
                    <div className="cdb-modal-header">
                      <span className="cdb-modal-badge">
                        Question {practiceStep + 1} of {PRACTICE_QUESTIONS.length}
                      </span>
                      <h3>{PRACTICE_QUESTIONS[practiceStep]}</h3>
                    </div>
                    <div className="cdb-modal-progress">
                      <div
                        className="cdb-modal-progress-bar"
                        style={{ width: `${((practiceStep + 1) / PRACTICE_QUESTIONS.length) * 100}%` }}
                      />
                    </div>
                    <textarea
                      className="cdb-practice-textarea"
                      rows={5}
                      placeholder="Type or record your answer here…"
                      value={practiceAnswer}
                      onChange={e => setPracticeAnswer(e.target.value)}
                    />
                    <button
                      className="cdb-btn-primary"
                      style={{ width: '100%' }}
                      onClick={() => { setPracticeStep(s => s + 1); setPracticeAnswer('') }}
                      disabled={!practiceAnswer.trim()}
                    >
                      {practiceStep < PRACTICE_QUESTIONS.length - 1 ? 'Next Question →' : 'Finish Practice →'}
                    </button>
                  </>
                ) : (
                  <div className="cdb-modal-success">
                    <div className="cdb-card-icon-box">
                      <Sparkles className="cdb-stroke-hero-icon green" />
                    </div>
                    <h3>Great work!</h3>
                    <p>You've completed all practice questions. You're one step closer to nailing your interview!</p>
                    <button className="cdb-btn-primary" onClick={() => { setShowPracticeModal(false); setPracticeStep(0) }}>
                      Done
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          FEEDBACK MODAL
      ══════════════════════════════════════════ */}
      {showFeedback && (
        <div className="cdb-overlay" onClick={() => { setShowFeedback(false); setFeedbackSent(false); setFeedbackText('') }}>
          <div className="cdb-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setShowFeedback(false); setFeedbackSent(false); setFeedbackText('') }}>
              <X className="cdb-icon-xs" />
            </button>
            {!feedbackSent ? (
              <>
                <div className="cdb-modal-header" style={{ marginBottom: 16 }}>
                  <h3>Send Feedback</h3>
                </div>
                <textarea
                  className="cdb-practice-textarea"
                  rows={4}
                  placeholder="Share your thoughts or report an issue…"
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                />
                <button
                  className="cdb-btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => feedbackText.trim() && setFeedbackSent(true)}
                  disabled={!feedbackText.trim()}
                >
                  Send Feedback
                </button>
              </>
            ) : (
              <div className="cdb-modal-success">
                <div className="cdb-card-icon-box">
                  <CheckCircle2 className="cdb-stroke-hero-icon green" />
                </div>
                <h3>Thank you!</h3>
                <p>Your feedback has been received. We appreciate you helping us improve.</p>
                <button className="cdb-btn-primary" onClick={() => { setShowFeedback(false); setFeedbackSent(false); setFeedbackText('') }}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
