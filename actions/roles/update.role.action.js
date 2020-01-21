const Role = require('../../models/role.model.js')

class UpdateRole {
    constructor(id,req) {
        (this.name = req.body.name)
        (this.permissions = req.body.permissions)
        (this.role_id = req.body.role_id)
        (this.id = id)
    }
    async update() {
        try { 
            let data = {
                name: this.name,
                permissions: this.permissions,
                role_id: this.role_id,
                updated_at: Date.now()
            }
            let query = await Role.findByIdAndUpdate({ _id: this.id }, data, { new: true }).exec()
            return query
        } catch(err){
            throw err
        }
    }
}

module.exports = UpdateRole