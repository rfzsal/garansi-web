import mysql from 'mysql2'

const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
  .promise()

const query = sql => {
  return db
    .execute(sql)
    .then(data => [data[0], null])
    .catch(error => [null, error])
}

export { query }
