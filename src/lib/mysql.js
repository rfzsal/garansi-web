import mysql from 'mysql2'

let pool = null

const connect = () => {
  if (pool) return pool

  return mysql
    .createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0
    })
    .promise()
}

const db = connect()

const query = sql => {
  return db
    .execute(sql)
    .then(data => [data[0], null])
    .catch(error => [null, error])
}

export { query }
