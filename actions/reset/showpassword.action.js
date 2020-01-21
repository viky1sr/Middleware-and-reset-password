const ResetPassword = require('../../models/reset.model')

class ShowPassword {
    constructor (params) {
        this.params = params
    }

    async exec() {
        try {
            let data = await ResetPassword.findOne(this.params).exec()
            if (data === null) {
                throw new Error('Data has not found')
            }
            return { 
                email: data.email, new_password: data.password }
        } catch(err) {
            throw err
        }
    }
}

module.exports = ShowPassword