const mongoose = require('mongoose')
const Schema = mongoose.Schema

let roleSchema = new Schema({
    name: {type: String, required: true},
    permissions: {type: String, default: null},
    // role_id: {type: String, required: true},
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, defualt: Date.now()},
    deleted_at: {type: Date, default: null}
})

let Role = mongoose.model('Role', roleSchema)
module.exports = Role