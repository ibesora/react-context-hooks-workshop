import { useReducer, useEffect, createContext, useContext, useMemo } from 'react'

const HotelsContext = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
    case 'setHotels':
      return {
        error: false,
        loading: false,
        hotels: action.payload
      }
    case 'setHotel':
      return {
        error: false,
        loading: false,
        hotel: action.payload
      }
    case 'setError':
      return {
        loading: false,
        error: action.payload,
        hotels: []
      }
    default:
      return state
  }
}

export const HotelsContextProvider = ({children}) => {
  const [ data, dispatch ] = useReducer(reducer, { hotels: [], hotel: {}, loading: true, error: false })

  const getHotels = useMemo(() => {
    return () => {
      fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels')
      .then(response => response.json())
      .then(data => {
        dispatch({type: 'setHotels', payload: data})
      })
      .catch(() => dispatch({type: 'setError', payload: true}))
    }
  }, [])

  const getHotel = useMemo(() => {
    return (id) => {
      const hotel = (data.hotels || []).find(h => h.id.toString() === id)
      if (hotel) dispatch({type: 'setHotel', payload: hotel})
      else {
        fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${id}`)
        .then(response => response.json())
        .then(data => {
          dispatch({type: 'setHotel', payload: data})
        })
        .catch(() => dispatch({type: 'setError', payload: true}))
      }
    }
  }, [data.hotels])


  return (
    <HotelsContext.Provider
      value={{
          ...data,
          getHotels,
          getHotel
        }
      }
    >
      {children}
    </HotelsContext.Provider>
  )
}

export const useHotelsContext = () => {
  return useContext(HotelsContext);
}

export default HotelsContext