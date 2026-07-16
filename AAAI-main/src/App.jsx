import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'

const emptyForm = {
  email: '',
  password: '',
  confirmPassword: '',
}

export default function App() {
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState(emptyForm)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const isLogin = mode === 'login'

  const resetState = (nextMode) => {
    setMode(nextMode)
    setFormData(emptyForm)
    setShowPassword(false)
    setMessage('')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage('Please fill in the required fields.')
      return
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setMessage('')
    setFormData(emptyForm)
    setShowPassword(false)
    setMode('landing')
  }

  const handleForgetPassword = () => {
    if (!formData.email.trim()) {
      setMessage('Enter your email first so we can send a reset link.')
      return
    }

    setMessage(`Reset link sent to ${formData.email.trim()}.`)
  }

  return isLogin ? (
    <Login
      formData={formData}
      message={message}
      onChange={handleChange}
      onForgetPassword={handleForgetPassword}
      onSubmit={handleSubmit}
      onSwitchToSignup={() => resetState('signup')}
      onTogglePassword={() => setShowPassword((current) => !current)}
      showPassword={showPassword}
    />
  ) : mode === 'signup' ? (
    <Signup
      formData={formData}
      message={message}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onSwitchToLogin={() => resetState('login')}
      onTogglePassword={() => setShowPassword((current) => !current)}
      showPassword={showPassword}
    />
  ) : (
    <Landing
      onGoToLogin={() => resetState('login')}
      onGoToSignup={() => resetState('signup')}
    />
  )
}
