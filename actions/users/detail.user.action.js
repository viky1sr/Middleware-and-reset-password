const User = require('../../models/user.model')

class Details {
    constructor(id) {
        this.id = id
    }
    async exec() {
        try {
            let data = await User.findOne({_id: this.id})
            if (data === null) {
                throw new Error ('Hmm seems no such data has found')
            }
            return data
        } catch(err) {
            throw err
        }
    }
}

module.exports = Details;