import { query } from 'src/lib/mysql'
import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  const user = req.session.user

  const isAuth = user?.role === 'admin' || user?.role === 'distributor'
  if (!isAuth) return res.status(401).end()

  if (req.method !== 'DELETE') return res.status(405).end()

  if (!req.query.id) return res.status(400).end()

  const [status, error] = await query(`DELETE FROM data_garansi WHERE id='${req.query.id}'`)

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ status })
  }
}

export default withSessionRoute(handler)
