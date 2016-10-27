// @flow

import { db, Sequelize } from './../sql.js'

const Message = db.define('message', {
  author: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  }
}, {
  indexes: [
    { fields: ['author'] }
  ]
})

export default Message
