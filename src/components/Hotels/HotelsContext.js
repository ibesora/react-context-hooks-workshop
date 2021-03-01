import { useReducer, useEffect, createContext, useContext } from 'react'

const HotelsContext = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
    case 'setHotels':
      return {
        error: false,
        loading: false,
        hotels: action.payload
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
  const [ data, dispatch ] = useReducer(reducer, { hotels: [], loading: true, error: false })

  useEffect(() => {
    if (data.hotels.length === 0) {
      fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels')
      .then(response => response.json())
      .then(data => {
        dispatch({type: 'setHotels', payload: data})
      })
      .catch(() => dispatch({type: 'setError', payload: true}))
    }
  }, [data.hotels.length])

  return (
    <HotelsContext.Provider
      value={data}
    >
      {children}
    </HotelsContext.Provider>
  )
}

export const useHotelsContext = () => {
  return useContext(HotelsContext);
}

export default HotelsContext