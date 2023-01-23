import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { formatDate } from 'src/lib/date'

import { useModal } from 'src/hooks/useModal'

const ImgStyled = styled('img')(({ theme }) => ({
  height: 240,
  display: 'block',
  margin: '0 auto'
}))

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
    status: '',
    image: ''
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
      status: '',
      image: ''
    })
    closeModal()
  }

  useEffect(() => {
    if (modalOpened.name !== 'DetailDataKlaim') return

    const image = modalOpened.data.gambar
    const bufferImage = Buffer.from(image, 'base64')

    setValues({
      id: modalOpened.data.id,
      name: modalOpened.data.name,
      idGaransi: modalOpened.data.idGaransi,
      klaimDate: formatDate(modalOpened.data.klaimDate),
      endDate: formatDate(modalOpened.data.tanggal_akhir),
      phoneNumber: modalOpened.data.no_telepon,
      detail: modalOpened.data.keterangan,
      status: modalOpened.data.status,
      image: `data:image/png;base64,${bufferImage}`
    })
  }, [modalOpened])

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Detail Klaim Garansi</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField disabled={loading} margin='normal' value={values.id} label='ID Klaim' fullWidth />

            <TextField disabled={loading} multiline margin='normal' value={values.name} label='Nama Produk' fullWidth />

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

            <Box sx={{ p: 4, my: 4, backgroundColor: 'grey.200', borderRadius: 1 }}>
              <ImgStyled alt='gambar' src={values.image} />
            </Box>

            <TextField
              disabled={loading}
              margin='normal'
              value={values.phoneNumber}
              label='Kontak Pengguna'
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={handleCloseModal}>
            Selesai
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DetailKlaimGaransi
