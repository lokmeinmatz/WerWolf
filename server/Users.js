class User {
    constructor(id, name, state) {
        this.id = id
        this.name = name
        this.state = state
    }
}

const validADMINS = new Set()

validADMINS.add('Matthias')
validADMINS.add('Sebastian')
validADMINS.add('Justin')

module.exports.VALID_ADMINS = validADMINS
module.exports.User = User
module.exports.ADMIN = 'admin'
module.exports.PLAYER = 'player'
