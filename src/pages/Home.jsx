import { Link } from 'react-router-dom'
import Mascot from '../components/Mascot.jsx'

export default function Home() {
  return (
    <>
      <section className="hero">
        <Mascot className="mascot mascot-hero" />
        <div className="hero-text">
          <p className="eyebrow">✦ Smart waste collection ✦</p>
          <h1 className="hero-title">Eco-Bin</h1>
          <p className="hero-sub">
            An integrated smart waste collection and municipal recycling reward system.
            Recycle, earn points, and keep the neighborhood clean.
          </p>
          <div className="actions">
            <Link className="btn" to="/register">Create a resident account</Link>
            <Link className="btn btn-outline" to="/login">Log in</Link>
          </div>
        </div>
      </section>

      <section className="cards">
        <article className="card">
          <div className="card-icon">🗓️</div>
          <h3>Collection schedules</h3>
          <p>See upcoming pickups for your area.</p>
        </article>
        <article className="card">
          <div className="card-icon">🌱</div>
          <h3>Earn points</h3>
          <p>Verified recyclable drop-offs add points you can redeem for rewards.</p>
        </article>
        <article className="card">
          <div className="card-icon">📸</div>
          <h3>Report dumping</h3>
          <p>Send a report with a photo so the municipal office can act fast.</p>
        </article>
      </section>
    </>
  )
}
