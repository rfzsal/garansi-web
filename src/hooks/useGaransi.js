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
        setData(
          res.data.data.map(row => {
            return {
              id: row.id,
              nama_produk: row.nama_produk,
              tanggal_mulai: row.tanggal_mulai * 1000,
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

  const importData = async data => {
    try {
      await axios.post('/api/garansi/import', { data })
      refresh()

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }

  const addData = async data => {
    try {
      await axios.post('/api/garansi/add', { ...data })
      refresh()

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }

  const removeData = async id => {
    try {
      await axios.delete(`/api/garansi/remove?id=${id}`)
      refresh()

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }

  const removeBulkData = async arrayOfId => {
    try {
      await axios.post('/api/garansi/bulk-remove', { data: arrayOfId })
      refresh()

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }

  const editData = async (id, newData) => {
    try {
      await axios.put(`/api/garansi/update?id=${id}`, { ...newData })
      refresh()

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { loading, error, data, refresh, importData, addData, removeData, removeData, removeBulkData, editData }
}

export { ProvideGaransi, useGaransi }
