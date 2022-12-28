import { read, utils } from 'xlsx'

const readFile = async file => {
  try {
    const fileBuffer = await file.arrayBuffer()

    const worksheet = read(fileBuffer)
    const data = utils.sheet_to_json(worksheet.Sheets[worksheet.SheetNames[0]])

    return [data, null]
  } catch (error) {
    return [null, error]
  }
}

export { readFile }
