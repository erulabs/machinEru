// @flow

const EventEmitter = require('events')
const events = new EventEmitter()

let mysqlReady = false
events.on('mysqlReady', () => {
  mysqlReady = true
  events.emit('readyCheck')
})

events.on('readyCheck', () => {
  if (mysqlReady) {
    events.emit('ready')
  }
})

export default events
