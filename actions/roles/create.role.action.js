const Role = require('../../models/role.model')

class CreateRole {
    constructor(req) {
        (this.name = req.body.name),
        (this.permissions = req.body.permissions)
    }

    async exec() {
        try {
            let query = new Role({
                name: this.name,
                permissions: this.permissions
            })

            await query.save()

            return query
        } catch (err) {
            throw err
        }
    }
}

module.exports = CreateRole