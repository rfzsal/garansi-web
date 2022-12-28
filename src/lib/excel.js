import { read, utils, writeFile } from 'xlsx'

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

const exportFile = aoa => {
  try {
    const wb = utils.book_new()
    const ws = utils.aoa_to_sheet(aoa)
    utils.book_append_sheet(wb, ws, 'Sheet1')

    writeFile(wb, 'data_garansi.xlsx')

    return [true, null]
  } catch (error) {
    return [null, error]
  }
}

export { readFile, exportFile }
