import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/home/FooterIllustration'
import { Container } from '@mui/material'

import TableBasic from 'src/views/tables/TableBasic'
import TableCollapsible from 'src/views/tables/TableCollapsible'

const Home = () => {
  const [values, setValues] = useState({
    idGaransi: '',
    loading: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <>
      <Container maxWidth='md' sx={{ py: 10 }}>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7, 7, 7)} !important` }}>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Cek Status Garansi 🔎
              </Typography>
              <Typography variant='body2'>Cek status garansi dengan nomor komponen</Typography>
            </Box>

            <TextField
              autoFocus
              fullWidth
              label='No. Serial Komponen'
              placeholder='000000000'
              sx={{ marginBottom: 5 }}
            />

            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 3 }}>
              Cek Status
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ mt: 5, zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7, 7, 7)} !important` }}>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Status Garansi
              </Typography>
            </Box>
            <Box>
              <TableBasic />
            </Box>
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 3, mt: 7 }}>
              Klaim Garansi
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ mt: 5, zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7, 7, 7)} !important` }}>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Riwayat Klaim Garansi
              </Typography>
            </Box>
            <Box>
              <TableCollapsible />
            </Box>
          </CardContent>
        </Card>
      </Container>

      <FooterIllustrationsV1 />
    </>
  )
}
Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home
