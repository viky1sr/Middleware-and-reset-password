const mongoose = require('mongoose')

const Schema = mongoose.Schema

let userSchema = new Schema ({
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        default: null,
        unique: true,
        trim: true
    }, 
    gender: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        default: null,
        trim: true
    },
    role_id: {
        type: String,
        default: null,
        trim: true
    },
    password: {
        type: String,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    activated_at: {
        type: Date,
        default: null
    }, 
    activation_token: {
        type: String,
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    }
})

let User = mongoose.model("User", userSchema)
module.exports = User