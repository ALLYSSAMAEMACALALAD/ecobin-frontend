import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Home from './pages/Home.jsx'
import Faq from './pages/Faq.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Schedule from './pages/Schedule.jsx'
import EcoId from './pages/EcoId.jsx'
import Rewards from './pages/Rewards.jsx'
import Reports from './pages/Reports.jsx'
import NewReport from './pages/NewReport.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/resident/dashboard" element={<Dashboard />} />
          <Route path="/resident/schedule" element={<Schedule />} />
          <Route path="/resident/eco-id" element={<EcoId />} />
          <Route path="/resident/rewards" element={<Rewards />} />
          <Route path="/resident/reports" element={<Reports />} />
          <Route path="/resident/reports/new" element={<NewReport />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
