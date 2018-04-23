class User {
    constructor(id, name, state) {
        this.id = id
        this.name = name
        this.state = state
    }
}

module.exports.User = User
module.exports.ADMIN = 'admin'
module.exports.PLAYER = 'player'