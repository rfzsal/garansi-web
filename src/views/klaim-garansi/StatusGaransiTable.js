import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { isYesterday } from 'date-fns'

import { formatDate } from 'src/lib/date'

const createData = (id, name, startDate, endDate) => {
  return {
    id,
    name,
    startDate,
    endDate
  }
}

const StatusGaransiTable = ({ data }) => {
  const rows = data.map(row => createData(row.id, row.nama_produk, row.tanggal_mulai * 1000, row.tanggal_akhir * 1000))

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>No. Seri</TableCell>
            <TableCell>Nama Produk</TableCell>
            <TableCell align='center'>Tanggal Mulai</TableCell>
            <TableCell align='center'>Tanggal Akhir</TableCell>
            <TableCell align='center'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align='center'>{formatDate(row.startDate)}</TableCell>
              <TableCell align='center'>{formatDate(row.endDate)}</TableCell>
              <TableCell align='center'>{isYesterday(row.endDate) ? 'Kadaluarsa' : 'Aktif'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StatusGaransiTable
