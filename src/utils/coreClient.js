import axios from 'axios'

class coreClient {
  async getGaransi(id) {
    try {
      const res = await axios.get(`/api/garansi?id=${id}`)

      return [res.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }

  async getKlaimGaransi(id) {
    try {
      const res = await axios.get(`/api/klaim?id=${id}`)

      return [res.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export { coreClient }
