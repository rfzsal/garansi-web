import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'

import { useModal } from 'src/hooks/useModal'
import { coreClient } from 'src/utils/coreClient'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  p: 4,
  borderRadius: 1
}

const KlaimModal = ({ open, onSuccess }) => {
  const snack = useSnackbar()
  const { modalOpened, closeModal } = useModal()

  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    nomor_telepon: '',
    keterangan: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleCloseModal = () => {
    if (loading) return

    setValues({ nomor_telepon: '', keterangan: '' })
    closeModal()
  }

  const handleSave = async () => {
    if (!values.nomor_telepon || !values.keterangan)
      return snack.enqueueSnackbar('Isi semua data dengan benar', { variant: 'warning' })

    const reg = new RegExp('^[0-9]+$')

    if (String(values.nomor_telepon).trim().length < 10)
      return snack.enqueueSnackbar('Isi Nomor Kontak dengan benar', { variant: 'warning' })

    if (String(values.nomor_telepon).trim().length > 15)
      return snack.enqueueSnackbar('Isi Nomor Kontak dengan benar', { variant: 'warning' })

    if (!reg.test(values.nomor_telepon))
      return snack.enqueueSnackbar('Isi Nomor Kontak dengan benar', { variant: 'warning' })

    if (String(values.keterangan).trim().length < 10)
      return snack.enqueueSnackbar('Isi Keterangan dengan jelas dan detail', { variant: 'warning' })

    setLoading(true)

    const util = new coreClient()

    const data = {
      id_garansi: modalOpened.data,
      no_telepon: values.nomor_telepon,
      keterangan: values.keterangan,
      tanggal_klaim: Date.now()
    }
    const [status, error] = await util.addKlaimGaransi(data)
    onSuccess(modalOpened.data)

    setLoading(false)

    if (error) return snack.enqueueSnackbar('Klaim garansi gagal', { variant: 'error' })

    snack.enqueueSnackbar('Klaim garansi berhasil', { variant: 'success' })
    handleCloseModal()
  }

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h6' component='h2'>
              Klaim Garansi
            </Typography>

            <Typography variant='body2' component='p'>
              Pastikan isi Nomor Kotak dengan benar!
            </Typography>

            <Box sx={{ mt: 2 }}>
              <TextField
                disabled
                margin='normal'
                value={modalOpened.data || ''}
                label='No. Seri'
                placeholder='0000000000000000'
                fullWidth
              />

              <TextField
                disabled={loading}
                margin='normal'
                onChange={handleChange('nomor_telepon')}
                value={values.nomor_telepon}
                label='Nomor Kontak'
                placeholder='081234567890'
                fullWidth
              />

              <TextField
                disabled={loading}
                margin='normal'
                onChange={handleChange('keterangan')}
                value={values.keterangan}
                label='Keterangan'
                placeholder='Detail kerusakan komponen'
                fullWidth
                multiline
              />
            </Box>

            <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2} marginTop={2}>
              <Button disabled={loading} onClick={handleCloseModal}>
                Batal
              </Button>
              <Button disabled={loading} onClick={handleSave}>
                {loading ? 'Menyimpan...' : 'Klaim'}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default KlaimModal
