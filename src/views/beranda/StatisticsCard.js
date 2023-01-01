import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import CheckboxOutline from 'mdi-material-ui/CheckboxOutline'
import ChartBar from 'mdi-material-ui/ChartBar'

import { useKlaim } from 'src/hooks/useKlaim'

const renderStats = data => {
  return data.map((item, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  const { data } = useKlaim()

  const statsValue = {
    complete: 0,
    onProgress: 0
  }

  data.forEach(row => {
    if (row.status === 'Klaim ditolak' || row.status === 'Klaim diterima') {
      statsValue.complete++
    } else {
      statsValue.onProgress++
    }
  })

  const salesData = [
    {
      stats: statsValue.complete,
      title: 'Sudah Diproses',
      color: 'success',
      icon: <CheckboxOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: statsValue.onProgress,
      color: 'warning',
      title: 'Belum Diproses',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: statsValue.complete + statsValue.onProgress,
      color: 'info',
      title: 'Total Keseluruhan',
      icon: <ChartBar sx={{ fontSize: '1.75rem' }} />
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Cek Garansi'
        subheader={<Typography variant='body2'>Total klaim garansi bulan ini 🚀</Typography>}
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />

      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(salesData)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
