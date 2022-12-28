import { hash } from 'src/lib/hash'
import { query } from 'src/lib/mysql'

const handler = async (req, res) => {
  const username = 'admin'
  const password = 'admin'
  const role = 'admin'

  const hashedPassword = hash(password)

  const [data, error] = await query(`INSERT INTO data_pengguna VALUES('${username}', '${hashedPassword}', '${role}')`)

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ data })
  }
}

export default handler
