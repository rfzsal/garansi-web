import { useState, forwardRef, useEffect } from 'react'
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

const UpdateDataGaransi = ({ open }) => {
  const { editData } = useGaransi()
  const { closeModal, modalOpened } = useModal()

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
    setValues({ productId: '', productName: '', startDate: '', endDate: '' })
    closeModal()
  }

  const handleSave = async () => {
    if (!values.productId || !values.productName || !values.startDate || !values.endDate) return

    await editData(values.productId, {
      nama_produk: values.productName,
      tanggal_mulai: formatDate(new Date(values.startDate).getTime(), 'yyyy/MM/dd'),
      tanggal_akhir: formatDate(new Date(values.endDate).getTime(), 'yyyy/MM/dd')
    })

    handleCloseModal()
  }

  useEffect(() => {
    if (modalOpened.name !== 'UpdateDataGaransi') return

    setValues({
      productId: modalOpened.data.id,
      productName: modalOpened.data.name,
      startDate: modalOpened.data.startDate,
      endDate: modalOpened.data.endDate
    })
  }, [modalOpened])

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h6' component='h2'>
              Ubah Data Garansi
            </Typography>

            <Box sx={{ mt: 2 }}>
              <TextField
                multiline
                margin='normal'
                onChange={handleChange('productName')}
                value={values.productName}
                label='Nama Produk'
                placeholder='RTX 3050 TI'
                fullWidth
              />

              <TextField
                disabled
                margin='normal'
                onChange={handleChange('productId')}
                value={values.productId}
                label='No. Seri'
                placeholder='000000000'
                fullWidth
              />

              <DatePickerWrapper>
                <DatePicker
                  selected={values.startDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput margin='normal' label='Tanggal Mulai' />}
                  onChange={handleChange('startDate')}
                />

                <DatePicker
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
              <Button onClick={handleCloseModal}>Batal</Button>
              <Button onClick={handleSave}>Simpan</Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default UpdateDataGaransi
