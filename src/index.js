// @flow

const emojione = require('emojione')
import {
  DISCORD_TOKEN
} from './config.js'
import events from './events.js'

import Message from './models/Message.js'

let wrapper
if (DISCORD_TOKEN) {
  wrapper = require('./discord')
} else {
  console.log('Warning, using the mock bot wrapper')
  wrapper = require('./mock')
}

events.on('ready', () => {
  wrapper.bot.on('ready', () => {
    console.log('Connected to', wrapper.name)
  })

    // create an event listener for messages
  wrapper.bot.on('message', message => {
    Message.create({
      author: message.author.username,
      content: emojione.toShort(message.content)
    })
  })
})
