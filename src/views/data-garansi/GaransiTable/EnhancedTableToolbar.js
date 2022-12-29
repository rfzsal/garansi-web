import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import { useModal } from 'src/hooks/useModal'
import Delete from 'mdi-material-ui/Delete'

const EnhancedTableToolbar = props => {
  const { openModal } = useModal()
  const { selected } = props

  const handleOpenDeleteModal = () => {
    openModal(selected)
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
      {selected.length > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {selected.length} terpilih
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' component='div'>
          Data Garansi
        </Typography>
      )}

      {selected.length > 0 && (
        <Tooltip title='Hapus'>
          <IconButton onClick={handleOpenDeleteModal}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default EnhancedTableToolbar
