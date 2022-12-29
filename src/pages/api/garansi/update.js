import { query } from 'src/lib/mysql'
import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  const user = req.session.user

  const isAuth = user?.role === 'admin' || user?.role === 'distributor'
  if (!isAuth) return res.status(401).end()

  if (req.method !== 'PUT') return res.status(405).end()

  if (!req.query.id) return res.status(400).end()

  const { nama_produk, tanggal_mulai, tanggal_akhir } = req.body

  if (!nama_produk || !tanggal_mulai || !tanggal_akhir) return res.status(400).end()

  const [status, error] = await query(
    `UPDATE data_garansi SET nama_produk='${nama_produk}', tanggal_mulai='${tanggal_mulai}', tanggal_akhir='${tanggal_akhir}' WHERE id='${req.query.id}'`
  )

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ status })
  }
}

export default withSessionRoute(handler)
