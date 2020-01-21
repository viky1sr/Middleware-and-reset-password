const Role = require('../../models/role.model')

class DeleteRole {
    constructor(id) {
        this.id = id
    }

    async delete() {
        try {
            let query = await Role.findByIdAndUpdate({ _id: this.id }, { deleted_at: Date.now() }, { new: true }).exec()
            return query
        } catch(err){
            throw err
        }
    }
}

module.exports = DeleteRole