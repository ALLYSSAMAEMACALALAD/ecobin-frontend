import { useEffect, useState } from 'react'
import { api } from '../api.js'
import Alert from '../components/Alert.jsx'
import ScheduleTable from '../components/ScheduleTable.jsx'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState([])

  useEffect(() => {
    api('/dashboard').then(setData).catch((e) => setError(e.messages))
  }, [])

  if (error.length) return <Alert type="error" messages={error} />
  if (!data) return <p className="muted">Loading…</p>

  const { user, upcoming } = data
  return (
    <>
      <h1>Hi, {user.full_name}</h1>
      <div className="cards">
        <article className="card stat">
          <span className="muted">Points balance</span>
          <strong>{user.points_balance.toLocaleString()} pts</strong>
        </article>
      </div>

      <h2>Upcoming collections</h2>
      {upcoming.length === 0
        ? <p className="muted">No upcoming collections yet.</p>
        : <ScheduleTable rows={upcoming} />}
    </>
  )
}
