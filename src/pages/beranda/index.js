import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { startOfMonth, endOfMonth } from 'date-fns'

import Trophy from 'src/views/beranda/Trophy'
import StatisticsCard from 'src/views/beranda/StatisticsCard'

import { withSessionSsr } from 'src/lib/session'
import { useKlaim } from 'src/hooks/useKlaim'

const Beranda = () => {
  const { data, refresh, loading } = useKlaim()

  const activeKlaim = data.filter(row => row.status !== 'Klaim ditolak' && row.status !== 'Klaim diterima')

  const thisMonthData = data.filter(row => {
    const dateNow = new Date()

    return row.tanggal_klaim >= startOfMonth(dateNow) && row.tanggal_klaim <= endOfMonth(dateNow)
  })

  useEffect(() => {
    const loop = setInterval(() => {
      if (!loading) refresh()
    }, 15000)

    return () => clearInterval(loop)
  }, [loading, refresh])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy numActive={activeKlaim.length} />
        </Grid>

        <Grid item xs={12} md={8}>
          <StatisticsCard data={thisMonthData} />
        </Grid>
      </Grid>
    </>
  )
}

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

export default Beranda
