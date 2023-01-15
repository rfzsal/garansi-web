import Logout from 'mdi-material-ui/Logout'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import History from 'mdi-material-ui/History'

const navigation = () => {
  return [
    {
      title: 'Beranda',
      icon: HomeOutline,
      path: '/beranda'
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
