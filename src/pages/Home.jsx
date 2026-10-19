
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000/api/locations'

const FALLBACK_IMAGE =
  'https://images-assets.nasa.gov/image/PIA00405/PIA00405~orig.jpg'

const lunarImages = {
  'Shackleton Crater':
    'https://science.nasa.gov/wp-content/uploads/2024/01/faces-of-shackleton.jpg',
  'Tycho Crater':
    'https://svs.gsfc.nasa.gov/vis/a000000/a003800/a003874/tour.07500.jpg',
  'Mare Tranquillitatis':
    'https://images-assets.nasa.gov/image/PIA00405/PIA00405~orig.jpg',
  'Oceanus Procellarum':
    'https://images-assets.nasa.gov/image/PIA00405/PIA00405~orig.jpg',
  'Aristarchus Plateau':
    'https://images-assets.nasa.gov/image/PIA12942/PIA12942~orig.jpg'
}

function LunarImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE)

  useEffect(() => {
    setImageSrc(src || FALLBACK_IMAGE)
  }, [src])

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) {
          setImageSrc(FALLBACK_IMAGE)
        }
      }}
    />
  )
}

function Home() {
  const [locationarray, setlocationarray] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function getLocations() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Unable to fetch lunar locations'
        )
      }

      setlocationarray(data)
    } catch (err) {
      setError(
        err.message || 'Could not connect to the LunaScope server.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLocations()
  }, [])

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

        <section className="study-areas" id="study-areas">
          <p className="label">EXPLORE THE LUNAR SURFACE</p>
          <h2>Discover Lunar Locations</h2>

          <p className="explorer-description">
            Explore lunar landmarks, discover their geological features,
            and learn about important regions of the Moon.
          </p>

          <div className="results-heading">
            <h3>Explore Results</h3>

            {!loading && !error && (
              <span>
                {locationarray.length}{' '}
                {locationarray.length === 1 ? 'location' : 'locations'}
              </span>
            )}
          </div>

          {loading && (
            <p className="explorer-message">
              Loading lunar locations...
            </p>
          )}

          {error && (
            <div className="explorer-error" role="alert">
              {error}
              <button type="button" onClick={getLocations}>
                Try again
              </button>
            </div>
          )}

          {!loading && !error && locationarray.length === 0 && (
            <p className="explorer-message">
              No lunar locations are available yet.
            </p>
          )}

          {!loading && !error && (
            <div className="location-grid">
              {locationarray
                .filter((location) => location.name === 'Shackleton Crater')
                .map((location) => (
                <article
                  className="location-card"
                  key={location._id}
                >
                  <LunarImage
                    src={
                      location.imageUrl ||
                      lunarImages[location.name] ||
                      FALLBACK_IMAGE
                    }
                    alt={location.name}
                  />

                  <div className="location-info">
                    <p className="location-label">{location.type}</p>
                    <h3>{location.name}</h3>

                    <p className="description">
                      {location.description}
                    </p>

                    <div className="location-coordinates">
                      <span>
                        Latitude: {location.latitude ?? 'N/A'}°
                      </span>
                      <span>
                        Longitude: {location.longitude ?? 'N/A'}°
                      </span>
                    </div>

                    {location.region && (
                      <p className="location-region">
                        Region: {location.region}
                      </p>
                    )}

                    {location.name === 'Shackleton Crater' ? (
                      <Link to="/locations/shackleton">
                        Explore Location →
                      </Link>
                    ) : location.sourceUrl ? (
                      <a
                        href={location.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Explore Source →
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}

              <article className="location-card water-ice-card">
                <LunarImage
                  src="https://svs.gsfc.nasa.gov/vis/a000000/a003800/a003874/spflycolor_print.2100_web.png"
                  alt="Lunar south pole showing permanently shadowed craters"
                />

                <div className="location-info">
                  <p className="location-label">
                    LUNAR POLAR RESEARCH
                  </p>

                  <h3>Permanently Shadowed Regions</h3>

                  <p className="description">
                    Discover why scientists study the Moon's permanently
                    shadowed areas for possible water ice.
                  </p>

                  <Link to="/locations/water-ice">
                    Explore Water Ice →
                  </Link>
                </div>
              </article>
            </div>
          )}

          <p className="explorer-description">
            Images are loaded from NASA-hosted URLs. An internet connection
            is required to display them.
          </p>
        </section>

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
