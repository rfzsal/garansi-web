import { query } from 'src/lib/mysql'
import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  const user = req.session.user

  const isAuth = user?.role === 'admin' || user?.role === 'distributor'
  if (!isAuth) return res.status(401).end()

  if (req.method !== 'POST') return res.status(405).end()

  const { data } = req.body

  if (data.length === 0) return res.status(400).end()

  const inValues = data.map(id => {
    return `'${id}'`
  })
  inValues.join(',')

  const [status, error] = await query(`DELETE FROM data_garansi WHERE id IN (${inValues})`)

  if (error) {
    console.log(error)
    res.status(500).send({ error })
  } else {
    res.status(200).send({ status })
  }
}

export default withSessionRoute(handler)
