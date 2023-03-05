import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/home/FooterIllustration'
import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { isBefore, endOfDay, startOfDay } from 'date-fns'
import { useSnackbar } from 'notistack'

import StatusGaransiTable from 'src/views/klaim-garansi/StatusGaransiTable'
import RiwayatGaransiTable from 'src/views/klaim-garansi/RiwayatGaransiTable'
import { coreClient } from 'src/utils/coreClient'
import { useModal } from 'src/hooks/useModal'
import KlaimModal from 'src/views/klaim-garansi/modals/KlaimModal'

const ImgStyled = styled('img')(({ theme }) => ({
  width: '50%',
  display: 'block',
  margin: '0 auto'
}))

const Home = () => {
  const snack = useSnackbar()

  const { modalOpened, openModal } = useModal()

  const [values, setValues] = useState({
    idGaransi: '',
    loading: false
  })

  const [garansi, setGaransi] = useState({
    status: null,
    riwayat: null
  })

  const [refreshing, setRefreshing] = useState(false)

  const handleSuccessKlaim = async id => {
    const util = new coreClient()

    setValues({ ...values, loading: true })
    const data = await Promise.all([util.getGaransi(id), util.getKlaimGaransi(id)])
    setValues({ ...values, loading: false })

    if (!data[0][0] || !data[1][0]) {
      setGaransi({ status: null, riwayat: null })
    } else {
      setGaransi({ status: data[0][0], riwayat: data[1][0] })
    }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleCekGaransi = async () => {
    if (!values.idGaransi) return

    const util = new coreClient()

    setValues({ ...values, loading: true })
    const data = await Promise.all([util.getGaransi(values.idGaransi), util.getKlaimGaransi(values.idGaransi)])
    setValues({ ...values, loading: false })

    if (data[0][0]?.length === 0 || !data[1][0]?.length === 0) {
      setGaransi({ status: null, riwayat: null })
      snack.enqueueSnackbar('Data garansi tidak ditemukan', { variant: 'warning' })
    } else {
      setGaransi({ status: data[0][0], riwayat: data[1][0] })
    }
  }

  const handleKlaimGaransi = async () => {
    if (values.loading) return

    openModal({ name: 'KlaimModal', data: garansi.status[0].id })
  }

  const disablesClaim = () => {
    if (values.loading) return true

    if (!garansi.riwayat) return false

    if (garansi.riwayat.length === 0) return false

    const onProgress = garansi.riwayat.some(row => {
      return row.status === 'Dalam proses pengecekan' || row.status === 'Menunggu pengecekan'
    })

    return onProgress
  }

  useEffect(() => {
    if (refreshing) return
    if (!garansi.status) return
    if (garansi.status.length === 0) return

    if (garansi.riwayat) {
      const onProgress = garansi.riwayat.some(row => {
        return row.status === 'Dalam proses pengecekan' || row.status === 'Menunggu pengecekan'
      })

      if (!onProgress) return
    }

    const refresh = async () => {
      const util = new coreClient()

      const data = await Promise.all([
        util.getGaransi(garansi.status[0].id),
        util.getKlaimGaransi(garansi.status[0].id)
      ])

      if (!data[0][0] || !data[1][0]) {
        return
      } else {
        setGaransi({ status: data[0][0], riwayat: data[1][0] })
      }
    }

    const loop = setInterval(() => refresh(), 15000)

    return () => clearInterval(loop)
  }, [refreshing, garansi.status, garansi.riwayat])

  return (
    <>
      <Container maxWidth='md' sx={{ py: 10 }}>
        <Box sx={{ mb: 6 }}>
          <Avatar alt='Cahaya Distribusi' src='/images/logo.png' sx={{ width: 128, height: 128, mx: 'auto' }} />
        </Box>

        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7, 7, 0)} !important` }}>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                PT CAHAYA DISTRIBUSI
              </Typography>
              <Typography variant='body1'>Kontak Distributor</Typography>
              <Typography variant='body2' mb={2}>
                (021) 62318113
              </Typography>

              <Typography variant='body1'>Facebook</Typography>
              <Typography variant='body2' mb={2}>
                <a
                  href='https://web.facebook.com/cahaya.distribusi/?locale=id_ID&_rdc=1&_rdr'
                  target='_blank'
                  rel='noreferrer'
                >
                  PT. Cahaya Distribusi Nusantara
                </a>
              </Typography>

              <Typography variant='body1'>Instagram</Typography>
              <Typography variant='body2' mb={2}>
                <a href='https://www.instagram.com/cahaya_distribusi/?hl=en' target='_blank' rel='noreferrer'>
                  @cahaya_distribusi
                </a>
              </Typography>

              <Typography variant='body1'>Alamat Distributor </Typography>
              <Typography variant='body2'>
                <a
                  href='https://www.google.com/maps/place/PT.Cahaya+Distribusi+Nusantara/@-6.1372922,106.8234937,15z/data=!4m6!3m5!1s0x2e69f5ff32c2eefd:0xf8ea7614c4960d77!8m2!3d-6.1372922!4d106.8234937!16s%2Fg%2F11h9rdvswt'
                  target='_blank'
                  rel='noreferrer'
                >
                  Mangga Dua Mall Ruko No. 29. Jalan Arteri, Jl Mangga Dua Raya, RT 1 Rw 12, Ancol, Sawah Besar, Jakarta
                  Pusat
                </a>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mt: 5, zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7, 7, 7)} !important` }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Cek Status Garansi 🔎
              </Typography>
              <Typography variant='body2'>Cek status garansi dengan nomor komponen. Contoh:</Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <ImgStyled alt='gambar' src='https://i.postimg.cc/xj6mvDQ2/f5e60455-ca4c-43f6-9952-c2c8eeb3586b.png' />
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

              {!isBefore(endOfDay(garansi.status[0].tanggal_akhir * 1000), startOfDay(Date.now())) && (
                <Button
                  disabled={disablesClaim()}
                  onClick={handleKlaimGaransi}
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
                <RiwayatGaransiTable data={garansi.riwayat} />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>

      <FooterIllustrationsV1 />
      <KlaimModal open={modalOpened.name === 'KlaimModal'} onSuccess={handleSuccessKlaim} />
    </>
  )
}
Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home
