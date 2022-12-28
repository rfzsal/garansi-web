import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import Delete from 'mdi-material-ui/Delete'

const EnhancedTableToolbar = props => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { xs: 5 },
        pr: { xs: 3 },
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} terpilih
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' component='div'>
          Data Garansi
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title='Hapus'>
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

export default EnhancedTableToolbar
