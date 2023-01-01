import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'

import { useKlaim } from 'src/hooks/useKlaim'

const Trophy = () => {
  const router = useRouter()
  const { data } = useKlaim()

  const activeKlaim = data.filter(row => row.status !== 'Klaim ditolak' && row.status !== 'Klaim diterima')

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Klaim Garansi</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Total klaim garansi yang belum diproses 💻
        </Typography>

        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {activeKlaim.length || 0}
        </Typography>

        <Button onClick={() => router.push('/data-klaim')} size='small' variant='contained'>
          Lihat Klaim Garansi
        </Button>
      </CardContent>
    </Card>
  )
}

export default Trophy
