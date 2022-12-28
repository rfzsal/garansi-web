import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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

export default Keluar
