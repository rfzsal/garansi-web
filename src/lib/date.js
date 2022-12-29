import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const formatDate = (timestamp, dateFormat = 'dd MMMM yyyy') => {
  return format(Number(timestamp), dateFormat, { locale: id })
}

export { formatDate }
