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
import { isDate, endOfDay, startOfDay, subSeconds } from 'date-fns'
import { useSnackbar } from 'notistack'

import 'react-datepicker/dist/react-datepicker.css'

import { useKlaim } from 'src/hooks/useKlaim'
import { exportFile } from 'src/lib/excel'
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

const ExportDataGaransi = ({ open }) => {
  const snack = useSnackbar()
  const { data } = useKlaim()
  const { closeModal } = useModal()

  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
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

    setValues({ startDate: '', endDate: '' })
    closeModal()
  }

  const handleExport = async () => {
    if (!values.startDate || !values.endDate) return

    const startDate = startOfDay(new Date(values.startDate))
    const endDate = endOfDay(new Date(values.endDate))

    const filteredData = data.filter(row => row.tanggal_klaim >= startDate && row.tanggal_klaim <= endDate)

    const rowsData = [
      ['id', 'nama_produk', 'id_garansi', 'no_telepon', 'status', 'keterangan', 'tanggal_klaim', 'tanggal_akhir']
    ]
    filteredData.forEach(row => {
      rowsData.push([
        row.id,
        row.nama_produk,
        row.id_garansi,
        row.no_telepon,
        row.status,
        row.keterangan,
        subSeconds(startOfDay(row.tanggal_klaim), 12),
        subSeconds(startOfDay(row.tanggal_akhir), 12)
      ])
    })

    const [status] = exportFile(rowsData, 'data_klaim_garansi.xlsx')
    if (status) snack.enqueueSnackbar('Export data berhasil', { variant: 'success' })

    handleCloseModal()
  }

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h6' component='h2'>
              Export Data Klaim
            </Typography>

            <Box sx={{ mt: 2 }}>
              <DatePickerWrapper>
                <DatePicker
                  disabled={loading}
                  selected={values.startDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput margin='normal' label='Tanggal Dari' />}
                  onChange={handleChange('startDate')}
                />

                <DatePicker
                  disabled={loading}
                  selected={values.endDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput margin='normal' label='Tanggal Ke' />}
                  onChange={handleChange('endDate')}
                />
              </DatePickerWrapper>
            </Box>

            <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2} marginTop={2}>
              <Button disabled={loading} onClick={handleCloseModal}>
                Batal
              </Button>
              <Button disabled={loading} onClick={handleExport}>
                {loading ? 'Export...' : 'Export'}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ExportDataGaransi
