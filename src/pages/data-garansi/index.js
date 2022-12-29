import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'

import Plus from 'mdi-material-ui/Plus'
import Import from 'mdi-material-ui/Import'
import Export from 'mdi-material-ui/Export'
import Refresh from 'mdi-material-ui/Refresh'

import { exportFile } from 'src/lib/excel'
import { useGaransi } from 'src/hooks/useGaransi'
import { useModal } from 'src/hooks/useModal'
import { withSessionSsr } from 'src/lib/session'
import GaransiTable from 'src/views/data-garansi/GaransiTable'
import ImportDataGaransi from 'src/views/data-garansi/modals/ImportDataGaransi'
import AddDataGaransi from 'src/views/data-garansi/modals/AddDataGaransi'

const DataGaransi = () => {
  const snack = useSnackbar()
  const fullWidth = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const { data, refresh } = useGaransi()
  const { modalOpened, openModal } = useModal()

  const handleExport = () => {
    const rowsData = [['id', 'nama_produk', 'tanggal_mulai', 'tanggal_akhir']]
    data.forEach(row => {
      rowsData.push([row.id, row.nama_produk, new Date(row.tanggal_mulai - 12000), new Date(row.tanggal_akhir - 12000)])
    })

    const [status] = exportFile(rowsData, 'data_garansi.xlsx')
    if (status) snack.enqueueSnackbar('Export data berhasil', { variant: 'success' })
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack gap={2} direction={fullWidth ? 'column' : 'row'}>
            <Button
              onClick={() => openModal('AddDataGaransi')}
              variant='contained'
              size='small'
              fullWidth={fullWidth}
              startIcon={<Plus />}
            >
              Tambah Data Garansi
            </Button>
            <Button
              onClick={() => openModal('ImportDataGaransi')}
              variant='contained'
              size='small'
              fullWidth={fullWidth}
              startIcon={<Import />}
            >
              Import Data Garansi
            </Button>
            <Button
              onClick={handleExport}
              variant='contained'
              size='small'
              fullWidth={fullWidth}
              startIcon={<Export />}
            >
              Export Data Garansi
            </Button>
            <Button onClick={refresh} variant='contained' size='small' fullWidth={fullWidth} startIcon={<Refresh />}>
              Refresh Data Garansi
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <GaransiTable />
          </Card>
        </Grid>
      </Grid>

      <AddDataGaransi open={modalOpened === 'AddDataGaransi'} />
      <ImportDataGaransi open={modalOpened === 'ImportDataGaransi'} />
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

export default DataGaransi
