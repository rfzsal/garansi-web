import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { coreSession } from 'src/utils/coreSession'

const TabSecurity = ({ user }) => {
  const snack = useSnackbar()
  const router = useRouter()

  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
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

  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const handleSave = async () => {
    if (loading) return

    if (!values.currentPassword || !values.newPassword || !values.confirmNewPassword)
      return snack.enqueueSnackbar('Isi semua data dengan benar', { variant: 'warning' })

    if (!values.newPassword) return snack.enqueueSnackbar('Isi Kata Sandi Baru dengan benar', { variant: 'warning' })

    if (values.confirmNewPassword !== values.newPassword)
      return snack.enqueueSnackbar('Konfirmasi Kata Sandi tidak sesuai', { variant: 'warning' })

    if (!values.currentPassword) return snack.enqueueSnackbar('Isi Kata Sandi dengan benar', { variant: 'warning' })

    const util = new coreSession()

    setLoading(true)

    const [status, error] = await util.updateUser(username, {
      password: values.currentPassword,
      newPassword: values.newPassword
    })

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
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
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

          <Grid item xs={12} sx={{ marginTop: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Kata Sandi Baru</InputLabel>
              <OutlinedInput
                disabled={loading}
                label='Kata Sandi Baru'
                value={values.newPassword}
                onChange={handleNewPasswordChange('newPassword')}
                type={values.showNewPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      disabled={loading}
                      edge='end'
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownNewPassword}
                    >
                      {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Konfirmasi Kata Sandi</InputLabel>
              <OutlinedInput
                disabled={loading}
                label='Konfirmasi Kata Sandi'
                value={values.confirmNewPassword}
                type={values.showConfirmNewPassword ? 'text' : 'password'}
                onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      disabled={loading}
                      edge='end'
                      onClick={handleClickShowConfirmNewPassword}
                      onMouseDown={handleMouseDownConfirmNewPassword}
                    >
                      {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button disabled={loading} onClick={handleSave} variant='contained' sx={{ marginRight: 3.5 }}>
              Simpan
            </Button>
            <Button
              disabled={loading}
              type='reset'
              variant='outlined'
              color='secondary'
              onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </form>
  )
}

export default TabSecurity
