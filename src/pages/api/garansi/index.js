import { query } from 'src/lib/mysql'

const handler = async (req, res) => {
  const { id } = req.query

  const sql = id
    ? `SELECT id, nama_produk, UNIX_TIMESTAMP(tanggal_mulai) AS tanggal_mulai, UNIX_TIMESTAMP(tanggal_akhir) AS tanggal_akhir FROM data_garansi WHERE id='${id}'`
    : 'SELECT id, nama_produk, UNIX_TIMESTAMP(tanggal_mulai) AS tanggal_mulai, UNIX_TIMESTAMP(tanggal_akhir) AS tanggal_akhir FROM data_garansi'

  const [data, error] = await query(sql)

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ data })
  }
}

export default handler
