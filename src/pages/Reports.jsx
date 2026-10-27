import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import Alert from '../components/Alert.jsx'

// Turns "Open" / "In Progress" into the CSS badge class "badge-in-progress".
const badgeClass = (status) => `badge badge-${status.toLowerCase().replace(/ /g, '-')}`

export default function Reports() {
  const [reports, setReports] = useState(null)
  const [error, setError] = useState([])

  useEffect(() => {
    api('/reports').then((d) => setReports(d.reports)).catch((e) => setError(e.messages))
  }, [])

  if (error.length) return <Alert type="error" messages={error} />
  if (!reports) return <p className="muted">Loading…</p>

  return (
    <>
      <div className="page-head">
        <h1>My reports</h1>
        <Link className="btn" to="/resident/reports/new">+ Report dumping</Link>
      </div>

      {reports.length === 0 ? (
        <p className="muted">You have not filed any reports yet.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Filed</th><th>Location</th><th>Description</th><th>Status</th><th>Photo</th></tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.report_id}>
                  <td>{new Date(r.created_at.replace(' ', 'T')).toLocaleString()}</td>
                  <td>{r.location_text}</td>
                  <td>{r.description.length > 90 ? r.description.slice(0, 90) + '...' : r.description}</td>
                  <td><span className={badgeClass(r.status)}>{r.status}</span></td>
                  <td>
                    {r.photo_url
                      ? <a className="photo-link" href={`/${r.photo_url}`} target="_blank" rel="noopener">View</a>
                      : <span className="muted">None</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
