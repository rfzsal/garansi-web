import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { visuallyHidden } from '@mui/utils'

const EnhancedTableToolbar = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { selected, onSearch } = props

  const [searchValue, setSearchValue] = useState('')

  const handleSearch = event => {
    setSearchValue(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <Toolbar
      sx={{
        pl: { xs: 5 },
        pr: { xs: 3 },
        ...(selected.length > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {selected.length > 0 && (
        <>
          <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
            {selected.length} terpilih
          </Typography>
        </>
      )}

      <Grid container spacing={2} sx={selected.length > 0 ? visuallyHidden : null}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' component='div' marginTop={isSmall ? 4 : 0}>
            Data Klaim Garansi
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField value={searchValue} onChange={handleSearch} fullWidth size='small' />
        </Grid>
      </Grid>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSearch: PropTypes.func.isRequired
}

export default EnhancedTableToolbar
