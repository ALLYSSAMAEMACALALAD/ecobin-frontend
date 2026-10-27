import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'
import Alert from '../components/Alert.jsx'

const empty = { full_name: '', email: '', phone: '', password: '', password_confirm: '' }

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState([])
  const [busy, setBusy] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErrors([])
    try {
      await register(form)
      navigate('/resident/dashboard', { replace: true })
    } catch (err) {
      setErrors(err.messages)
      setBusy(false)
    }
  }

  return (
    <section className="narrow">
      <h1>Create your account</h1>
      <Alert type="error" messages={errors} />
      <form className="form" onSubmit={onSubmit}>
        <label>
          Full name
          <input type="text" required maxLength={120} value={form.full_name} onChange={set('full_name')} />
        </label>
        <label>
          Email
          <input type="email" required value={form.email} onChange={set('email')} />
        </label>
        <label>
          Phone (optional)
          <input type="tel" value={form.phone} onChange={set('phone')} />
        </label>
        <label>
          Password (at least 8 characters)
          <input type="password" required minLength={8} value={form.password} onChange={set('password')} />
        </label>
        <label>
          Confirm password
          <input type="password" required minLength={8} value={form.password_confirm} onChange={set('password_confirm')} />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="muted">Already have an account? <Link to="/login">Log in</Link>.</p>
    </section>
  )
}
