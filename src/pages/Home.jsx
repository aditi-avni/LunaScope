
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {
  const [locationarray, setlocationarray] = useState([])

  useEffect(()=>{
    async function getLocations() {
      const response = await fetch('http://localhost:3000/api/locations')
      const data = await response.json()
      setlocationarray(data)
      console.log(data[0])
    }
    getLocations()
    // getLocations() calling for execution
  },[])

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="logo">
          LUNASCOPE
        </Link>

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
            {/* Shackleton Crater */}
            
          {locationarray.map((location) => (
            <div className="location-card" key={location._id}>
              <img
                src="https://science.nasa.gov/wp-content/uploads/2024/01/faces-of-shackleton.jpg"
                alt={location.name}
              />

              <div className="location-info">
                <p className="location-label">{location.type}</p>
                <h3> {location.name}</h3>

                <p className="description">
                  {location.description}
                </p>

                <Link to="/locations/shackleton">
                  Explore Location →
                </Link>
              </div>
            </div>
          ))}


            {/* Water Ice */}
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

                <Link to="/locations/water-ice">
                  Explore Topic →
                </Link>
              </div>
            </div>
          </div>
        </section>

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

export default Home
