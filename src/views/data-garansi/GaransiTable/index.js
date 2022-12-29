import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import Delete from 'mdi-material-ui/Delete'
import Pencil from 'mdi-material-ui/Pencil'

import { formatDate } from 'src/lib/date'
import { useModal } from 'src/hooks/useModal'
import { useGaransi } from 'src/hooks/useGaransi'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import RemoveDataGaransiModal from '../modals/RemoveDataGaransi'

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Nama Produk'
  },
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'No. Seri'
  },
  {
    id: 'startDate',
    align: 'center',
    disablePadding: false,
    label: 'Tanggal Mulai'
  },
  {
    id: 'endDate',
    align: 'center',
    disablePadding: false,
    label: 'Tanggal Akhir'
  },
  {
    id: 'action',
    align: 'right',
    disablePadding: false,
    label: 'Aksi'
  }
]

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const createData = (id, name, startDate, endDate) => {
  return {
    id,
    name,
    startDate,
    endDate
  }
}

const GaransiTable = () => {
  const { data } = useGaransi()
  const { modalOpened, openModal } = useModal()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const rows = data.map(row => {
    return createData(row.id, row.nama_produk, row.tanggal_mulai, row.tanggal_akhir)
  })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.id)
      setSelected(newSelected)

      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenDeleteModal = id => () => {
    openModal(id)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  useEffect(() => {
    setSelected([])
  }, [data])

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <EnhancedTableToolbar selected={selected} />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {rows
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)

                  return (
                    <TableRow hover tabIndex={-1} key={row.id} selected={isItemSelected}>
                      <TableCell onClick={event => handleClick(event, row.id)} padding='checkbox'>
                        <Checkbox color='primary' checked={isItemSelected} sx={{ ml: -3 }} />
                      </TableCell>
                      <TableCell component='th' scope='row' padding='none'>
                        {row.name}
                      </TableCell>
                      <TableCell align='left'>{row.id}</TableCell>
                      <TableCell align='center'>{formatDate(row.startDate)}</TableCell>
                      <TableCell align='center'>{formatDate(row.endDate)}</TableCell>
                      <TableCell align='right'>
                        <Box sx={{ mr: -2 }}>
                          <Tooltip title='Ubah'>
                            <IconButton>
                              <Pencil />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title='Hapus'>
                            <IconButton disabled={selected.length > 0} onClick={handleOpenDeleteModal(row.id)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}

              {rows.length === 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell align='center' colSpan={6}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <RemoveDataGaransiModal open={rows.some(row => row.id === modalOpened) || false} />
      <RemoveDataGaransiModal open={modalOpened.length === selected.length} />
    </>
  )
}

export default GaransiTable
