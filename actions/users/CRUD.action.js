const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')

class Create {
    constructor(req){
        (this.name = req.body.name),
        (this.username = req.body.username),
        (this.password = req.body.password),
        (this.email = req.body.email),
        (this.gender = req.body.gender),
        (this.phone = req.body.phone),
        (this.role_id = req.body.role_id),
        (this.password_confirmation = req.body.password_confirmastion)
    } async exec() {
        try {
        let password = bcrypt.hashSync(this.password, 6)
        let inputData = {
            name: this.name,
            username: this.username,
            email: this.email,
            gender: this.gender,
            phone: this.phone,
            role_id: this.role_id,
            activated_at: Date.now(),
            password,
        }
        
        let query = new User(inputData)
        await query.save()
        } catch(err) {
            throw err
        }
    }
}

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

class Edit {
    constructor(params, updated) {
        this.params = params,
        this.updated = updated
    }

    async exec() {
        try {
            let update = await User.findOneAndUpdate(
                this.params,
                this.updated
            ).exec()
            return update
        } catch(err) {
            throw err
        }
    }
}

class Destroy {
    constructor(id) {
        this.id = id
    }
    async exec() {
        try {
            let data = await User.findOneAndDelete({_id:this.id}).exec()
        
        if (data === null) {
            throw new Error('Hmm seems no such data has found')
        }
        let updateUser = await User.findOneAndUpdate({_id: data._id}, { deleted_at: Date.now() }).exec()
        return data
        }catch(err){
            throw err
        }
    }
}


// const destroy

module.exports = {
    Create,
    Get_all,
    Details,
    Edit,
    Destroy
}