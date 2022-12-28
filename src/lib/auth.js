import { compare } from './hash'

const { query } = require('./mysql')

const signIn = async (username, password) => {
  const [data, error] = await query(`SELECT * FROM data_pengguna WHERE username='${username}'`)

  if (error) return false
  if (data.length === 0) return false

  const isPasswordValid = compare(password, data[0].password)
  if (!isPasswordValid) return false

  return { username: data[0].username, role: data[0].role }
}

export { signIn }
