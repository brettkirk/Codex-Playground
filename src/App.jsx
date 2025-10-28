import { useEffect, useState } from 'react'
import './App.css'

const tickerMessages = [
  'KPNK 94.9 Is Live — Catch the Final Broadcast Before We Vanish Again',
  'Signal Interference Detected on 94.9 MHz — Tuning Stability Not Guaranteed',
  'Broadcast Relay Re-Activated: Archive Pull Complete',
  'DJ GutterRat Back in the Booth for the Midnight Set',
  'KPNK Transmitter at 27% — Expect Some Glorious Static',
  "Tonight's Rotation: Pop/Punk B-Sides, Local Demos, and a Few Bangers from the Bunker",
  'Local Legends Night: Featuring Demo Tapes from the 206',
  'Setlist Updated: Now Featuring 3 Songs Pulled from the Signal Void',
  'Mixtape Monday Postponed Due to Feedback Loop',
  'Now Playing: “No Signal” by Glasskick — You Asked, We Obeyed',
  'No Ads. No Labels. No Rules. Just KPNK.',
  "We're Not Dead — We're Just Broadcast-Invisible",
  'This Week’s Challenge: Spot the Static That’s Not Ours',
  "Reminder: If You Hear Numbers, Don't Write Them Down",
  'Shoutout to the Listener Who Mailed Us a 9-Volt and a Crayon Drawing',
]

const shuffleArray = (array) => {
  const clone = [...array]
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[clone[i], clone[j]] = [clone[j], clone[i]]
  }
  return clone
}

const upcomingShows = [
  { day: 'Monday', show: 'Signal Boost Morning Show', time: '6:00 AM - 10:00 AM' },
  { day: 'Wednesday', show: 'Late Night Lost & Found', time: '11:00 PM - 2:00 AM' },
  { day: 'Friday', show: 'Pop/Punk Power Hour', time: '8:00 PM - 10:00 PM' },
  { day: 'Saturday', show: 'Back Alley Requests', time: '9:00 PM - 1:00 AM' },
]

const topRequests = [
  'The Static Hearts — "Neon Skyline"',
  'Turnpike Ghosts — "Detour Anthem"',
  'Cherry Riot — "Broken Speaker"',
  'Radio Fable — "Sleepless in South Lake"',
  'Parking Lot Poets — "Rainy City Reckless"',
]

const streetTeamEvents = [
  { date: 'May 12', event: 'KPNK Alley Sessions @ Belltown Warehouse' },
  { date: 'May 18', event: 'Pop/Punk Prom Night Live Remote' },
  { date: 'May 26', event: 'Lost Signals Listening Party' },
]

