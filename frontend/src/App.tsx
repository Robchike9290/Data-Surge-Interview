import { useState, useEffect } from 'react'

interface HelloResponse {
  message: string
}

function App() {
  const [message, setMessage] = useState<string>('')
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
      .then((data: HelloResponse) => {
        setMessage(data.message)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 text-center">
        <p className="text-xl text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 text-center">
      <h1 className="text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
        {message}
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
        Full-stack app with React/TypeScript and Node.js/Express
      </p>
    </div>
  )
}

export default App

