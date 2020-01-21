const Role = require('../../models/role.model')

class RoleList {
    constructor(req){
        this.query = req.query
    }
    async exec(){
        try {
            let { name, permissions } = this.query
            let params = { deleted_at: null }
            if (name) {
                params.name = {$regex: name, $options: '$i'}
            } if (permissions) {
                paranms.permissions = permissions
            } 

            let newQuery = await Role.findOne(params).populate([
                {
                    path: 'Role_id',
                    model: Role
                }]).exec()
            return newQuery

        } catch(err) {}
            throw err
    }
}

module.exports = RoleList