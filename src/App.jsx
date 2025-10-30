import { useEffect, useMemo, useRef, useState } from 'react'
import heroFlyerImg from './assets/poster wall.png'
import heroCassetteImg from './assets/KPNK Mixtape.png'
import djGutterRatImg from './assets/DJ Gutterrat.png'
import staticTinaImg from './assets/Static Tina.png'
import neonValImg from './assets/Neon Val.png'
import trashleyImg from './assets/Trashley.png'
import djBonesawImg from './assets/DJ Bonesaw.png'
import echoLyricImg from './assets/Echo Lyric.png'
import './App.css'

const onAirPersonalities = [
  {
    Name: 'DJ GutterRat',
    Bio: `Weeknights (10PM–1AM) on The Last Chord, DJ GutterRat keeps Seattle up late with a mix of raw guitars, candid stories, and that signature sign-off: “If it’s broken, play it louder.” It’s the companion show for night owls, tour vans, and anyone who swears their best ideas spark after midnight.`,
    Image: djGutterRatImg,
    Caption: 'DJ GutterRat rides the faders after midnight, grinning through the static.',
  },
  {
    Name: 'Static Tina',
    Bio: `Static Tina owns the graveyard shift (1AM–4AM) with Feedback Frenzy—three hours of caffeinated commentary, live turntable tricks, and deep-cut noise rock. She’ll happily blow a speaker chasing the perfect moment and still sign off with, “Crank it 'til it breaks.”`,
    Image: staticTinaImg,
    Caption: 'Static Tina braces the booth for feedback and 3AM callers.',
  },
  {
    Name: 'Neon Val',
    Bio: `Pop Damage with Neon Val lights up Thursdays (7PM–9PM). Expect upbeat heartbreak anthems, gleaming harmonies, and interviews with the artists shaping the scene. She calls it “bubblegum with a switchblade,” and her playlists always back it up.`,
    Image: neonValImg,
    Caption: 'Neon Val cues glossy hooks with a color-coded setlist at the ready.',
  },
  {
    Name: 'Trashley',
    Bio: `Saturdays (2PM–6PM) belong to Trashley and Dumpster Dive Drive. She’s the resident punk historian with a sharp wit, spinning new releases, demo discoveries, and stories from the clubs before anyone else is talking about them.`,
    Image: trashleyImg,
    Caption: 'Trashley spots tomorrow’s punk heroes before the doors even open.',
  },
  {
    Name: 'DJ Bonesaw',
    Bio: `Fridays at Midnight belong to DJ Bonesaw and The Mosh Clock. It’s a nonstop wall of hardcore, crust, and anything loud enough to rattle the booth. Expect tempo whiplash, shouted intros, and the occasional rant about venue policies. “No gods. No genre tags.” That’s the rule.`,
    Image: djBonesawImg,
    Caption: 'DJ Bonesaw slams through the midnight hour with fists, riffs, and feedback.'
  },
  {
    Name: 'Echo Lyric',
    Bio: `Echo Lyric slips through the static between 3:03–3:11AM with unscheduled cameos of ambient pop, unreleased collabs, and ghostly vocal loops. No official show listing—just a cult following that sets alarms to catch the next transmission.`,
    Image: echoLyricImg,
    Caption: 'Echo Lyric materializes in the glow, sculpting loops from thin air.',
  },
]

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

const weekOfMonth = (date) =>
  Math.floor((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7)

const upcomingShows = [
  { day: 'Monday', show: 'Signal Boost Morning Show', time: '6:00 AM - 10:00 AM' },
  { day: 'Wednesday', show: 'Late Night Lost & Found', time: '11:00 PM - 2:00 AM' },
  { day: 'Friday', show: 'Radio Violence: Live from the Bunker', time: '8:00 PM - 11:00 PM' },
  { day: 'Saturday', show: 'Trash Youth Back Alley Broadcast', time: '9:00 PM - 1:00 AM' },
]

const topRequests = [
  'Glasskick — "No Signal"',
  'Radio Violence — "Edge of Collapse"',
  'Night Terror — "Basement Lights"',
  'Trash Youth — "Static Hearts Club"',
  'Dearly Departed — "Echoes on 3rd Avenue"',
]

const streetTeamEvents = [
  { date: 'May 12', event: 'Radio Violence Rooftop Simulcast @ Capitol Hill' },
  { date: 'May 18', event: 'Trash Youth Tape Swap behind Neptune Records' },
  { date: 'May 26', event: 'Dearly Departed unplugged vigil in Gasworks Park' },
]

function App() {
  const [shuffledTickerMessages, setShuffledTickerMessages] = useState(() => shuffleArray(tickerMessages))
  const tickerTrackRef = useRef(null)
  const featuredDj = useMemo(() => {
    const index = weekOfMonth(new Date())
    return onAirPersonalities[index] ?? onAirPersonalities[0]
  }, [])

  useEffect(() => {
    const tickerTrack = tickerTrackRef.current
    if (!tickerTrack) return undefined

    const handleIteration = () => {
      setShuffledTickerMessages(shuffleArray(tickerMessages))
    }

    tickerTrack.addEventListener('animationiteration', handleIteration)

    return () => {
      tickerTrack.removeEventListener('animationiteration', handleIteration)
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
          <a className="listen-button" href="/404">
            Listen Live
          </a>
        </div>
      </header>

      <div className="ticker">
        <div className="ticker-label">Latest Buzz</div>
        <div className="ticker-window">
          <div className="ticker-track" ref={tickerTrackRef}>
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
          </div>
        </div>
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
          <div className="hero-art">
            <figure className="hero-image poster">
              <img
                src={heroFlyerImg}
                alt="Photo collage of K-PUNK flyers for Glasskick, Trash Youth, and Night Terror wheat-pasted on brick."
                loading="lazy"
              />
              <figcaption>Fresh K-PUNK street flyer spotted outside the Underground Arcade.</figcaption>
            </figure>
            <figure className="hero-image cassette">
              <img
                src={heroCassetteImg}
                alt="Photo of a mixtape cassette labeled KPNK Mixtape."
                loading="lazy"
              />
              <figcaption>Midnight mix cassette getting dubbed for the next back alley drop.</figcaption>
            </figure>
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
              <figure className="dj-photo">
                <img src={featuredDj.Image} alt={`Photo of DJ ${featuredDj.Name}.`} loading="lazy" />
                <figcaption>{featuredDj.Caption}</figcaption>
              </figure>
              <div>
                <h4>{featuredDj.Name}</h4>
                <p>{featuredDj.Bio}</p>
                <a className="button-link" href="/404">
                  Send {featuredDj.Name} a shout-out
                </a>
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
                <a className="button-link" href="/404">
                  RSVP + Win Swag
                </a>
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
          <a href="/404">FCC? Never heard of her.</a>
          <a href="/404">Advertise</a>
          <a href="/404">Send us your demo</a>
        </div>
        <p className="copyright">© 2003 KPNK 94.9FM K-PUNK. Built for night owls and lost signals.</p>
      </footer>
    </div>
  )
}

export default App