function App() {
  const [shuffledTickerMessages, setShuffledTickerMessages] = useState(() => shuffleArray(tickerMessages))

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledTickerMessages(shuffleArray(tickerMessages))
    }, 45000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="page">
      <header className="header">
        <div className="logo-block">
          <img src="/KPNK.svg" alt="KPNK Radio" className="logo" />
          <span className="frequency">94.9 FM</span>
        </div>
        <div className="header-content">
          <h1 className="station-name">KPNK</h1>
          <p className="tagline">Seattle's home for Pop/Punk, late nights, and lost signals.</p>
          <nav className="main-nav">
            <a href="#shows">Shows</a>
            <a href="#djs">DJs</a>
            <a href="#events">Street Team</a>
            <a href="#newsletter">Join the Club</a>
            <a href="#archive">Signal Archive</a>
          </nav>
        </div>
        <div className="now-playing">
          <h2>Now Playing</h2>
          <p className="track">"Static in the Rain" — The Alleyway Echoes</p>
          <button className="listen-button">Listen Live</button>
        </div>
      </header>

      <div className="ticker">
        <div className="ticker-label">Latest Buzz</div>
        <marquee behavior="scroll" direction="left" scrollamount="6">
          {shuffledTickerMessages.map((message, index) => (
            <span className="ticker-entry" key={message}>
              {message}
              {index !== shuffledTickerMessages.length - 1 && (
                <span aria-hidden="true" className="ticker-separator">
                  //
                </span>
              )}
            </span>
          ))}
        </marquee>
      </div>

      <main>
        <section className="hero" id="shows">
          <div className="hero-copy">
            <h2>Broadcasting from the heart of the rainy city.</h2>
            <p>
              Tune into KPNK for razor-sharp pop/punk riffs, neon-lit late nights, and the stories from Seattle's underground that you won't hear anywhere else. From basement debuts to legendary deep cuts, we're spinning it loud.
            </p>
            <ul className="callouts">
              <li><span>⚡</span> Live shows nightly after dark</li>
              <li><span>📻</span> Pirate signal simulcast online &amp; FM</li>
              <li><span>🎤</span> Exclusive interviews every weekend</li>
            </ul>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="poster placeholder">Flyer Wall Placeholder</div>
            <div className="cassette placeholder">Mix Tape Mockup</div>
          </div>
        </section>

        <section className="schedule" aria-labelledby="schedule-title">
          <div className="panel-header">
            <h2 id="schedule-title">This Week on KPNK</h2>
            <span className="panel-subtitle">Fresh shows, classic chaos.</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Show</th>
                <th>Air Time</th>
              </tr>
            </thead>
            <tbody>
              {upcomingShows.map((show) => (
                <tr key={show.show}>
                  <td>{show.day}</td>
                  <td>{show.show}</td>
                  <td>{show.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="highlights" id="djs">
          <div className="dj-spotlight">
            <div className="panel-header">
              <h3>DJ of the Week</h3>
              <span className="panel-subtitle">Meet the voice behind the static.</span>
            </div>
            <div className="dj-card">
              <div className="dj-photo placeholder">Polaroid Placeholder</div>
              <div>
                <h4>Razor Roxie</h4>
                <p>
                  Roxie spins the midnight shift, diving into deep cuts and listener confessions live on-air. Expect crunchy guitars, rain-drenched poetry, and the occasional lost voicemail.
                </p>
                <button className="button-link">Send Roxie a shout-out</button>
              </div>
            </div>
          </div>

          <div className="top-requests">
            <div className="panel-header">
              <h3>Top Requests</h3>
              <span className="panel-subtitle">Voted by our late-night diehards.</span>
            </div>
            <ol>
              {topRequests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="street-team" id="events">
          <div className="panel-header">
            <h2>Street Team Sightings</h2>
            <span className="panel-subtitle">Catch us making noise around town.</span>
          </div>
          <div className="events-grid">
            {streetTeamEvents.map((event) => (
              <article key={event.event} className="event-card">
                <h4>{event.date}</h4>
                <p>{event.event}</p>
                <button className="button-link">RSVP + Win Swag</button>
              </article>
            ))}
          </div>
        </section>

        <section className="newsletter" id="newsletter">
          <div className="panel-header">
            <h2>Join the KPNK Signal Club</h2>
            <span className="panel-subtitle">Set your inbox to stun.</span>
          </div>
          <form className="newsletter-form">
            <label htmlFor="email">Email</label>
            <div className="input-row">
              <input id="email" type="email" placeholder="you@neonskyline.net" />
              <button type="submit">Sign Up</button>
            </div>
            <p className="disclaimer">
              We send late-night show alerts, street team meetups, and secret sessions. Unsubscribe anytime, but why would you?
            </p>
          </form>
        </section>
      </main>

      <footer className="footer" id="archive">
        <div>
          <h4>KPNK Signal Archive</h4>
          <p>Relive the chaos with reruns of your favorite shows every Sunday at 3 AM.</p>
        </div>
        <div className="footer-links">
          <a href="#">FCC? Never heard of her.</a>
          <a href="#">Advertise</a>
          <a href="#">Send us your demo</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} KPNK Radio. Built for night owls and lost signals.</p>
      </footer>
    </div>
  )
}

export default App
