import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const GaransiContext = createContext(null)

const ProvideGaransi = ({ children }) => {
  const garansiProvider = useProvideGaransi()

  return <GaransiContext.Provider value={garansiProvider}>{children}</GaransiContext.Provider>
}

const useGaransi = () => useContext(GaransiContext)

const useProvideGaransi = () => {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const [data, setData] = useState([])

  const refresh = () => {
    setLoading(true)

    axios
      .get('/api/garansi')
      .then(res => {
        setData(res.data.data)
        setError(null)
      })
      .catch(error => {
        setData([])
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    refresh()
  }, [])

  return { loading, error, data }
}

export { ProvideGaransi, useGaransi }
