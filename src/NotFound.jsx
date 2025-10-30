import './App.css'
import './NotFound.css'

function NotFound() {
  return (
    <div className="page not-found-page">
      <header className="not-found-header">
        <div className="logo-block ghost-logo">
          <img src="/KPNK.svg" alt="KPNK Radio" className="logo" />
          <span className="frequency">94.9 FM</span>
        </div>
        <div className="not-found-copy">
          <p className="distress-call">Signal Lost</p>
          <h1 className="not-found-title">404: Dead Air</h1>
          <p>
            The transmission you dialed up isn&apos;t live yet. We&apos;re still soldering wires, splicing tapes, and
            routing cables through the static.
          </p>
          <p>
            Head back to the broadcast or follow one of the patched-in links below while we finish wiring this
            frequency into the console.
          </p>
        </div>
      </header>

      <main className="not-found-main">
        <section className="not-found-panel">
          <h2>Try one of these channels</h2>
          <div className="main-nav reroute-links">
            <a href="/">Return to the Broadcast</a>
            <a href="/#shows">Show Schedule</a>
            <a href="/#djs">Meet the DJs</a>
            <a href="/#newsletter">Join the Signal Club</a>
          </div>
        </section>

        <section className="not-found-panel">
          <h2>What we&apos;re working on</h2>
          <ul className="diagnostic-list">
            <li>Securing pirate frequencies for new advertisers.</li>
            <li>Setting up an on-air hotline that won&apos;t melt.</li>
            <li>Building a demo dropbox that actually rewinds tapes.</li>
          </ul>
        </section>
      </main>

      <footer className="footer not-found-footer">
        <div>
          <h4>Need to report the dead air?</h4>
          <p>
            Ping the crew at <a href="mailto:fixit@kpnk.fm">fixit@kpnk.fm</a> and we&apos;ll reroute the signal ASAP.
          </p>
        </div>
        <div className="footer-links">
          <a href="/">Back to KPNK Home</a>
          <a href="/#events">Street Team Sightings</a>
          <a href="/#archive">Signal Archive</a>
        </div>
        <p className="copyright">© 2003 KPNK 94.9FM K-PUNK. We&apos;re tracking this anomaly.</p>
      </footer>
    </div>
  )
}

export default NotFound
