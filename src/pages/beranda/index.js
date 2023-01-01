import Grid from '@mui/material/Grid'

import Trophy from 'src/views/beranda/Trophy'
import StatisticsCard from 'src/views/beranda/StatisticsCard'

import { withSessionSsr } from 'src/lib/session'

const Beranda = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
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
