import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Export from 'mdi-material-ui/Export'
import Refresh from 'mdi-material-ui/Refresh'

import { useKlaim } from 'src/hooks/useKlaim'
import { withSessionSsr } from 'src/lib/session'
import KlaimTable from 'src/views/data-klaim/KlaimTable'
import { useModal } from 'src/hooks/useModal'
import ExportDataGaransi from 'src/views/data-klaim/modals/ExportDataKlaim'

const DataKlaim = () => {
  const { refresh } = useKlaim()
  const { openModal, modalOpened } = useModal()
  const fullWidth = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const handleOpenExportModal = () => {
    openModal('ExportDataGaransi')
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack gap={2} direction={fullWidth ? 'column' : 'row'}>
            <Button
              onClick={handleOpenExportModal}
              variant='contained'
              size='small'
              fullWidth={fullWidth}
              startIcon={<Export />}
            >
              Export Data Klaim
            </Button>
            <Button onClick={refresh} variant='contained' size='small' fullWidth={fullWidth} startIcon={<Refresh />}>
              Refresh Data Klaim
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <KlaimTable />
          </Card>
        </Grid>
      </Grid>

      <ExportDataGaransi open={modalOpened === 'ExportDataGaransi'} />
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
