import axios from 'axios'

class coreSession {
  async getSession() {
    try {
      const res = await axios.get('/api/auth')

      return [res.data.user, null]
    } catch (error) {
      return [null, error]
    }
  }

  async updateUser(username, data) {
    try {
      await axios.put(`/api/auth/update?username=${username}`, data)

      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export { coreSession }
