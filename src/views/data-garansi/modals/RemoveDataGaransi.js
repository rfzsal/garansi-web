import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'

import { useGaransi } from 'src/hooks/useGaransi'
import { useModal } from 'src/hooks/useModal'

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

const RemoveDataGaransiModal = ({ open }) => {
  const snack = useSnackbar()
  const { removeData, removeBulkData } = useGaransi()
  const { closeModal, modalOpened } = useModal()

  const [loading, setLoading] = useState(false)

  const handleCloseModal = () => {
    if (loading) return

    closeModal()
  }

  const handleConfirm = async () => {
    setLoading(true)

    let isError
    if (typeof modalOpened === 'string') {
      const [statusRemoveOne, errorRemoveOne] = await removeData(modalOpened)
      if (errorRemoveOne) isError = true
    } else {
      const [statusRemoveBulk, errorRemoveBulk] = await removeBulkData(modalOpened)
      if (errorRemoveBulk) isError = true
    }

    setLoading(false)

    if (isError) return snack.enqueueSnackbar('Hapus data garansi gagal', { variant: 'error' })

    snack.enqueueSnackbar('Hapus data garansi berhasil', { variant: 'success' })
    handleCloseModal()
  }

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h6' component='h2'>
              Hapus Data Garansi?
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant='body1' component='p'>
                Data yang sudah dihapus tidak dapat dikembalikan lagi
              </Typography>
            </Box>

            <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2} marginTop={2}>
              <Button disabled={loading} onClick={handleCloseModal}>
                Batal
              </Button>
              <Button disabled={loading} onClick={handleConfirm}>
                Hapus
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default RemoveDataGaransiModal
