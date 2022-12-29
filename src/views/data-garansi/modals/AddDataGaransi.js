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

import 'react-datepicker/dist/react-datepicker.css'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
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
  const { closeModal } = useModal()

  const [values, setValues] = useState({
    productName: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: prop === 'productName' ? event.target.value : event })
  }

  const handleCloseModal = () => {
    setValues({ productName: '', startDate: '', endDate: '' })
    closeModal()
  }

  const handleSave = () => {
    if (!values.productName || !values.startDate || !values.endDate) return

    console.log(values)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        maxWidth='xs'
        fullWidth
        disableEnforceFocus
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h6' component='h2'>
              Tambah Data Garansi
            </Typography>

            <Box sx={{ mt: 2 }}>
              <TextField
                margin='normal'
                onChange={handleChange('productName')}
                value={values.productName}
                label='Nama Produk'
                placeholder='RTX 3050 TI'
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

export default AddDataGaransi
