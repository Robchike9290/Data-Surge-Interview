import { useState, useEffect } from 'react'

interface DbResponse {
  message: string
}

function App() {
  const [message, setMessage] = useState<string>('')
  const [info, setInfo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data: DbResponse) => {
        setMessage(data.message)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })

    fetch('/api/authorInfo')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data: DbResponse) => {
        setInfo(data.message)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div>
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p className="text-xl">Error: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-5xl">
        {message}
      </h1>
      <h2>
        {info}
      </h2>
      <p className="text-xl">
        Full-stack app with React/TypeScript and Node.js/Express
      </p>
    </div>
  )
}

export default App

