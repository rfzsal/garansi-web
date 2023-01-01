import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { formatDate } from 'src/lib/date'

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
    status: ''
  })

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
      status: ''
    })
    closeModal()
  }

  useEffect(() => {
    if (modalOpened.name !== 'DetailDataKlaim') return

    setValues({
      id: modalOpened.data.id,
      name: modalOpened.data.name,
      idGaransi: modalOpened.data.idGaransi,
      klaimDate: formatDate(modalOpened.data.klaimDate),
      endDate: formatDate(modalOpened.data.tanggal_akhir),
      phoneNumber: modalOpened.data.no_telepon,
      detail: modalOpened.data.keterangan,
      status: modalOpened.data.status
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
              <TextField disabled={loading} margin='normal' value={values.id} label='ID Klaim' fullWidth />

              <TextField
                disabled={loading}
                multiline
                margin='normal'
                value={values.name}
                label='Nama Produk'
                fullWidth
              />

              <TextField disabled={loading} margin='normal' value={values.idGaransi} label='No. Seri' fullWidth />

              <TextField disabled={loading} margin='normal' value={values.klaimDate} label='Tanggal Klaim' fullWidth />

              <TextField disabled={loading} margin='normal' value={values.endDate} label='Tanggal Akhir' fullWidth />

              <TextField disabled={loading} margin='normal' value={values.status} label='Status' fullWidth />

              <TextField
                disabled={loading}
                margin='normal'
                value={values.detail}
                label='Keterangan'
                multiline
                fullWidth
              />

              <TextField
                disabled={loading}
                margin='normal'
                value={values.phoneNumber}
                label='Kontak Pengguna'
                fullWidth
              />
            </Box>

            <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2} marginTop={2}>
              <Button disabled={loading} onClick={handleCloseModal}>
                Selesai
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default DetailKlaimGaransi
