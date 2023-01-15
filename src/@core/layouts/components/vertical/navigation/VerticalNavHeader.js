// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks
  const theme = useTheme()

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            <svg
              version='1.0'
              xmlns='http://www.w3.org/2000/svg'
              width='48'
              height='48'
              viewBox='0 0 218.000000 218.000000'
              preserveAspectRatio='xMidYMid meet'
            >
              <g transform='translate(0.000000,218.000000) scale(0.100000,-0.100000)' fill='#000000' stroke='none'>
                <path
                  d='M935 2169 c-555 -80 -964 -581 -931 -1139 28 -488 359 -881 843
-1002 126 -32 360 -32 486 0 418 104 715 401 819 819 18 73 22 115 22 248 -1
139 -4 173 -27 257 -53 201 -148 367 -287 507 -242 242 -590 358 -925 310z
m-439 -945 c19 -9 34 -23 34 -30 0 -18 -10 -17 -34 1 -34 26 -94 19 -127 -14
-37 -37 -38 -79 -3 -120 21 -26 33 -31 68 -31 23 0 51 7 62 15 24 18 34 19 34
1 0 -7 -16 -21 -36 -31 -52 -24 -109 -15 -148 24 -57 57 -36 161 39 191 32 14
74 11 111 -6z m484 -110 c0 -95 3 -114 15 -114 26 0 55 -38 55 -73 0 -55 -23
-77 -81 -77 l-49 0 0 75 c0 60 3 75 15 75 12 0 15 13 15 55 l0 55 -55 0 -55 0
0 -50 c0 -38 -4 -50 -15 -50 -12 0 -15 19 -15 110 0 91 3 110 15 110 11 0 15
-12 15 -45 l0 -45 55 0 55 0 0 43 c0 24 3 47 6 50 18 17 24 -14 24 -119z
m-285 79 c69 -144 84 -183 69 -183 -8 0 -22 16 -30 35 -13 33 -17 35 -62 35
-44 0 -48 -2 -67 -38 -18 -33 -34 -44 -36 -24 -1 12 94 212 101 212 3 0 14
-17 25 -37z m461 -20 c58 -126 71 -159 67 -170 -3 -7 0 -13 6 -13 6 0 11 -7
11 -15 0 -17 -16 -20 -25 -5 -3 6 -17 10 -31 10 -37 0 -27 -30 15 -44 43 -14
60 -39 45 -63 -15 -25 -92 -25 -108 -1 -14 23 1 36 17 14 9 -12 23 -17 42 -14
44 5 37 29 -12 45 -45 15 -63 44 -43 68 7 8 23 15 36 15 28 0 30 10 9 50 -14
27 -21 30 -61 30 -41 0 -47 -3 -65 -35 -12 -19 -27 -35 -34 -35 -9 0 5 38 38
110 29 60 55 110 59 110 4 0 19 -26 34 -57z m148 17 c14 -22 28 -40 31 -40 2
0 14 18 26 40 13 22 29 40 36 40 18 0 17 -3 -16 -57 -37 -61 -49 -163 -19
-171 24 -6 23 -22 -2 -22 -18 0 -20 -7 -20 -65 0 -51 -3 -65 -15 -65 -12 0
-15 14 -15 65 0 58 -2 65 -19 65 -11 0 -23 5 -26 10 -4 6 7 10 24 10 l31 0 0
58 c0 32 -6 66 -13 77 -46 69 -58 95 -44 95 8 0 26 -18 41 -40z m301 -75 c41
-88 59 -115 73 -115 26 0 46 -25 39 -51 -3 -12 0 -30 6 -40 20 -33 -2 -54 -62
-57 l-53 -3 3 93 c4 119 -5 138 -66 138 -34 0 -47 -5 -59 -22 -21 -30 -20 -58
2 -58 39 0 54 -40 26 -71 -14 -16 -14 -20 2 -43 27 -43 7 -43 -31 -1 -37 40
-51 39 -58 -5 -2 -13 -9 -26 -15 -28 -9 -3 -12 19 -12 72 0 59 3 76 14 76 8 0
38 49 70 115 30 63 58 115 61 115 3 0 30 -52 60 -115z m-505 -191 c0 -49 -4
-74 -11 -72 -6 2 -10 7 -10 11 1 4 1 36 1 72 0 37 4 65 10 65 6 0 10 -32 10
-76z m480 1 c0 -43 -4 -75 -10 -75 -6 0 -10 32 -10 75 0 43 4 75 10 75 6 0 10
-32 10 -75z m202 13 c3 -63 3 -63 33 -63 30 0 30 0 33 63 2 46 7 62 17 62 11
0 15 -13 15 -53 0 -68 -19 -97 -65 -97 -24 0 -39 7 -49 22 -16 22 -22 108 -9
121 16 17 22 3 25 -55z m228 42 c9 -16 8 -20 -5 -20 -8 0 -15 5 -15 11 0 6
-12 9 -27 7 -41 -5 -34 -29 12 -42 70 -20 58 -86 -16 -86 -29 0 -41 5 -49 21
-15 27 -2 40 15 16 9 -12 23 -17 42 -15 38 4 36 29 -4 42 -46 16 -63 36 -52
64 12 30 83 32 99 2z m60 -55 c0 -43 -4 -75 -10 -75 -6 0 -10 32 -10 75 0 43
4 75 10 75 6 0 10 -32 10 -75z'
                />
                <path
                  d='M944 966 c-3 -8 -4 -31 -2 -52 3 -37 5 -39 38 -39 33 0 35 2 38 38 2
21 -2 45 -9 53 -15 18 -58 18 -65 0z'
                />
                <path
                  d='M651 1144 c-13 -30 -7 -44 19 -44 10 0 21 4 25 9 6 11 -14 61 -25 61
-4 0 -12 -12 -19 -26z'
                />
                <path
                  d='M1103 1141 c-12 -33 -8 -41 18 -41 25 0 31 15 18 44 -16 33 -22 33
-36 -3z'
                />
                <path
                  d='M1527 1143 c-18 -34 -14 -43 20 -43 27 0 31 25 9 55 -13 18 -14 17
-29 -12z'
                />
                <path
                  d='M1430 961 c0 -17 6 -21 36 -21 28 0 35 3 32 18 -2 11 -14 18 -36 20
-27 3 -32 0 -32 -17z'
                />
                <path
                  d='M1636 965 c-6 -18 13 -29 41 -23 28 5 22 33 -8 36 -17 2 -29 -3 -33
-13z'
                />
                <path
                  d='M1640 896 c0 -22 4 -26 31 -26 26 0 30 3 27 23 -2 16 -11 23 -30 25
-24 3 -28 0 -28 -22z'
                />
              </g>
            </svg>
            <HeaderTitle variant='body' sx={{ ml: 3, fontSize: '16px' }}>
              {themeConfig.templateName}
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
