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

  async getRiwayatKlaim(id) {
    try {
      const res = await axios.get(`/api/klaim/history?id=${id}`)

      return [res.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }

  async addKlaimGaransi(data) {
    try {
      await axios.post('/api/klaim/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export { coreClient }
