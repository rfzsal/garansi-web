import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { coreSession } from 'src/utils/coreSession'

const TabAccount = ({ user }) => {
  const snack = useSnackbar()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setUsername(e.target.value)

  const handleReset = () => setUsername(user.username)

  const handleSave = async () => {
    const util = new coreSession()

    setLoading(true)
    const [status, error] = await util.updateUser(user.username, { username })
    setLoading(false)

    if (error) return snack.enqueueSnackbar('Perbarui akun gagal', { variant: 'error' })

    snack.enqueueSnackbar('Perbarui akun berhasil', { variant: 'success' })
    router.reload()
  }

  useEffect(() => {
    setUsername(user.username)
  }, [user])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.75 }}>
            <TextField
              fullWidth
              disabled={loading}
              label='Nama User'
              placeholder='Nama User'
              onChange={handleChange}
              value={username}
            />
          </Grid>

          <Grid item xs={12}>
            <Button disabled={loading} onClick={handleSave} variant='contained' sx={{ marginRight: 3.5 }}>
              Simpan
            </Button>
            <Button disabled={loading} onClick={handleReset} type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
