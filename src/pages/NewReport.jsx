import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import Alert from '../components/Alert.jsx'

export default function NewReport() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ description: '', location: '', latitude: '', longitude: '' })
  const [photo, setPhoto] = useState(null)
  const [errors, setErrors] = useState([])
  const [gps, setGps] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const getGps = () => {
    if (!navigator.geolocation) {
      setGps('Location is not supported on this device.')
      return
    }
    setGps('Getting location...')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({
          ...f,
          latitude: pos.coords.latitude.toFixed(7),
          longitude: pos.coords.longitude.toFixed(7),
        }))
        setGps('Location saved.')
      },
      () => setGps('Could not get your location. You can still type the location above.')
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErrors([])
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    data.append('photo', photo)
    try {
      await api('/reports', { method: 'POST', formData: data })
      navigate('/resident/reports', { replace: true })
    } catch (err) {
      setErrors(err.messages)
      setBusy(false)
    }
  }

  return (
    <section className="narrow wide">
      <h1>Report illegal dumping</h1>
      <p className="muted">Describe what you saw, where it is, and add a clear photo. The municipal office will review your report.</p>
      <Alert type="error" messages={errors} />

      <form className="form" onSubmit={onSubmit}>
        <label>
          Description
          <textarea rows={4} maxLength={1000} required value={form.description} onChange={set('description')} />
        </label>
        <label>
          Location (street or landmark)
          <input type="text" maxLength={255} required value={form.location} onChange={set('location')} />
        </label>
        <div className="row">
          <button type="button" className="btn btn-outline" onClick={getGps}>Use my current location</button>
          <span className="muted small">{gps}</span>
        </div>
        <label>
          Photo (JPG, PNG, or WEBP, max 5 MB)
          <input type="file" required accept="image/jpeg,image/png,image/webp"
                 onChange={(e) => setPhoto(e.target.files[0] || null)} />
        </label>
        <div className="row">
          <button className="btn" type="submit" disabled={busy || !photo}>
            {busy ? 'Submitting…' : 'Submit report'}
          </button>
          <button type="button" className="link" onClick={() => navigate('/resident/reports')}>Cancel</button>
        </div>
      </form>
    </section>
  )
}
