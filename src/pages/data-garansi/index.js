import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

import Plus from 'mdi-material-ui/Plus'

import GaransiTable from 'src/views/data-garansi/GaransiTable'

const DataGaransi = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Button variant='contained' startIcon={<Plus />}>
          Tambah Data Garansi
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <GaransiTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default DataGaransi
