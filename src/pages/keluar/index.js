import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { withSessionSsr } from 'src/lib/session'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Keluar = () => {
  const router = useRouter()

  useEffect(() => {
    axios
      .post('/api/auth/logout')
      .then(() => router.replace('/masuk'))
      .catch(error => error)
  }, [router])

  return null
}
Keluar.getLayout = page => <BlankLayout>{page}</BlankLayout>

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/masuk'
      },
      props: {}
    }
  }

  return {
    props: { user: req.session.user }
  }
})

export default Keluar
