import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { useSnackbar } from 'notistack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import { formatDate } from 'src/lib/date'

import { useModal } from 'src/hooks/useModal'
import { useKlaim } from 'src/hooks/useKlaim'

const ImgStyled = styled('img')(({ theme }) => ({
  width: '50%',
  display: 'block',
  margin: '0 auto'
}))

const DetailKlaimGaransi = ({ open }) => {
  const snack = useSnackbar()
  const { updateStatus } = useKlaim()
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
    image: '',
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
      image: '',
      responseStatus: '',
      responseDetail: ''
    })
    closeModal()
  }

  const handleSave = async () => {
    if (!values.responseStatus || !values.responseDetail)
      return snack.enqueueSnackbar('Isi semua respon klaim dengan benar', { variant: 'warning' })

    if (String(values.responseDetail).trim().length < 10)
      return snack.enqueueSnackbar('Isi Keterangan dengan jelas dan detail', { variant: 'warning' })

    setLoading(true)

    const [status, error] = await updateStatus(modalOpened.data.id, {
      status: values.responseStatus,
      details: values.responseDetail,
      date: Date.now()
    })
    if (error) return snack.enqueueSnackbar('Terjadi kesalahan', { variant: 'error' })

    setLoading(false)

    snack.enqueueSnackbar('Simpan status klaim berhasil', { variant: 'success' })
    handleCloseModal()
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
      image: `data:image/png;base64,${bufferImage}`,
      responseStatus: '',
      responseDetail: ''
    })
  }, [modalOpened])

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Detail Klaim Garansi</DialogTitle>

        <DialogContent>
          <TextField disabled={loading} margin='normal' value={values.id} label='ID Klaim' fullWidth />

          <TextField disabled={loading} multiline margin='normal' value={values.name} label='Nama Produk' fullWidth />

          <TextField disabled={loading} margin='normal' value={values.idGaransi} label='No. Seri' fullWidth />

          <TextField disabled={loading} margin='normal' value={values.klaimDate} label='Tanggal Klaim' fullWidth />

          <TextField disabled={loading} margin='normal' value={values.endDate} label='Tanggal Akhir' fullWidth />

          <TextField disabled={loading} margin='normal' value={values.status} label='Status' fullWidth />

          <TextField disabled={loading} margin='normal' value={values.detail} label='Keterangan' multiline fullWidth />

          <Box sx={{ p: 4, my: 4, backgroundColor: 'grey.200', borderRadius: 1 }}>
            <ImgStyled alt='gambar' src={values.image} />
          </Box>

          <TextField disabled={loading} margin='normal' value={values.phoneNumber} label='Kontak Pengguna' fullWidth />

          {!values.status.includes('ditolak') && !values.status.includes('diterima') && (
            <>
              <Box sx={{ mb: 5 }}>
                <Divider>Respon Klaim</Divider>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Tindakan</InputLabel>
                <Select
                  disabled={loading}
                  value={values.responseStatus}
                  label='Tindakan'
                  onChange={handleChange('responseStatus')}
                >
                  <MenuItem value='Klaim diterima'>Terima Klaim</MenuItem>
                  <MenuItem value='Klaim ditolak'>Tolak Klaim</MenuItem>
                </Select>
              </FormControl>

              <TextField
                disabled={loading}
                values={values.responseDetail}
                margin='normal'
                label='Keterangan'
                multiline
                fullWidth
                onChange={handleChange('responseDetail')}
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={handleCloseModal}>
            Batal
          </Button>
          <Button disabled={loading} onClick={handleSave}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DetailKlaimGaransi
