import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { api } from '../api.js'
import Alert from '../components/Alert.jsx'

export default function EcoId() {
  const [data, setData] = useState(null)
  const [error, setError] = useState([])

  useEffect(() => {
    api('/eco-id').then(setData).catch((e) => setError(e.messages))
  }, [])

  if (error.length) return <Alert type="error" messages={error} />
  if (!data) return <p className="muted">Loading…</p>

  return (
    <>
      <h1>My Eco-ID</h1>
      <section className="eco-card">
        <div className="eco-qr">
          <div className="qr-box" role="img" aria-label={`QR code for ${data.eco_id}`}>
            <QRCodeSVG value={data.eco_id} size={212} level="M" />
          </div>
          <p className="muted small">Show this at the drop-off hub to get points.</p>
        </div>
        <div className="eco-info">
          <p className="muted">Resident</p>
          <p className="eco-name">{data.full_name}</p>
          <p className="muted">Eco-ID</p>
          <p className="eco-id">{data.eco_id}</p>
          <p className="muted">Points balance</p>
          <p><strong>{data.points_balance.toLocaleString()} pts</strong></p>
        </div>
      </section>
    </>
  )
}
