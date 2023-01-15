import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import Magnify from 'mdi-material-ui/Magnify'

import { formatDate } from 'src/lib/date'
import { useModal } from 'src/hooks/useModal'
import KlaimDetail from './modals/KlaimDetail'

const createData = (id, name, status, dateClaim) => {
  return { id, name, status, dateClaim }
}

const RiwayatGaransiTable = ({ data }) => {
  const { modalOpened, openModal } = useModal()

  const rows = data.map(row => createData(row.id, row.nama_produk, row.status, row.tanggal_klaim * 1000))

  const handleDetailModal = id => () => {
    openModal({ name: 'KlaimDetail', data: id })
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ whiteSpace: 'nowrap' }}>
              <TableCell>ID Klaim</TableCell>
              <TableCell>Nama Produk</TableCell>
              <TableCell align='center'>Tanggal Klaim</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='right'>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  },
                  whiteSpace: 'nowrap'
                }}
              >
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align='center'>{formatDate(row.dateClaim)}</TableCell>
                <TableCell align='center'>{row.status}</TableCell>
                <TableCell align='right'>
                  <Box sx={{ mr: -2 }}>
                    <Tooltip title='Detail'>
                      <IconButton onClick={handleDetailModal(row.id)}>
                        <Magnify />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <KlaimDetail open={modalOpened.name === 'KlaimDetail'} />
    </>
  )
}

export default RiwayatGaransiTable
