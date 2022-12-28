import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const GaransiContext = createContext(null)

const ProvideGaransi = ({ children }) => {
  const garansiProvider = useProvideGaransi()

  return <GaransiContext.Provider value={garansiProvider}>{children}</GaransiContext.Provider>
}

const useGaransi = () => useContext(GaransiContext)

const useProvideGaransi = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [data, setData] = useState([])

  const refresh = () => {
    setLoading(true)

    axios
      .get('/api/garansi')
      .then(res => {
        setData(res.data.data)
        setError(false)
      })
      .catch(error => {
        setData([])
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const importData = async data => {
    try {
      await axios.post('/api/garansi/import', { data })
      refresh()

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { loading, error, data, refresh, importData }
}

export { ProvideGaransi, useGaransi }
