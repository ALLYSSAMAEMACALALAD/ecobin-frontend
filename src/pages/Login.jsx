import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'
import Alert from '../components/Alert.jsx'

export default function Login() {
  const { login, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState([])
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErrors([])
    try {
      const user = await login(form.email.trim(), form.password)
      if (user.role !== 'resident') {
        // The React app covers the resident side for now. Admin and collector
        // pages are still on the PHP site, so end this session here.
        await logout()
        setErrors(['This app is for residents only for now. Admin and collector pages are still on the PHP site.'])
        setBusy(false)
        return
      }
      navigate(location.state?.from || '/resident/dashboard', { replace: true })
    } catch (err) {
      setErrors(err.messages)
      setBusy(false)
    }
  }

  return (
    <section className="narrow">
      <h1>Log in</h1>
      <Alert type="error" messages={errors} />
      <form className="form" onSubmit={onSubmit}>
        <label>
          Email
          <input type="email" required value={form.email}
                 onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label>
          Password
          <input type="password" required value={form.password}
                 onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="muted">New resident? <Link to="/register">Create an account</Link>.</p>
    </section>
  )
}
