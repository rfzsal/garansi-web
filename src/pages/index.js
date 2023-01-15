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
import { isYesterday } from 'date-fns'
import { useSnackbar } from 'notistack'

import StatusGaransiTable from 'src/views/klaim-garansi/StatusGaransiTable'
import RiwayatGaransiTable from 'src/views/klaim-garansi/RiwayatGaransiTable'
import { coreClient } from 'src/utils/coreClient'

const Home = () => {
  const snack = useSnackbar()

  const [values, setValues] = useState({
    idGaransi: '',
    loading: false
  })

  const [garansi, setGaransi] = useState({
    status: null,
    riwayat: null
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleCekGaransi = async () => {
    if (!values.idGaransi) return

    const util = new coreClient()

    const data = await Promise.all([util.getGaransi(values.idGaransi), util.getKlaimGaransi(values.idGaransi)])

    if (!data[0][0] || !data[1][0]) {
      setGaransi({ status: null, riwayat: null })
    } else {
      setGaransi({ status: data[0][0], riwayat: data[1][0] })
    }
  }

  const disablesClaim = () => {
    if (!garansi.riwayat) return false

    if (garansi.riwayat.length === 0) return false

    const onProgress = garansi.riwayat.some(row => {
      return row.status === 'Dalam proses pengecekan' || row.status === 'Menunggu pengecekan'
    })

    return onProgress
  }

  console.log(garansi)

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
              disabled={values.loading}
              value={values.idGaransi}
              onChange={handleChange('idGaransi')}
              autoFocus
              fullWidth
              label='No. Serial Komponen'
              placeholder='0000000000000000'
              sx={{ marginBottom: 5 }}
            />

            <Button
              disabled={values.loading}
              onClick={handleCekGaransi}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 3 }}
            >
              {values.loading ? 'Mengecek...' : 'Cek Status'}
            </Button>
          </CardContent>
        </Card>

        {garansi.status && garansi.status.length > 0 && (
          <Card sx={{ mt: 5, zIndex: 1 }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(7, 7, 7)} !important` }}>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Status Garansi
                </Typography>
              </Box>
              <Box>
                <StatusGaransiTable data={garansi.status} />
              </Box>

              {!isYesterday(garansi.status[0].tanggal_akhir) && (
                <Button
                  disabled={disablesClaim()}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{ marginBottom: 3, mt: 7 }}
                >
                  Klaim Garansi
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {garansi.riwayat && garansi.riwayat.length > 0 && (
          <Card sx={{ mt: 5, zIndex: 1 }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(7, 7, 7)} !important` }}>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Riwayat Klaim Garansi
                </Typography>
              </Box>
              <Box>
                <RiwayatGaransiTable />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>

      <FooterIllustrationsV1 />
    </>
  )
}
Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home
