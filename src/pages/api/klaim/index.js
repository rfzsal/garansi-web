import { query } from 'src/lib/mysql'
import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  const user = req.session.user

  const isAuth = user?.role === 'admin' || user?.role === 'distributor'

  const { id, from, to } = req.query

  let sql = isAuth
    ? 'SELECT data_klaim.id, data_klaim.id_garansi, data_garansi.nama_produk, data_klaim.no_telepon, data_klaim.status, data_klaim.keterangan, UNIX_TIMESTAMP(data_klaim.tanggal_klaim) AS tanggal_klaim, UNIX_TIMESTAMP(data_garansi.tanggal_akhir) AS tanggal_akhir, gambar FROM data_klaim INNER JOIN data_garansi ON data_klaim.id_garansi = data_garansi.id'
    : 'SELECT data_klaim.id, data_klaim.id_garansi, data_garansi.nama_produk, data_klaim.status, data_klaim.keterangan, UNIX_TIMESTAMP(data_klaim.tanggal_klaim) AS tanggal_klaim, UNIX_TIMESTAMP(data_garansi.tanggal_akhir) AS tanggal_akhir, gambar FROM data_klaim INNER JOIN data_garansi ON data_klaim.id_garansi = data_garansi.id'

  if (id) {
    sql += ` WHERE data_klaim.id_garansi='${id}' ORDER BY tanggal_klaim DESC`
  } else {
    if (from && to) {
      sql += ` WHERE tanggal_klaim BETWEEN '${from}' AND '${to}'`
    }
  }

  const [data, error] = await query(sql)

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ data })
  }
}

export default withSessionRoute(handler)
