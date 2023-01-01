import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { formatDate } from 'src/lib/date'

import { useModal } from 'src/hooks/useModal'

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
