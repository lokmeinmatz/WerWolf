const sha1 = require('sha1')

/**
 * Session to store data
 */
const GameSession = {
  id: '',
  state: 0,
  userIDs: [],
  reset() {
    this.id = sha1(new Date().toDateString()).substr(1, 7)
    console.log('new id: '+this.id)
  }
}

module.exports = GameSession