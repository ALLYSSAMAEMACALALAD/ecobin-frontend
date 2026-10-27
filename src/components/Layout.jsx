import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'
import Mascot from './Mascot.jsx'

const residentLinks = [
  ['Dashboard', '/resident/dashboard'],
  ['Schedule', '/resident/schedule'],
  ['My Eco-ID', '/resident/eco-id'],
  ['Rewards', '/resident/rewards'],
  ['Report Dumping', '/resident/reports/new'],
  ['My Reports', '/resident/reports'],
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <div className="sky" aria-hidden="true" />
      <header className="topbar">
        <Link className="brand" to="/">
          <Mascot className="mascot mascot-nav" />
          <span className="brand-text">Eco-Bin</span>
        </Link>
        <nav className="menu">
          {user ? (
            <>
              {residentLinks.map(([label, to]) => (
                <NavLink key={to} to={to}>{label}</NavLink>
              ))}
              <button type="button" className="logout" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/login">Log in</NavLink>
              <NavLink className="btn-small" to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <span className="footer-dot" />Eco-Bin
      </footer>
    </>
  )
}
