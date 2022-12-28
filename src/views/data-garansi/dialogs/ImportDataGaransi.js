import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import Link from '@mui/material/Link'

import Import from 'mdi-material-ui/Import'

import { useDialog } from 'src/hooks/useDialog'
import { readFile } from 'src/lib/excel'

const ImportDataGaransi = ({ open }) => {
  const { closeDialog } = useDialog()
  const [file, setFile] = useState(null)

  const inputRef = useRef(null)

  const clickFileInput = () => {
    inputRef.current.click()
  }

  const handleChangeFile = event => {
    setFile(event.target.files[0])
  }

  const handleImport = async () => {
    if (!file) return

    const [data, error] = await readFile(file)
    console.log(data || error)
  }

  return (
    <>
      <Dialog open={open} maxWidth='xs' fullWidth>
        <DialogTitle>Import Data Garansi</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Template import bisa diunduh <Link href='#'>disini</Link>
          </DialogContentText>

          <Box sx={{ mt: 2 }}>
            <Box sx={visuallyHidden}>
              <input type='file' ref={inputRef} accept='.xlsx, .xls' onChange={handleChangeFile} />
            </Box>

            <Button onClick={clickFileInput} variant='outlined' fullWidth startIcon={file ? null : <Import />}>
              {file ? file.name : 'Import Data'}
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Batal</Button>
          <Button onClick={handleImport}>Import</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ImportDataGaransi
