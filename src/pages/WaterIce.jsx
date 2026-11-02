
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function WaterIce() {
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTopic() {
      try {
        const response = await fetch(
          'http://localhost:3000/api/locations'
        )

        if (!response.ok) {
          throw new Error('Failed to load Water Ice content')
        }

        const data = await response.json()

        const record = data.find(
          item => item.name === 'Water Ice on the Moon'
        )

        if (!record) {
          throw new Error('Water Ice record not found in database')
        }

        setTopic(record)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTopic()
  }, [])

  if (loading) return <p>Loading Water Ice content...</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <main className="location-details">
      <Link to="/">← Back to Explore</Link>

      <p className="label">{topic.type}</p>
      <h1>{topic.name}</h1>

      {topic.imageUrl && (
        <img
          src={topic.imageUrl}
          alt={topic.name}
          style={{ width: '100%', maxWidth: '800px' }}
        />
      )}

      <p>{topic.description}</p>

      <p>Region: {topic.region}</p>

      {topic.facts?.length > 0 && (
        <>
          <h2>Key Facts</h2>
          <ul>
            {topic.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </>
      )}

      {topic.sourceUrl && (
        <a href={topic.sourceUrl} target="_blank" rel="noreferrer">
          Learn more from NASA
        </a>
      )}
    </main>
  )
}

export default WaterIce
