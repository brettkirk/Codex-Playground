import { useState } from 'react'
import './App.css'
import './Admin.css'

const PASSCODE = 'SignalLost'

function Admin() {
  const [passcode, setPasscode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (passcode.trim() === PASSCODE) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Access denied. Please verify the passcode.')
    }
  }

  const handleChange = (event) => {
    setPasscode(event.target.value)
    if (error) {
      setError('')
    }
  }

  return (
    <div className="page admin-page">
      <header className="admin-header">
        <div className="logo-block">
          <img src="/KPNK.svg" alt="KPNK Radio" className="logo" />
          <span className="frequency">94.9 FM</span>
        </div>
        <div className="admin-copy">
          <h1>Signal Control</h1>
          <p>Restricted console for broadcast engineers only.</p>
        </div>
      </header>

      <main className="admin-main">
        {!isAuthenticated ? (
          <form className="admin-form" onSubmit={handleSubmit}>
            <label htmlFor="admin-passcode">Enter passcode to continue</label>
            <input
              id="admin-passcode"
              name="admin-passcode"
              type="password"
              value={passcode}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Passcode"
              required
            />
            {error && <p className="admin-error" role="alert">{error}</p>}
            <button type="submit" className="listen-button">
              Unlock Console
            </button>
          </form>
        ) : (
          <section className="admin-panel">
            <h2>Transmission Status</h2>
            <p>All systems calibrated. Awaiting engineer directives.</p>
            <ul>
              <li>Broadcast relays: Synced</li>
              <li>Archive uplink: Stable</li>
              <li>Next maintenance window: 03:00 PST</li>
            </ul>
            <div className="admin-actions">
              <a href="/" className="listen-button">
                Return to Broadcast
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default Admin
