const jwt = require('jsonwebtoken')
const { startsWith } = require('lodash')
const Role = require('../models/role.model')

module.exports = () => {
    return async (req, res, next) => {
        let token = req.header('Authorization')
        let unauthenticated = {
            status: 'unauthenticated',
            message: 'invalid header Token'
        }

        let notAdmin = {
            status: 'unauthenticated',
            message: 'you are not admin, you don\'t have privilage'
        }

        if (startsWith(token, "Bearer ")) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) return res.status(400).json(unauthenticated);
            console.log(data)
            if (data.user_role === 'user') {
                if (req.method != 'GET') {
                    return res.status(400).json(notAdmin)
                } else {
                    console.log('berhasil')
                }
            }
            return next()
            
        })
    } else {
        return res.status(400).json(unauthenticated)
    }
    }
}