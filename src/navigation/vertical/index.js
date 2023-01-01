import Logout from 'mdi-material-ui/Logout'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import History from 'mdi-material-ui/History'

const navigation = () => {
  return [
    {
      title: 'Beranda',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Garansi'
    },
    {
      title: 'Data Garansi',
      icon: ArchiveOutline,
      path: '/data-garansi'
    },
    {
      sectionTitle: 'Klaim Garansi'
    },
    {
      title: 'Klaim Garansi',
      icon: FileDocumentOutline,
      path: '/data-klaim'
    },
    {
      title: 'Riwayat Klaim Garansi',
      icon: History,
      path: '/riwayat-klaim'
    },
    {
      sectionTitle: 'Pengguna'
    },
    {
      title: 'Data Pengguna',
      icon: AccountPlusOutline,
      path: '/data-pengguna'
    },
    {
      sectionTitle: 'Akun'
    },
    {
      title: 'Pengaturan Akun',
      icon: AccountCogOutline,
      path: '/pengaturan-akun'
    },
    {
      title: 'Keluar',
      icon: Logout,
      path: '/keluar'
    }
  ]
}

export default navigation
