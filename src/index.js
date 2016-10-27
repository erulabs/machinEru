// @flow

const Sequelize = require('sequelize')

import {
  DISCORD_TOKEN,
  MYSQL_SERVERS, MYSQL_USER, MYSQL_PASS, MYSQL_DB
} from './config.js'
import { sampleArray } from './helpers.js'
const mysql_target = sampleArray(MYSQL_SERVERS)

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASS, {
  host: mysql_target.host,
  port: mysql_target.port,
  dialect: 'mysql',
  pool: { max: 5, min: 0, idle: 10000 }
})

sequelize.sync().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.log('Unable to connect to the database:', err)
  process.exit(1)
})

let wrapper
if (DISCORD_TOKEN) {
  wrapper = require('./discord')
} else {
  console.log('Warning, using the mock bot wrapper')
  wrapper = require('./mock')
}

if (wrapper) {
  wrapper.bot.on('ready', () => {
    console.log('Connected to', wrapper.name)
  })

  // create an event listener for messages
  wrapper.bot.on('message', message => {
    console.log('got message', message)
  })
}
