import { useReducer, createContext, useMemo, useContext } from 'react'

const ReviewsContext = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
    case 'setReviews':
      return {
        error: false,
        loading: false,
        reviews: action.payload
      }
    case 'setError':
      return {
        loading: false,
        error: action.payload,
        reviews: []
      }
    default:
      return state;
  }
}

export const ReviewsContextProvider = ({children}) => {
  const [ data, dispatch ] = useReducer(reducer, { reviews: [], loading: true, error: false })

  const getHotelReviews = useMemo(() => {
    return (id) => {
      fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${id}/reviews`)
      .then(response => response.json())
      .then(data => {
        dispatch({type: 'setReviews', payload: data})
      })
      .catch(() => dispatch({type: 'setError', payload: true}))
    }
  }, [])

  return (
    <ReviewsContext.Provider
      value={{
        ...data,
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