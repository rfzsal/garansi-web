import { useState, forwardRef } from 'react'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DatePicker from 'react-datepicker'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { isDate } from 'date-fns'
import { useSnackbar } from 'notistack'

import 'react-datepicker/dist/react-datepicker.css'

import { formatDate } from 'src/lib/date'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
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

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const AddDataGaransi = ({ open }) => {
  const snack = useSnackbar()
  const { addData } = useGaransi()
  const { closeModal } = useModal()

  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    productId: '',
    productName: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = prop => event => {
    if (isDate(event)) {
      setValues({ ...values, [prop]: event })
    } else {
      setValues({ ...values, [prop]: event.target.value })
    }
  }

  const handleCloseModal = () => {
    if (loading) return

    setValues({ productId: '', productName: '', startDate: '', endDate: '' })
    closeModal()
  }

  const handleSave = async () => {
    if (!values.productId || !values.productName || !values.startDate || !values.endDate) return

    setLoading(true)

    const [status, error] = await addData({
      id: values.productId,
      nama_produk: values.productName,
      tanggal_mulai: formatDate(values.startDate.getTime(), 'yyyy/MM/dd'),
      tanggal_akhir: formatDate(values.endDate.getTime(), 'yyyy/MM/dd')
    })

    setLoading(false)

    if (error) return snack.enqueueSnackbar('Tambah data garansi gagal', { variant: 'error' })

    snack.enqueueSnackbar('Tambah data garansi berhasil', { variant: 'success' })
    handleCloseModal()
  }

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h6' component='h2'>
              Tambah Data Garansi
            </Typography>

            <Box sx={{ mt: 2 }}>
              <TextField
                disabled={loading}
                margin='normal'
                onChange={handleChange('productName')}
                value={values.productName}
                label='Nama Produk'
                placeholder='RTX 3050 TI'
                fullWidth
              />

              <TextField
                disabled={loading}
                margin='normal'
                onChange={handleChange('productId')}
                value={values.productId}
                label='No. Seri'
                placeholder='000000000'
                fullWidth
              />

              <DatePickerWrapper>
                <DatePicker
                  disabled={loading}
                  selected={values.startDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput margin='normal' label='Tanggal Mulai' />}
                  onChange={handleChange('startDate')}
                />

                <DatePicker
                  disabled={loading}
                  selected={values.endDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput margin='normal' label='Tanggal Akhir' />}
                  onChange={handleChange('endDate')}
                />
              </DatePickerWrapper>
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

export default AddDataGaransi
