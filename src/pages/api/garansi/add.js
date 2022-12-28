import { query } from 'src/lib/mysql'
import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  const user = req.session.user

  const isAuth = user?.role === 'admin' || user?.role === 'distributor'
  if (!isAuth) return res.status(401).end()

  if (req.method !== 'POST') return res.status(405).end()

  const { id, nama_produk, tanggal_mulai, tanggal_akhir } = req.body

  if (!id || !nama_produk || !tanggal_mulai || !tanggal_akhir) return res.status(400).end()

  const [status, error] = await query(
    `INSERT INTO data_garansi VALUES('${id}', '${nama_produk}', '${tanggal_mulai}', '${tanggal_akhir}')`
  )

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ status })
  }
}

export default withSessionRoute(handler)
