import { withSessionRoute } from 'src/lib/session'
import { signIn } from 'src/lib/auth'

const handler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body

  const user = await signIn(username, password)
  if (!user) return res.status(401).send(false)

  req.session.user = { username: user.username, role: user.role }
  await req.session.save()

  res.status(200).send(true)
}

export default withSessionRoute(handler)
