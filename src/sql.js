// @flow

export const Sequelize = require('sequelize')
import events from './events.js'

import {
  MYSQL_SERVERS, MYSQL_USER, MYSQL_PASS, MYSQL_DB
} from './config.js'
import { sampleArray } from './helpers.js'
const mysql_target = sampleArray(MYSQL_SERVERS)

export const db = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASS, {
  host: mysql_target.host,
  port: mysql_target.port,
  dialect: 'mysql',
  pool: { max: 5, min: 0, idle: 10000 },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
})

db.sync().then(() => {
  events.emit('mysqlReady')
}).catch(err => {
  console.log('Unable to connect to the database:', err)
  process.exit(1)
})
