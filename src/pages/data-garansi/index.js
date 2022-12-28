import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Plus from 'mdi-material-ui/Plus'
import Import from 'mdi-material-ui/Import'
import Export from 'mdi-material-ui/Export'

import { exportFile } from 'src/lib/excel'
import { useGaransi } from 'src/hooks/useGaransi'
import { useDialog } from 'src/hooks/useDialog'
import { withSessionSsr } from 'src/lib/session'
import GaransiTable from 'src/views/data-garansi/GaransiTable'
import ImportDataGaransi from 'src/views/data-garansi/dialogs/ImportDataGaransi'

const createData = (id, name, startDate, endDate) => {
  return {
    id,
    name,
    startDate,
    endDate
  }
}

const DataGaransi = () => {
  const fullWidth = useMediaQuery(theme => theme.breakpoints.down('md'))
  const { data } = useGaransi()
  const { dialogOpened, openDialog } = useDialog()

  const rows = data.map(row => {
    return createData(row.id, row.nama_produk, row.tanggal_mulai, row.tanggal_akhir)
  })

  const handleExport = () => {
    const rowsData = [['id', 'nama_produk', 'tanggal_mulai', 'tanggal_akhir']]
    data.forEach(row => {
      rowsData.push([row.id, row.nama_produk, row.tanggal_mulai, row.tanggal_akhir])
    })

    exportFile(rowsData)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack gap={2} direction={fullWidth ? 'column' : 'row'}>
            <Button onClick={openDialog} variant='contained' size='small' fullWidth={fullWidth} startIcon={<Plus />}>
              Tambah Data Garansi
            </Button>
            <Button variant='contained' size='small' fullWidth={fullWidth} startIcon={<Import />}>
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
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <GaransiTable rows={rows} />
          </Card>
        </Grid>
      </Grid>

      <ImportDataGaransi open={dialogOpened} />
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
