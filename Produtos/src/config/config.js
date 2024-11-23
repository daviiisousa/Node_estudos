const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({ // configuracao com o postgres
    user: process.env.USER_DB,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool