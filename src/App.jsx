
import { useState } from 'react'
import './App.css'

function App() {
  const [selectedlocation, setselectedlocation] = useState(null)

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#explore" className="logo">LUNASCOPE</a>

        <div className="nav-links">
          <a href="#explore">Explore</a>
          <a href="#study-areas">Study Areas</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <main>
        {/* Hero section */}
        <section className="intro" id="explore">
          <p className="label">LUNAR TERRAIN EXPLORER</p>

          <h1>
            Discover the <span>Moon</span>
          </h1>

          <p className="intro-text">
            Explore lunar landscapes, understand surface features,
            and discover regions shaping the future of lunar exploration.
          </p>

          <a href="#study-areas" className="explore-btn">
            Explore Lunar Terrain →
          </a>
        </section>

        {/* Featured study areas */}
        <section className="study-areas" id="study-areas">
          <p className="label">THE LUNAR SOUTH POLE</p>
          <h2>Featured Study Areas</h2>

          <div className="location-grid">
            {/* Shackleton Crater card */}
            <div className="location-card">
              <img
                src="https://science.nasa.gov/wp-content/uploads/2024/01/faces-of-shackleton.jpg"
                alt="Shackleton Crater near the Moon's south pole"
              />

              <div className="location-info">
                <p className="location-label">LUNAR CRATER</p>
                <h3>Shackleton Crater</h3>

                <p className="description">
                  Explore a crater near the Moon's south pole where
                  scientists investigate permanently shadowed areas
                  and the possibility of water ice.
                </p>

                <a
                  href="#shackleton-details"
                  onClick={(event) => {
                    event.preventDefault()
                    setselectedlocation('crater')
                  }}
                >
                  Explore Location →
                </a>
              </div>
            </div>

            {/* Water Ice card */}
            <div className="location-card">
              <img
                src="https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/l/lunar_south_pole_lroc.png?crop=faces%2Cfocalpoint&fit=clip&h=1214&w=1214"
                alt="Illumination map of the Moon's south pole"
              />

              <div className="location-info">
                <p className="location-label">WATER ICE</p>
                <h3>Permanently Shadowed Regions (PSRs)</h3>

                <p className="description">
                  Discover how some areas near the lunar poles remain
                  in permanent darkness and why scientists study
                  them for possible water ice.
                </p>

                <a
                  href="#water-ice-details"
                  onClick={(event) => {
                    event.preventDefault()
                    setselectedlocation('water_ice')
                  }}
                >
                  Explore Topic →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Shackleton Crater details */}
        {selectedlocation === 'crater' && (
          <section
            className="location-details"
            id="shackleton-details"
          >
            <div className="detail-content">
              <p className="label">FEATURED LOCATION</p>
              <h2>Shackleton Crater</h2>

              <p>
                Shackleton Crater lies near the Moon's south pole.
                Parts of its interior receive very little direct
                sunlight, making the region important for studying
                the lunar environment and the possibility of water ice.
              </p>

              <a
                href="#study-areas"
                className="back-link"
                onClick={() => setselectedlocation(null)}
              >
                ← Back to Study Areas
              </a>
            </div>
          </section>
        )}

        {/* Water Ice details */}
        {selectedlocation === 'water_ice' && (
          <section
            className="location-details"
            id="water-ice-details"
          >
            <div className="detail-content">
              <p className="label">LUNAR SCIENCE</p>
              <h2>Water Ice on the Moon</h2>

              <p>
                Permanently shadowed regions receive little or no
                direct sunlight. Their extremely cold conditions may
                allow water ice to persist for long periods. Studying
                these regions could help scientists understand lunar
                resources and plan future missions.
              </p>

              <a
                href="#study-areas"
                className="back-link"
                onClick={() => setselectedlocation(null)}
              >
                ← Back to Study Areas
              </a>
            </div>
          </section>
        )}

        {/* About section */}
        <section className="about" id="about">
          <h2>Understanding our nearest celestial neighbour</h2>

          <p>
            LunaScope brings lunar terrain information and scientific
            context together in one place for curious explorers.
          </p>
        </section>
      </main>

      <footer>
        <p>LUNASCOPE · Lunar Terrain Explorer</p>
      </footer>
    </div>
  )
}

export default App
