import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

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
  const { removeData } = useGaransi()
  const { closeModal, modalOpened } = useModal()

  const handleCloseModal = () => {
    closeModal()
  }

  const handleConfirm = async () => {
    await removeData(modalOpened)
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
              <Button onClick={handleCloseModal}>Batal</Button>
              <Button onClick={handleConfirm}>Hapus</Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default RemoveDataGaransiModal
