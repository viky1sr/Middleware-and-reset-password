const ResetPassword = require('../../models/reset.model.js')
const ShowPassword = require('./showpassword.action')
const bcrypt = require('bcryptjs')
const User = require('../../models/user.model')

class Reset {
    constructor (password, token) {
        this.password = password
        this.token = token
    }

    async exec() {
        try {
            let data = await new ShowPassword ({ token: this.token }).exec()
            let password = bcrypt.hashSync(this.password, 8)
            let user = await User.findOne({ email: data.email }).exec()

            if(user === null) {
                throw new Error('User not found')                
            }

            let updateUser = await User.findOneAndUpdate({ _id: user._id }, { password: password }).exec()
            let updateModel = await ResetPassword.findOneAndUpdate({ email: data.email }, { password: this.password }).exec()
            
            // await ResetPassword.findOneAndDelete({ token: this.token }).exec()
            let pwd = this.password
            return { 
                user: updateUser.name, newpwd: pwd }
        } catch(err) {
            throw err
        }
    }
}

module.exports = Reset