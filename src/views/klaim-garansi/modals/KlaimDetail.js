import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import CircularProgress from '@mui/material/CircularProgress'
import { useSnackbar } from 'notistack'

import { formatDate } from 'src/lib/date'
import { useModal } from 'src/hooks/useModal'
import { coreClient } from 'src/utils/coreClient'

const Dot = ({ withConnector, color, status, date }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent color='textSecondary'>{date}</TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color={color || 'secondary'} />
        {withConnector && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>{status}</TimelineContent>
    </TimelineItem>
  )
}

const KlaimDetail = ({ open }) => {
  const snack = useSnackbar()
  const { closeModal, modalOpened } = useModal()

  const [riwayat, setRiwayat] = useState(null)

  const handleCloseModal = () => {
    setRiwayat(null)
    closeModal()
  }

  useEffect(() => {
    if (modalOpened.name !== 'KlaimDetail') return
    if (!modalOpened.data) return

    const getData = async () => {
      const util = new coreClient()

      const [data, error] = await util.getRiwayatKlaim(modalOpened.data)
      if (error) return snack.enqueueSnackbar('Gagal melihat detail riwayat klaim', { variant: 'error' })

      setRiwayat(data)
    }

    getData()

    return () => setRiwayat(null)
  }, [modalOpened, snack])

  return (
    <>
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleCloseModal}>
        <DialogTitle>Detail Klaim Garansi</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {!riwayat && (
              <Box sx={{ display: 'flex', width: '100%' }}>
                <CircularProgress />
              </Box>
            )}

            {riwayat && (
              <Timeline>
                {riwayat.map((row, index) => {
                  const withConnector = index === riwayat.length - 1 ? false : true
                  const status = index === 0 ? row.status : row.keterangan
                  const colorStatus = status === 'Klaim diterima' ? 'success' : 'error'

                  const color = index !== 0 ? 'secondary' : colorStatus

                  if (riwayat.length === 1)
                    return (
                      <Dot
                        key={row.id_klaim + index}
                        color='info'
                        status={status}
                        date={formatDate(row.timestamp * 1000)}
                      />
                    )

                  return (
                    <Dot
                      key={row.id_klaim + index}
                      withConnector={withConnector}
                      color={color}
                      status={status}
                      date={formatDate(row.timestamp * 1000)}
                    />
                  )
                })}
              </Timeline>
            )}

            {riwayat && (
              <>
                <TextField margin='normal' value={riwayat[0].status} label='Status' fullWidth />

                <TextField margin='normal' value={riwayat[0].keterangan} label='Keterangan' fullWidth multiline />

                <Typography sx={{ px: 1, mt: 2 }} variant='body2'>
                  *Kami akan segera menghubungi anda melalui kontak yang diberikan
                </Typography>
                <Typography sx={{ px: 1, mt: 1 }} variant='body2'>
                  **Jika ada kendala silahkan hubungi kami melalui kontak yang tersedia
                </Typography>
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Selesai</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default KlaimDetail
