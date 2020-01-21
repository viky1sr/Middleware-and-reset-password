const User = require('../../models/user.model')

class Get_all {
    async exec(){
        try {
            let query = await User.find({})
            return query
        } catch(err) {
            throw err
        }
    }
}

module.exports = Get_all;