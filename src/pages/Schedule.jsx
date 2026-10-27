import { useEffect, useState } from 'react'
import { api } from '../api.js'
import Alert from '../components/Alert.jsx'
import ScheduleTable from '../components/ScheduleTable.jsx'

export default function Schedule() {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState([])

  useEffect(() => {
    api('/schedules').then((d) => setRows(d.schedules)).catch((e) => setError(e.messages))
  }, [])

  if (error.length) return <Alert type="error" messages={error} />
  if (!rows) return <p className="muted">Loading…</p>

  return (
    <>
      <h1>Collection schedule</h1>
      {rows.length === 0
        ? <p className="muted">No upcoming collections are scheduled.</p>
        : <ScheduleTable rows={rows} showAddress />}
    </>
  )
}
