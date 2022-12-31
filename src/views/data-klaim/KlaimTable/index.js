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

import Magnify from 'mdi-material-ui/Magnify'

import { formatDate } from 'src/lib/date'
import { useKlaim } from 'src/hooks/useKlaim'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: true,
    label: 'No. Klaim'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nama Produk'
  },
  {
    id: 'idGaransi',
    align: 'left',
    disablePadding: false,
    label: 'No. Seri'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status Klaim'
  },
  {
    id: 'klaimDate',
    align: 'center',
    disablePadding: false,
    label: 'Waktu Klaim'
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

const createData = (id, name, idGaransi, status, klaimDate) => {
  return {
    id,
    name,
    idGaransi,
    status,
    klaimDate
  }
}

const KlaimTable = () => {
  const { data } = useKlaim()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('klaimDate')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [filteredRow, setFilteredRow] = useState([])

  const rows = filteredRow.map(row => {
    return createData(row.id, row.nama_produk, row.id_garansi, row.status, row.tanggal_klaim)
  })

  const currentVisibleRow = rows
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleSearch = keyword => {
    if (keyword.trim() === '') return setFilteredRow(data)

    const newFilteredRow = data.filter(row => row.id.indexOf(keyword) !== -1)

    setFilteredRow(newFilteredRow)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = currentVisibleRow.map(n => n.id)
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
    setSelected([])
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setSelected([])
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  useEffect(() => {
    setFilteredRow(data)
  }, [data])

  useEffect(() => {
    setSelected([])
  }, [data])

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <EnhancedTableToolbar selected={selected} onSearch={handleSearch} />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={currentVisibleRow.length}
            />

            <TableBody>
              {currentVisibleRow.map((row, index) => {
                const isItemSelected = isSelected(row.id)

                return (
                  <TableRow hover tabIndex={-1} key={row.id} selected={isItemSelected}>
                    <TableCell onClick={event => handleClick(event, row.id)} padding='checkbox'>
                      <Checkbox color='primary' checked={isItemSelected} sx={{ ml: -3 }} />
                    </TableCell>
                    <TableCell component='th' scope='row' padding='none'>
                      {row.id}
                    </TableCell>
                    <TableCell align='left'>{row.name}</TableCell>
                    <TableCell align='left'>{row.idGaransi}</TableCell>
                    <TableCell align='left'>{row.status}</TableCell>
                    <TableCell align='center'>{formatDate(row.klaimDate)}</TableCell>
                    <TableCell align='right'>
                      <Box sx={{ mr: -2 }}>
                        <Tooltip title='Detail'>
                          <IconButton disabled={selected.length > 0}>
                            <Magnify />
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
    </>
  )
}

export default KlaimTable
