import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Refresh from 'mdi-material-ui/Refresh'

import { withSessionSsr } from 'src/lib/session'
import KlaimTable from 'src/views/data-klaim/KlaimTable'

const DataKlaim = () => {
  const [realtime, setRealtime] = useState(true)
  const fullWidth = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const toggleRealtime = () => setRealtime(!realtime)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack gap={2} direction={fullWidth ? 'column' : 'row'}>
            <Button
              onClick={toggleRealtime}
              variant='contained'
              size='small'
              color={realtime ? 'success' : 'error'}
              fullWidth={fullWidth}
              startIcon={<Refresh />}
            >
              Mode Realtime {realtime ? 'Aktif' : 'Tidak Aktif'}
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <KlaimTable realtime={realtime} />
          </Card>
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

export default DataKlaim
