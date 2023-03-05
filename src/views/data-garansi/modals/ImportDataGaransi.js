import { useRef, useState } from 'react'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'

import Import from 'mdi-material-ui/Import'

import { useModal } from 'src/hooks/useModal'
import { exportFile, readFile } from 'src/lib/excel'
import { useGaransi } from 'src/hooks/useGaransi'

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

const ImportDataGaransi = ({ open }) => {
  const snack = useSnackbar()
  const { importData } = useGaransi()
  const { closeModal } = useModal()
  const [file, setFile] = useState(null)

  const [loading, setLoading] = useState(false)

  const inputRef = useRef(null)

  const clickFileInput = () => {
    inputRef.current.click()
  }

  const handleChangeFile = event => {
    setFile(event.target.files[0])
  }

  const handleImport = async () => {
    if (!file) return

    setLoading(true)

    const [data] = await readFile(file)

    let dateError = false
    if (data) {
      data.forEach(row => {
        if (row.tanggal_mulai >= row.tanggal_akhir) {
          if (dateError) return
          dateError = row.id
        }
      })
    }

    if (dateError) {
      setLoading(false)

      return snack.enqueueSnackbar(`Tanggal Mulai harus sebelum Tanggal Akhir (ID ${dateError})`, {
        variant: 'warning'
      })
    }

    const [status, error] = await importData(data)

    setLoading(false)

    if (error) return snack.enqueueSnackbar('Import data garansi gagal', { variant: 'error' })

    snack.enqueueSnackbar('Import data garansi berhasil', { variant: 'success' })
    handleCloseModal()
  }

  const handleGetTemplate = event => {
    event.preventDefault()

    if (loading) return

    const rowsData = [['id', 'nama_produk', 'tanggal_mulai', 'tanggal_akhir']]
    rowsData.push([1, 'RTX 3050', new Date(2023, 0, 1, 0, 0, -12, 0), new Date(2025, 0, 1, 0, 0, -12, 0)])

    exportFile(rowsData, 'template_data_garansi.xlsx')
  }

  const handleCloseModal = () => {
    if (loading) return

    setFile(null)
    closeModal()
  }

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h6' component='h2'>
              Import Data Garansi
            </Typography>

            <Typography variant='body2' component='p' marginTop={4} marginBottom={2}>
              Template import bisa diunduh{' '}
              <Link onClick={handleGetTemplate} href='#'>
                disini
              </Link>
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={visuallyHidden}>
                <input disabled={loading} type='file' ref={inputRef} accept='.xlsx, .xls' onChange={handleChangeFile} />
              </Box>

              <Button
                disabled={loading}
                onClick={clickFileInput}
                variant='outlined'
                fullWidth
                startIcon={file ? null : <Import />}
              >
                {file ? file.name : 'Import Data'}
              </Button>
            </Box>

            <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2} marginTop={4}>
              <Button disabled={loading} onClick={handleCloseModal}>
                Batal
              </Button>
              <Button disabled={loading} onClick={handleImport}>
                {loading ? 'Menyimpan...' : 'Import'}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ImportDataGaransi
