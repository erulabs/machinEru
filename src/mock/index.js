// @flow

const EventEmitter = require('events')
const bot = new EventEmitter()

module.exports = {
  name: 'mock',
  bot: bot
}

setTimeout(function () {
  bot.emit('ready', null)
  setTimeout(function () {
    bot.emit('message', { mock: 'message' })
  }, 100)
}, 100)
