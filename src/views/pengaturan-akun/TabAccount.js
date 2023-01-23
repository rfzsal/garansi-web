import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { coreSession } from 'src/utils/coreSession'

const TabAccount = ({ user }) => {
  const snack = useSnackbar()
  const router = useRouter()

  const [values, setValues] = useState({
    currentPassword: '',
    showCurrentPassword: false
  })
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  const handleChange = e => setUsername(e.target.value)

  const handleReset = () => setUsername(user.username)

  const handleSave = async () => {
    if (loading) return

    if (!username || !values.currentPassword)
      return snack.enqueueSnackbar('Isi semua data dengan benar', { variant: 'warning' })

    if (String(username).trim().length < 3)
      return snack.enqueueSnackbar('Nama User minimal 5 karakter', { variant: 'warning' })

    if (String(username).trim().length > 10)
      return snack.enqueueSnackbar('Nama User maksimal 10 karakter', { variant: 'warning' })

    if (!values.currentPassword) return snack.enqueueSnackbar('Isi Kata Sandi dengan benar', { variant: 'warning' })

    const util = new coreSession()

    setLoading(true)
    const [status, error] = await util.updateUser(user.username, { username, password: values.currentPassword })
    setLoading(false)

    if (error) return snack.enqueueSnackbar('Perbarui akun gagal', { variant: 'error' })

    snack.enqueueSnackbar('Perbarui akun berhasil', { variant: 'success' })
    router.reload()
  }

  useEffect(() => {
    setLoading(false)
    setUsername(user.username)
  }, [user])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.75 }}>
            <FormControl fullWidth>
              <InputLabel>Kata Sandi Saat Ini</InputLabel>
              <OutlinedInput
                disabled={loading}
                label='Kata Sandi Saat Ini'
                value={values.currentPassword}
                type={values.showCurrentPassword ? 'text' : 'password'}
                onChange={handleCurrentPasswordChange('currentPassword')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      disabled={loading}
                      edge='end'
                      onClick={handleClickShowCurrentPassword}
                      onMouseDown={handleMouseDownCurrentPassword}
                    >
                      {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

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
