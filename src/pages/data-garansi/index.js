import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

import Plus from 'mdi-material-ui/Plus'

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
  const { data } = useGaransi()

  const rows = data.map(row => {
    return createData(row.id, row.nama_produk, row.tanggal_mulai, row.tanggal_akhir)
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Button variant='contained' startIcon={<Plus />}>
          Tambah Data Garansi
        </Button>
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
