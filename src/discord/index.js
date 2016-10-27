// @flow

const Discord = require('discord.js')

import {
  DISCORD_TOKEN
} from './../config.js'

const bot = new Discord.Client()

bot.login(DISCORD_TOKEN)

module.exports = {
  name: 'discord',
  bot: bot
}
