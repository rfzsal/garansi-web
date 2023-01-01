import { useState, useEffect, useRef } from 'react'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'

import { useModal } from 'src/hooks/useModal'
import { useKlaim } from 'src/hooks/useKlaim'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 400,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  outline: 'none',
  borderRadius: 1,
  p: 4
}

const KlaimConfirmation = ({ open }) => {
  const snack = useSnackbar()
  const { updateStatus } = useKlaim()
  const { openModal, closeModal, modalOpened } = useModal()

  const [loading, setLoading] = useState(false)

  const idGaransi = useRef(modalOpened.data?.idGaransi)

  const handleCloseModal = () => {
    if (loading) return

    closeModal()
  }

  const handleSave = async () => {
    setLoading(true)

    const [status, error] = await updateStatus(modalOpened.data.id, { status: 'Dalam proses pengecekan' })
    if (error) return snack.enqueueSnackbar('Terjadi kesalahan', { variant: 'error' })

    setLoading(false)

    openModal({ name: 'DetailDataKlaim', data: { ...modalOpened.data, status: 'Dalam proses pengecekan' } })
  }

  useEffect(() => {
    if (modalOpened.name !== 'KlaimConfirmation') return

    idGaransi.current = modalOpened.data.idGaransi
  }, [modalOpened])

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={open}>
          <Box sx={style}>
            <Box>
              <Typography variant='h6' component='h2'>
                Produk Sudah Diterima?
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant='body1' component='p'>
                  Pastikan produk dengan no. seri{' '}
                  <Typography variant='body1' component='span' sx={{ fontWeight: 'bold' }}>
                    {modalOpened.data?.idGaransi || idGaransi.current}
                  </Typography>{' '}
                  sudah diterima.
                </Typography>
              </Box>

              <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2} marginTop={2}>
                <Button disabled={loading} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button disabled={loading} onClick={handleSave}>
                  {loading ? 'Menyimpan...' : 'Sudah Diterima'}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default KlaimConfirmation
