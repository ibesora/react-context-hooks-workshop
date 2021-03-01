import { useState, createContext, useMemo, useContext } from 'react'

const ReviewsContext = createContext(null)

export const ReviewsContextProvider = ({children}) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getHotelReviews = useMemo(() => {
    return (id) => {
      fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${id}/reviews`)
      .then(response => response.json())
      .then(data => {
        setReviews(data)
        setLoading(false)
      })
      .catch(() => setError(true))
    }
  }, [])

  return (
    <ReviewsContext.Provider
      value={{
        loading,
        error,
        reviews,
        getHotelReviews
      }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviewsContext = () => {
  return useContext(ReviewsContext);
}

export default ReviewsContext