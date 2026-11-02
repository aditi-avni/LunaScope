
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000/api'

function MyLibrary() {
  const [token, setToken] = useState(
    () => localStorage.getItem('lunascopeToken') || ''
  )
  const [email, setEmail] = useState(
    () => localStorage.getItem('lunascopeEmail') || ''
  )
  const [authMode, setAuthMode] = useState('login')
  const [formEmail, setFormEmail] = useState('')
  const [password, setPassword] = useState('')

  const [resources, setResources] = useState([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(options.auth && token
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...options.headers
      }
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong')
    }

    return data
  }

  async function loadResources() {
    if (!token) return

    setLoading(true)
    setError('')

    try {
      const data = await request('/study-resources', {
        auth: true
      })
      setResources(data)
    } catch (err) {
      setError(err.message)

      if (
        err.message.toLowerCase().includes('token') ||
        err.message.toLowerCase().includes('unauthorized')
      ) {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) loadResources()
    else setResources([])
    // Load resources when the login token changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  async function handleAuth(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    try {
      const endpoint =
        authMode === 'register' ? '/auth/register' : '/auth/login'

      const data = await request(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          email: formEmail.trim(),
          password
        })
      })

      if (!data.token) {
        throw new Error('Authentication token was not returned')
      }

      localStorage.setItem('lunascopeToken', data.token)
      localStorage.setItem('lunascopeEmail', data.user?.email || formEmail.trim())

      setEmail(data.user?.email || formEmail.trim())
      setToken(data.token)
      setPassword('')
      setFormEmail('')
      setMessage(
        authMode === 'register'
          ? 'Account created successfully!'
          : 'Welcome back!'
      )
    } catch (err) {
      setError(err.message)
    }
  }

  function logout() {
    localStorage.removeItem('lunascopeToken')
    localStorage.removeItem('lunascopeEmail')
    setToken('')
    setEmail('')
    setResources([])
    setMessage('')
    setError('')
  }

  async function handleAddResource(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    try {
      const resource = await request('/study-resources', {
        method: 'POST',
        auth: true,
        body: JSON.stringify({ name, url, notes })
      })

      setResources(current => [resource, ...current])
      setName('')
      setUrl('')
      setNotes('')
      setMessage('Website saved to your library!')
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    setError('')
    setMessage('')

    try {
      await request(`/study-resources/${id}`, {
        method: 'DELETE',
        auth: true
      })

      setResources(current =>
        current.filter(resource => resource._id !== id)
      )
      setMessage('Website removed from your library.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="my-library" id="my-library">
      <p className="label">YOUR PERSONAL COLLECTION</p>
      <h2>My Library</h2>

      <p className="explorer-description">
        Keep your favourite space, astronomy, and lunar science
        study resources together in one place.
      </p>

      {error && (
        <p className="library-feedback library-error" role="alert">
          {error}
        </p>
      )}

      {message && (
        <p className="library-feedback" role="status">
          {message}
        </p>
      )}

      {!token ? (
        <div className="library-panel">
          <div className="library-empty-icon">✦</div>

          <h3>
            {authMode === 'login'
              ? 'Welcome back, explorer.'
              : 'Create your explorer account.'}
          </h3>

          <p>
            Sign in or create an account to save and manage
            your favourite study websites.
          </p>

          <div className="library-auth-tabs">
            <button
              type="button"
              className={authMode === 'login' ? 'active' : ''}
              onClick={() => {
                setAuthMode('login')
                setError('')
                setMessage('')
              }}
            >
              Log in
            </button>

            <button
              type="button"
              className={authMode === 'register' ? 'active' : ''}
              onClick={() => {
                setAuthMode('register')
                setError('')
                setMessage('')
              }}
            >
              Register
            </button>
          </div>

          <form className="library-form" onSubmit={handleAuth}>
            <label htmlFor="library-email">Email</label>
            <input
              id="library-email"
              type="email"
              autoComplete="email"
              value={formEmail}
              onChange={event => setFormEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />

            <label htmlFor="library-password">Password</label>
            <input
              id="library-password"
              type="password"
              autoComplete={
                authMode === 'register'
                  ? 'new-password'
                  : 'current-password'
              }
              minLength={authMode === 'register' ? 8 : undefined}
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder={
                authMode === 'register'
                  ? 'At least 8 characters'
                  : 'Enter your password'
              }
              required
            />

            <button className="library-submit" type="submit">
              {authMode === 'login'
                ? 'Log In →'
                : 'Create Account →'}
            </button>
          </form>
        </div>
      ) : (
        <div className="library-content">
          <div className="library-heading">
            <div>
              <p className="library-account">SIGNED IN AS</p>
              <p className="library-email">{email}</p>
            </div>

            <button
              type="button"
              className="library-secondary"
              onClick={logout}
            >
              Log out
            </button>
          </div>

          <div className="library-panel">
            <h3>Add a study resource</h3>
            <p>
              Save useful websites, articles, and learning materials.
            </p>

            <form className="library-form" onSubmit={handleAddResource}>
              <label htmlFor="resource-name">Resource name</label>
              <input
                id="resource-name"
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="e.g. NASA Moon Exploration"
                maxLength={100}
                required
              />

              <label htmlFor="resource-url">Website URL</label>
              <input
                id="resource-url"
                type="url"
                value={url}
                onChange={event => setUrl(event.target.value)}
                placeholder="https://example.com"
                maxLength={2048}
                required
              />

              <label htmlFor="resource-notes">Notes (optional)</label>
              <textarea
                id="resource-notes"
                value={notes}
                onChange={event => setNotes(event.target.value)}
                placeholder="What do you want to remember about this resource?"
                maxLength={500}
                rows={3}
              />

              <button className="library-submit" type="submit">
                + Save Website
              </button>
            </form>
          </div>

          <div className="library-saved">
            <div className="results-heading">
              <h3>Saved Resources</h3>
              <span>{resources.length}</span>
            </div>

            {loading ? (
              <p className="explorer-message">Loading your library...</p>
            ) : resources.length === 0 ? (
              <p className="explorer-message">
                Your library is empty. Save your first study website above!
              </p>
            ) : (
              <div className="library-resource-list">
                {resources.map(resource => (
                  <article
                    className="library-resource"
                    key={resource._id}
                  >
                    <div className="library-resource-details">
                      <h4>{resource.name}</h4>

                      {resource.notes && <p>{resource.notes}</p>}

                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Website ↗
                      </a>
                    </div>

                    <button
                      type="button"
                      className="library-delete"
                      onClick={() => handleDelete(resource._id)}
                      aria-label={`Delete ${resource.name}`}
                    >
                      Delete
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default MyLibrary
