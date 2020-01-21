const User = require('../../models/user.model')

class Activation {
    constructor(token) {
        this.token = token
    }
    async exec() {
        try {
            let data = await User.findOne({
                activation_token: this.token
            }).exec()

            if (data === null) {
                throw new Error('Hmm seems no such data has found')
            }

            let updateUser = await User.findOneAndUpdate({_id: data._id}, { activated_at: Date.now(), activation_token: null}).exec()
            return data._id
        } catch(err) {
            throw err
        }
    }
}

module.exports = Activation