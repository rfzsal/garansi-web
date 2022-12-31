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

const KlaimConfirmation = ({ open }) => {
  const snack = useSnackbar()
  const { closeModal, modalOpened } = useModal()

  const [loading, setLoading] = useState(false)

  const idGaransi = useRef(modalOpened.data?.idGaransi)

  const handleCloseModal = () => {
    if (loading) return

    closeModal()
  }

  const handleSave = async () => {}

  useEffect(() => {
    if (modalOpened.name !== 'KlaimConfirmation') return

    idGaransi.current = modalOpened.data.id
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
                    {idGaransi.current}
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
