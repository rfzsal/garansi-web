import { query } from 'src/lib/mysql'

const handler = async (req, res) => {
  const { id } = req.query

  if (!id) return res.status(400).end()

  const sql = `SELECT status_klaim.id_klaim, status_klaim.keterangan, UNIX_TIMESTAMP(status_klaim.timestamp) as timestamp, data_klaim.status FROM status_klaim INNER JOIN data_klaim ON status_klaim.id_klaim = data_klaim.id WHERE status_klaim.id_klaim='${id}' ORDER BY timestamp DESC`

  const [data, error] = await query(sql)

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ data })
  }
}

export default handler
