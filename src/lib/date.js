import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const formatDate = timestamp => {
  return format(Number(timestamp), 'dd MMMM yyyy', { locale: id })
}

export { formatDate }
