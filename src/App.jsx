import { useState, useEffect, useCallback } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [imgUrl, setImgUrl] = useState('')

  const fetchDogImage = useCallback(async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random')
      setImgUrl(response.data.message)
    } catch (error) {
      console.error('Error fetching dog image:', error)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDogImage()
  }, [fetchDogImage])

  return (
    <div className="app">
      <main className="app-shell">
        <section className="panel panel--media">
          <p className="eyebrow">Random dog gallery</p>
          <h1>Cute dog</h1>
          <div className="image-card">
            {imgUrl ? (
              <img src={imgUrl} alt="Random dog" className="dog-image" />
            ) : (
              <div className="image-placeholder">Loading a random pup...</div>
            )}
          </div>
        </section>
        <section className="panel panel--controls">
          <button className="btn btn--primary" onClick={fetchDogImage}>
            Generate new image
          </button>
          <button className="btn" onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p>The app fetches a dog image on load and can be manually refreshed.</p>
        </section>
      </main>
    </div>
  )
}

export default App
