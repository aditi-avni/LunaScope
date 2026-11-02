
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000/api/locations'

function Shackleton() {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        if (!response.ok) {
          throw new Error('Unable to fetch lunar locations')
        }

        const shackleton = data.find(
          (item) => item.name === 'Shackleton Crater'
        )

        if (!shackleton) {
          throw new Error('Shackleton Crater was not found')
        }

        setLocation(shackleton)
      } catch (err) {
        setError(err.message || 'Unable to connect to the server')
      } finally {
        setLoading(false)
      }
    }

    getLocation()
  }, [])

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

            {loading && <p>Loading location...</p>}

            {error && <p role="alert">{error}</p>}

            {location && (
              <>
                <h2>{location.name}</h2>

                {location.imageUrl && (
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    style={{
                      width: '100%',
                      maxWidth: '800px',
                      borderRadius: '8px',
                      margin: '24px 0',
                    }}
                  />
                )}

                <p>{location.description}</p>

                {location.region && <p>Region: {location.region}</p>}

                <p>
                  Latitude: {location.latitude ?? 'N/A'}°
                  {' | '}
                  Longitude: {location.longitude ?? 'N/A'}°
                </p>

                {location.facts?.length > 0 && (
                  <>
                    <h3>Facts</h3>
                    <ul>
                      {location.facts.map((fact, index) => (
                        <li key={index}>{fact}</li>
                      ))}
                    </ul>
                  </>
                )}

                {location.sourceUrl && (
                  <p>
                    <a
                      href={location.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn more from NASA
                    </a>
                  </p>
                )}
              </>
            )}

            <Link to="/" className="back-link">
              ← Back to Explore
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Shackleton
