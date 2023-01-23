import { hash } from 'bcrypt'
import { signIn } from 'src/lib/auth'
import { query } from 'src/lib/mysql'
import { withSessionRoute } from 'src/lib/session'

const handler = async (req, res) => {
  const user = req.session.user

  const isAuth = user?.role === 'admin' || user?.role === 'distributor'
  if (!isAuth) return res.status(401).end()

  if (req.method !== 'PUT') return res.status(405).end()

  if (!req.query.username) return res.status(400).end()

  const { username, password, newPassword } = req.body

  if (username && password) {
    const user = await signIn(req.query.username, password)
    if (!user) return res.status(401).send(false)

    const [status, error] = await query(
      `UPDATE data_pengguna SET username='${username}' WHERE username='${req.query.username}'`
    )

    if (error) {
      return res.status(500).send({ error })
    } else {
      req.session.destroy()

      req.session.user = { username, role: user.role }
      await req.session.save()

      return res.status(200).send({ status })
    }
  }

  if (password && newPassword) {
    const user = await signIn(req.query.username, password)
    if (!user) return res.status(401).send(false)

    const hashedPassword = await hash(newPassword, 10)

    const [status, error] = await query(
      `UPDATE data_pengguna SET password='${hashedPassword}' WHERE username='${req.query.username}'`
    )

    if (error) {
      return res.status(500).send({ error })
    } else {
      return res.status(200).send({ status })
    }
  }

  return res.status(400).end()
}

export default withSessionRoute(handler)
