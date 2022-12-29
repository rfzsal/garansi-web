import { query } from 'src/lib/mysql'

const handler = async (req, res) => {
  const [data, error] = await query(
    'SELECT id, nama_produk, UNIX_TIMESTAMP(tanggal_mulai) AS tanggal_mulai, UNIX_TIMESTAMP(tanggal_akhir) AS tanggal_akhir FROM data_garansi'
  )

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ data })
  }
}

export default handler
