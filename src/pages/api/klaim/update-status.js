import { query } from 'src/lib/mysql'
import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  const user = req.session.user

  const isAuth = user?.role === 'admin' || user?.role === 'distributor'
  if (!isAuth) return res.status(401).end()

  if (req.method !== 'PUT') return res.status(405).end()

  if (!req.query.id) return res.status(400).end()

  const { status, details } = req.body

  if (!status) return res.status(400).end()

  const [queryStatus1, error1] = await query(`UPDATE data_klaim SET status='${status}' WHERE id='${req.query.id}'`)

  const [queryStatus2, error2] = await query(
    `INSERT INTO status_klaim VALUES ('${req.query.id}', '${details || status}', current_timestamp())`
  )

  if (error1 || error2) {
    res.status(500).send({ error: [error1, error2] })
  } else {
    res.status(200).send({ status: [queryStatus1, queryStatus2] })
  }
}

export default withSessionRoute(handler)
