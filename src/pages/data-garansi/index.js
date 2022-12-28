import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Plus from 'mdi-material-ui/Plus'
import Import from 'mdi-material-ui/Import'
import Export from 'mdi-material-ui/Export'

import { useGaransi } from 'src/hooks/useGaransi'
import GaransiTable from 'src/views/data-garansi/GaransiTable'

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

  const rows = data.map(row => {
    return createData(row.id, row.nama_produk, row.tanggal_mulai, row.tanggal_akhir)
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack gap={2} direction={fullWidth ? 'column' : 'row'}>
          <Button variant='contained' size='small' fullWidth={fullWidth} startIcon={<Plus />}>
            Tambah Data Garansi
          </Button>
          <Button variant='contained' size='small' fullWidth={fullWidth} startIcon={<Import />}>
            Import Data Garansi
          </Button>
          <Button variant='contained' size='small' fullWidth={fullWidth} startIcon={<Export />}>
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
  )
}

export default DataGaransi
