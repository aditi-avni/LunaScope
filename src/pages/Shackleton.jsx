
import { Link } from 'react-router-dom'

function Shackleton() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="logo">LUNASCOPE</Link>

        <div className="nav-links">
          <Link to="/">Explore</Link>
          <Link to="/#study-areas">Study Areas</Link>
          <Link to="/#about">About</Link>
        </div>
      </nav>

      <main>
        <section className="location-details">
          <div className="detail-content">
            <p className="label">FEATURED LOCATION</p>
            <h2>Shackleton Crater</h2>

            <img
              src="https://science.nasa.gov/wp-content/uploads/2024/01/faces-of-shackleton.jpg"
              alt="Shackleton Crater near the Moon's south pole"
              style={{
                width: '100%',
                maxWidth: '800px',
                borderRadius: '8px',
                margin: '24px 0',
              }}
            />

            <p>
              Shackleton Crater lies near the Moon's south pole.
              Parts of its interior receive very little direct
              sunlight, making the region important for studying
              the lunar environment and the possibility of water ice.
            </p>

            <p>
              Scientists study the lunar south pole to understand
              its terrain, lighting conditions, and potential resources.
              These observations can help inform future robotic and
              crewed exploration missions.
            </p>

            <Link to="/" className="back-link">
              ← Back to Explore
            </Link>
          </div>
        </section>
      </main>

      <footer>
        <p>LUNASCOPE · Lunar Terrain Explorer</p>
      </footer>
    </div>
  )
}

export default Shackleton
