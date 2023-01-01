import { useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import axios from 'axios'
import { useSnackbar } from 'notistack'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import { withSessionSsr } from 'src/lib/session'
import FooterIllustration from 'src/views/masuk/FooterIllustration'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const Masuk = () => {
  const snack = useSnackbar()

  const [values, setValues] = useState({
    username: '',
    password: '',
    loading: false,
    showPassword: false
  })

  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleLogin = () => {
    if (!values.username || !values.password) return

    setValues({ ...values, loading: true })

    axios
      .post('/api/auth/login', { username: values.username, password: values.password })
      .then(res => {
        if (res.data) router.replace('/beranda')
      })
      .catch(error => {
        return snack.enqueueSnackbar('Nama User atau Kata Sandi salah', { variant: 'error' })
      })
      .finally(() => {
        setValues({ ...values, loading: false })
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              CekGaransi 🖥️
            </Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              disabled={values.loading}
              value={values.username}
              onChange={handleChange('username')}
              autoFocus
              fullWidth
              label='Nama User'
              sx={{ marginBottom: 4 }}
            />

            <FormControl fullWidth>
              <InputLabel>Kata Sandi</InputLabel>
              <OutlinedInput
                disabled={values.loading}
                label='Kata Sandi'
                value={values.password}
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              disabled={values.loading}
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginTop: 4 }}
              onClick={handleLogin}
            >
              {values.loading ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <FooterIllustration />
    </Box>
  )
}
Masuk.getLayout = page => <BlankLayout>{page}</BlankLayout>

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/beranda'
      },
      props: {
        user: req.session.user
      }
    }
  }

  return {
    props: {}
  }
})

export default Masuk
