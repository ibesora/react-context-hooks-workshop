import { useState, useEffect, createContext, useMemo } from 'react'

const HotelsContext = createContext(null)

export const HotelsContextProvider = ({children}) => {
  const [hotels, setHotels] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (hotels.length === 0) {
      fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels')
      .then(response => response.json())
      .then(data => {
        setHotels(data)
        setLoading(false)
      })
      .catch(() => setError(true));
    }
  }, [hotels.length])

  const getHotelReviews = useMemo(() => {
    return (id) => {
      fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${id}/reviews`)
      .then(response => response.json())
      .then(data => {
        setReviews(data)
      })
      .catch(() => setError(true))
    }
  }, [])

  return (
    <HotelsContext.Provider
      value={{
        loading,
        error,
        hotels,
        reviews,
        getHotelReviews
      }}
    >
      {children}
    </HotelsContext.Provider>
  )
}

export default HotelsContext