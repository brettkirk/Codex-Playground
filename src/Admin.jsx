import { useEffect, useRef, useState } from 'react'
import { getAvailableThemes, getCurrentTheme, setTheme } from './theme.js'
import './App.css'
import './Admin.css'

const PASSCODE = 'SignalLost'
const COMMAND_ALIASES = {
  'set-theme': 'settheme',
}

const COMMAND_HANDLERS = {
  help: () => [
    'Available commands:',
    '  • help - Show available commands',
    '  • status - Display live subsystem telemetry',
    '  • diagnose - Run placeholder diagnostics routine',
    '  • relay-check - Ping relay satellites for response time',
    '  • reboot - Queue simulated system reboot',
    '  • clear - Wipe the console output',
    `  • setTheme <name> - Switch the site theme (options: ${getAvailableThemes().join(', ')})`,
  ],
  status: () => 'Status: Broadcast relays stable. No anomalies detected.',
  diagnose: () =>
    'Diagnostics suite engaged. Placeholder results: All virtual checks passed.',
  'relay-check': () =>
    'Relay ping acknowledged. Round-trip latency steady at 42ms.',
  reboot: () =>
    'Reboot sequence staged. Awaiting confirmation from on-site engineer.',
  clear: () => '__CLEAR__',
  settheme: (args = []) => {
    const [requestedTheme] = args
    const availableThemes = getAvailableThemes()

    if (!requestedTheme) {
      return [
        'Usage: setTheme <name>',
        `Available themes: ${availableThemes.join(', ')}`,
        `Current theme: ${getCurrentTheme()}`,
      ]
    }

    const normalizedTheme = requestedTheme.toLowerCase()
    if (!availableThemes.includes(normalizedTheme)) {
      return [
        `Unknown theme: "${requestedTheme}".`,
        `Available themes: ${availableThemes.join(', ')}`,
      ]
    }

    const appliedTheme = setTheme(normalizedTheme)
    return `Theme applied: ${appliedTheme}`
  },
}

function Admin() {
  const [passcode, setPasscode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [consoleLines, setConsoleLines] = useState([])
  const [consoleInput, setConsoleInput] = useState('')
  const consoleOutputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (passcode.trim() === PASSCODE) {
      setIsAuthenticated(true)
      setError('')
      setConsoleLines([
        'Access granted. Channel secured.',
        'Initializing engineer console...',
        'Type "help" to review available commands.',
      ])
      setConsoleInput('')
      setPasscode('')
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

  useEffect(() => {
    if (consoleOutputRef.current) {
      consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight
    }
  }, [consoleLines])

  const handleConsoleSubmit = (event) => {
    event.preventDefault()
    const trimmedInput = consoleInput.trim()
    if (!trimmedInput) return

    const [rawCommand, ...rawArgs] = trimmedInput.split(/\s+/)
    const commandKey = rawCommand.toLowerCase()
    const handlerKey = COMMAND_HANDLERS[commandKey]
      ? commandKey
      : COMMAND_ALIASES[commandKey]
    let updatedLines = [...consoleLines, `> ${trimmedInput}`]

    const handler = handlerKey ? COMMAND_HANDLERS[handlerKey] : undefined

    if (handler) {
      const result = handler(rawArgs)
      if (result === '__CLEAR__') {
        updatedLines = []
      } else if (Array.isArray(result)) {
        updatedLines = [...updatedLines, ...result]
      } else {
        updatedLines = [...updatedLines, result]
      }
    } else {
      updatedLines = [
        ...updatedLines,
        `Unrecognized command: "${trimmedInput}". Type "help" to list available options.`,
      ]
    }

    setConsoleLines(updatedLines)
    setConsoleInput('')
  }

  return (
    <div className="page admin-page">
      <header className="admin-header">
        <div className="logo-block">
          <a href="/" className="logo-link" aria-label="Back to KPNK home">
            <img src="/KPNK.svg" alt="KPNK Radio" className="logo" />
          </a>
          <span className="frequency">94.9 FM</span>
        </div>
        <div className="admin-copy">
          <h1>Signal Control</h1>
          <p>Restricted console for broadcast engineers only.</p>
        </div>
      </header>

      <main className="admin-main">
        <div className={`admin-access ${isAuthenticated ? 'expanded' : ''}`}>
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
            <section className="admin-console" aria-live="polite">
              <header className="console-header">
                <h2>Signal Command Console</h2>
                <p>Interactive terminal emulation ready for engineer input.</p>
              </header>
              <div className="console-output" ref={consoleOutputRef}>
                {consoleLines.map((line, index) => (
                  <p key={`${line}-${index}`} className="console-line">
                    {line}
                  </p>
                ))}
              </div>
              <form className="console-form" onSubmit={handleConsoleSubmit}>
                <label htmlFor="console-command" className="sr-only">
                  Console command input
                </label>
                <span aria-hidden="true" className="console-prompt">
                  &gt;
                </span>
                <input
                  id="console-command"
                  name="console-command"
                  type="text"
                  value={consoleInput}
                  onChange={(event) => setConsoleInput(event.target.value)}
                  autoComplete="off"
                  placeholder="Type a command"
                />
                <button type="submit" className="console-submit" aria-label="Submit command">
                  Send
                </button>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default Admin
