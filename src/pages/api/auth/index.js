import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  res.status(200).send({ user: req.session.user })
}

export default withSessionRoute(handler)
