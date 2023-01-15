import { formatDate } from 'src/lib/date'
import { query } from 'src/lib/mysql'

const handler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { id_garansi, no_telepon, keterangan, tanggal_klaim } = req.body

  if (!id_garansi || !no_telepon || !keterangan || !tanggal_klaim) return res.status(400).end()

  const id = Math.floor(100000000 + Math.random() * 900000000)

  const [status1, error1] = await query(
    `INSERT INTO data_klaim VALUES('${id}', '${id_garansi}', '${no_telepon}', 'Menunggu pengecekan', '${keterangan}', '${formatDate(
      tanggal_klaim,
      'yyyy-MM-dd'
    )}')`
  )

  const [status2, error2] = await query(
    `INSERT INTO status_klaim VALUES('${id}', 'Menunggu pengecekan', '${formatDate(
      tanggal_klaim,
      'yyyy-MM-dd hh:mm:ss'
    )}')`
  )

  if (error1 || error2) {
    res.status(500).send({ error: [error1, error2] })
  } else {
    res.status(200).send({ status: [status1, status2] })
  }
}

export default handler
