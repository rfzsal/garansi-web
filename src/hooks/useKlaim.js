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

  const updateStatus = async (id, data) => {
    try {
      await axios.put(`/api/klaim/update-status?id=${id}`, data)
      refresh()

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }

  const getThisMonth = async () => {
    try {
      const res = await axios.get('/api/klaim')

      return [res.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { loading, error, data, refresh, updateStatus, getThisMonth }
}

export { ProvideKlaim, useKlaim }
