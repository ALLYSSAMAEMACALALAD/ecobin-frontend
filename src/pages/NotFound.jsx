import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="narrow">
      <h1>Page not found</h1>
      <p className="muted">That page does not exist.</p>
      <Link className="btn btn-outline" to="/">Back to home</Link>
    </section>
  )
}
