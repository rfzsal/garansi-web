import { query } from 'src/lib/mysql'
import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  const user = req.session.user

  const isAuth = user?.role === 'admin' || user?.role === 'distributor'
  if (!isAuth) return res.status(401).end()

  if (req.method !== 'POST') return res.status(405).end()

  const { data } = req.body

  if (data.length === 0) return res.status(400).end()

  if (!data[0].id || !data[0].nama_produk || !data[0].tanggal_mulai || !data[0].tanggal_akhir)
    return res.status(400).end()

  const values = data.map(row => `('${row.id}','${row.nama_produk}','${row.tanggal_mulai}', '${row.tanggal_akhir}')`)
  values.join(',')

  const [status, error] = await query(`INSERT INTO data_garansi VALUES${values}`)

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ status })
  }
}

export default withSessionRoute(handler)