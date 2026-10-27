import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'
import Alert from '../components/Alert.jsx'

export default function Rewards() {
  const [data, setData] = useState(null)
  const [error, setError] = useState([])
  const [notice, setNotice] = useState([])
  const [busyId, setBusyId] = useState(null)

  const load = useCallback(() => {
    api('/rewards').then(setData).catch((e) => setError(e.messages))
  }, [])

  useEffect(() => { load() }, [load])

  const redeem = async (rewardId) => {
    setBusyId(rewardId)
    setNotice([])
    setError([])
    try {
      const res = await api(`/rewards/${rewardId}/redeem`, { method: 'POST' })
      setNotice([res.message])
      load()
    } catch (e) {
      setError(e.messages)
    } finally {
      setBusyId(null)
    }
  }

  if (!data && error.length) return <Alert type="error" messages={error} />
  if (!data) return <p className="muted">Loading…</p>

  return (
    <>
      <h1>Rewards</h1>
      <Alert type="success" messages={notice} />
      <Alert type="error" messages={error} />

      <div className="cards">
        <article className="card stat">
          <span className="muted">Your points</span>
          <strong>{data.points_balance.toLocaleString()} pts</strong>
        </article>
      </div>

      <h2>Available rewards</h2>
      {data.rewards.length === 0 ? (
        <p className="muted">No rewards are available right now.</p>
      ) : (
        <div className="cards">
          {data.rewards.map((rw) => {
            const outOfStock = Number(rw.stock) < 1
            const canAfford = data.points_balance >= Number(rw.points_cost)
            return (
              <article className="card" key={rw.reward_id}>
                <h3>{rw.name}</h3>
                <p className="muted">{Number(rw.points_cost).toLocaleString()} pts · {rw.stock} left</p>
                {outOfStock ? (
                  <p className="muted">Out of stock</p>
                ) : (
                  <>
                    <button type="button" className="btn btn-small"
                            disabled={!canAfford || busyId === rw.reward_id}
                            onClick={() => redeem(rw.reward_id)}>
                      {busyId === rw.reward_id ? 'Sending…' : 'Request reward'}
                    </button>
                    {!canAfford && <p className="muted small">Not enough points yet.</p>}
                  </>
                )}
              </article>
            )
          })}
        </div>
      )}

      <h2>My requests</h2>
      {data.redemptions.length === 0 ? (
        <p className="muted">You have not requested any rewards yet.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Requested</th><th>Reward</th><th>Points</th><th>Status</th></tr>
            </thead>
            <tbody>
              {data.redemptions.map((r) => (
                <tr key={r.redemption_id}>
                  <td>{r.requested_at}</td>
                  <td>{r.reward_name}</td>
                  <td>{r.points_used}</td>
                  <td><span className={`badge badge-${r.status}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
