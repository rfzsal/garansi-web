import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const KlaimContext = createContext(null)

const ProvideKlaim = ({ children }) => {
  const klaimProvider = useProvideKlaim()

  return <KlaimContext.Provider value={klaimProvider}>{children}</KlaimContext.Provider>
}

const useKlaim = () => useContext(KlaimContext)

const useProvideKlaim = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [data, setData] = useState([])

  const refresh = () => {
    setLoading(true)

    axios
      .get('/api/klaim')
      .then(res => {
        setData(
          res.data.data.map(row => {
            return {
              ...row,
              tanggal_klaim: row.tanggal_klaim * 1000,
              tanggal_akhir: row.tanggal_akhir * 1000
            }
          })
        )
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

  useEffect(() => {
    refresh()
  }, [])

  return { loading, error, data, refresh }
}

export { ProvideKlaim, useKlaim }
