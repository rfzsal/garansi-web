import { query } from 'src/lib/mysql'

const handler = async (req, res) => {
  const [data, error] = await query('SELECT * FROM data_garansi')

  if (error) {
    res.status(500).send({ error })
  } else {
    res.status(200).send({ data })
  }
}

export default handler
