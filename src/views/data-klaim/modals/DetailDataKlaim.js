import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useModal } from 'src/hooks/useModal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  maxHeight: 600,
  overflow: 'scroll',
  bgcolor: 'background.paper',
  outline: 'none',
  borderRadius: 1,
  p: 4
}

const DetailKlaimGaransi = ({ open }) => {
  const snack = useSnackbar()
  const { closeModal, modalOpened } = useModal()

  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    id: '',
    name: '',
    idGaransi: '',
    klaimDate: '',
    endDate: '',
    phoneNumber: '',
    detail: '',
    status: '',
    responseStatus: '',
    responseDetail: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleCloseModal = () => {
    if (loading) return

    setValues({
      id: '',
      name: '',
      idGaransi: '',
      klaimDate: '',
      endDate: '',
      phoneNumber: '',
      detail: '',
      status: '',
      responseStatus: '',
      responseDetail: ''
    })
    closeModal()
  }

  const handleSave = async () => {}

  useEffect(() => {
    if (modalOpened.name !== 'DetailDataKlaim') return

    setValues({
      id: modalOpened.data.id,
      name: modalOpened.data.name,
      idGaransi: modalOpened.data.idGaransi,
      klaimDate: modalOpened.data.klaimDate,
      endDate: modalOpened.data.tanggal_akhir,
      phoneNumber: modalOpened.data.no_telepon,
      detail: modalOpened.data.keterangan,
      status: modalOpened.data.status,
      responseStatus: '',
      responseDetail: ''
    })
  }, [modalOpened])

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h6' component='h2'>
              Detail Klaim Garansi
            </Typography>

            <Box sx={{ mt: 2 }}>
              <TextField margin='normal' value={values.id} label='ID Klaim' fullWidth />

              <TextField multiline margin='normal' value={values.name} label='Nama Produk' fullWidth />

              <TextField margin='normal' value={values.idGaransi} label='No. Seri' fullWidth />

              <TextField margin='normal' value={values.klaimDate} label='Tanggal Klaim' fullWidth />

              <TextField margin='normal' value={values.endDate} label='Tanggal Akhir' fullWidth />

              <TextField margin='normal' value={values.status} label='Status' fullWidth />

              <TextField margin='normal' value={values.detail} label='Keterangan' multiline fullWidth />

              <TextField margin='normal' value={values.phoneNumber} label='Kontak Pengguna' fullWidth />

              <Box sx={{ mb: 5 }}>
                <Divider>Respon Klaim</Divider>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Tindakan</InputLabel>
                <Select value={values.responseStatus} label='Tindakan' onChange={handleChange('responseStatus')}>
                  <MenuItem value='Terima'>Terima Klaim</MenuItem>
                  <MenuItem value='Tolak'>Tolak Klaim</MenuItem>
                </Select>
              </FormControl>

              <TextField
                values={values.responseDetail}
                margin='normal'
                label='Keterangan'
                multiline
                fullWidth
                onChange={handleChange('responseDetail')}
              />
            </Box>

            <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2} marginTop={2}>
              <Button disabled={loading} onClick={handleCloseModal}>
                Batal
              </Button>
              <Button disabled={loading} onClick={handleSave}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default DetailKlaimGaransi
