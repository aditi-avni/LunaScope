
import { Link } from 'react-router-dom'

function WaterIce() {
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
            <p className="label">LUNAR SCIENCE</p>
            <h2>Water Ice on the Moon</h2>

            <img
              src="https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/l/lunar_south_pole_lroc.png?crop=faces%2Cfocalpoint&fit=clip&h=1214&w=1214"
              alt="Illumination map of the Moon's south pole"
              style={{
                width: '100%',
                maxWidth: '800px',
                borderRadius: '8px',
                margin: '24px 0',
              }}
            />

            <p>
              Permanently shadowed regions are areas near the lunar
              poles that receive little or no direct sunlight.
              Their extremely cold conditions may allow water ice
              to persist for long periods.
            </p>

            <p>
              Studying these regions could help scientists understand
              the Moon's history and potential resources. Water ice
              may also be useful for future exploration, although
              its availability and accessibility must be investigated.
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

export default WaterIce
