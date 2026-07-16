import { useState } from 'react'

const options = [
  {
    id: 'company',
    title: 'Company / Recruiter',
    buttonLabel: 'Company Sign In',
    icon: '🏢',
  },
  {
    id: 'candidate',
    title: 'Candidate / Job Seeker',
    buttonLabel: 'Candidate Sign In',
    icon: '👤',
  },
]

export default function Landing({ onGoToLogin, onGoToSignup }) {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [selectedRole, setSelectedRole] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSelect = (role) => {
    setSelectedRole(role)
    setStatusMessage(role === 'company' ? 'Company / Recruiter selected.' : 'Candidate / Job Seeker selected.')
  }

  const handleContinue = () => {
    setIsModalOpen(false)
    setStatusMessage(selectedRole ? `Continuing as ${selectedRole}.` : 'Modal closed.')
  }

  return (
    <main className="landing-page">
      <header className="landing-nav">
        <div className="landing-brand">
          <img src="/logo.svg" alt="AAAI Main logo" className="landing-logo" />
          <span>AAAI Main</span>
        </div>
        <div className="landing-actions">
          <button type="button" className="ghost-button" onClick={onGoToLogin}>
            Login
          </button>
          <button type="button" className="ghost-button" onClick={onGoToSignup}>
            Sign Up
          </button>
        </div>
      </header>

      <section className="landing-hero">
        <p className="landing-pill">Now powered by AI</p>
        <h1>AI Interview &amp; CV Screener</h1>
        <p className="landing-copy">
          Fast, clean screening that helps recruiters discover hidden talent sooner and keeps job seekers moving.
        </p>
        <h2>FREE. FOREVER.</h2>
        <button type="button" className="primary-cta" onClick={() => setIsModalOpen(true)}>
          Get Started Free →
        </button>
      </section>

      {isModalOpen ? <div className="landing-overlay" aria-hidden="true" /> : null}

      {isModalOpen ? (
        <section className="landing-modal" aria-label="Choose account type">
          <button type="button" className="modal-close" onClick={handleContinue} aria-label="Close dialog">
            ×
          </button>
          <h3>What best describes you?</h3>
          <div className="option-grid">
            {options.map((option) => (
              <article className="option-card" key={option.id} aria-selected={selectedRole === option.id}>
                <div className="option-icon" aria-hidden="true">
                  {option.icon}
                </div>
                <h4>{option.title}</h4>
                <button type="button" className="option-button" onClick={() => handleSelect(option.id)}>
                  {option.buttonLabel} →
                </button>
              </article>
            ))}
          </div>
          <div className="modal-footer">
            <p className="modal-message">{statusMessage || 'Choose one path to continue.'}</p>
            <button type="button" className="secondary-cta" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </section>
      ) : null}
    </main>
  )
}
