import { useReducer, createContext, useMemo, useContext } from 'react'

const ReviewsContext = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
    case 'addReview': 
      return {
        error: false,
        loading: false,
        clientSideReviews: [...state.clientSideReviews, action.payload],
        reviews: [...action.payload, ...state.clientSideReviews]
      }
    case 'setReviews':
      return {
        error: false,
        loading: false,
        reviews: [...action.payload, ...state.clientSideReviews],
        clientSideReviews: state.clientSideReviews
      }
    case 'setError':
      return {
        loading: false,
        error: action.payload,
        reviews: [],
        clientSideReviews: state.clientSideReviews
      }
    default:
      return state;
  }
}

export const ReviewsContextProvider = ({children}) => {
  const [ data, dispatch ] = useReducer(reducer, { reviews: [], loading: true, error: false, clientSideReviews: [] })

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

  const addHotelReview = useMemo(() => {
    return (hotelId, title, rating, description) => {
      const reviewParams = {
        title,
        rating,
        description,
        id: Math.floor(Math.random() * 100),
        hotelId: parseInt(hotelId),
      }
      fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews`,
      {
        method: 'POST',
        body: JSON.stringify(reviewParams)
      })
      .then(response => response.json())
      .then(() => {
        dispatch({type: 'addReview', payload: reviewParams})
      })
      .catch(() => dispatch({type: 'setError', payload: true}))
    }
  }, [])

  return (
    <ReviewsContext.Provider
      value={{
        ...data,
        getHotelReviews,
        addHotelReview
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