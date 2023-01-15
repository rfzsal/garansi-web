import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import { formatDate } from 'src/lib/date'

const createData = (id, name, status, details, dateClaim) => {
  return { id, name, status, details, dateClaim }
}

const RiwayatGaransiTable = ({ data }) => {
  const rows = data.map(row =>
    createData(row.id, row.nama_produk, row.status, row.keterangan, row.tanggal_klaim * 1000)
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow sx={{ whiteSpace: 'nowrap' }}>
            <TableCell>ID Klaim</TableCell>
            <TableCell>Nama Produk</TableCell>
            <TableCell>Keterangan</TableCell>
            <TableCell align='center'>Tanggal Klaim</TableCell>
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
                },
                whiteSpace: 'nowrap'
              }}
            >
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.details}</TableCell>
              <TableCell align='center'>{formatDate(row.dateClaim)}</TableCell>
              <TableCell align='center'>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RiwayatGaransiTable
