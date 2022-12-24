import Logout from 'mdi-material-ui/Logout'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

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
      title: 'Klaim Garansi',
      icon: FileDocumentOutline,
      path: '/klaim-garansi'
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
