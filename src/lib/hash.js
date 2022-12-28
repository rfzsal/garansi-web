import bcrypt from 'bcrypt'

const hash = text => bcrypt.hashSync(text, 10)

const compare = (text, otherText) => bcrypt.compareSync(text, otherText)

export { hash, compare }
