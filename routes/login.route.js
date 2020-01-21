const express = require('express')
const router = express.Router()
const Login = require('../actions/login/login.action')
const { check, validationResult } = require("express-validator")

router.post('/', async (req, res) => {
    try { 
        let data = await new Login(req).exec()

        return res.send({
            code: 200,
            status: 'Success',
            message: 'Login Successfully 😎',
            data
        })
    } catch(err) {
        return res.send({
            code: 400,
            status: 'Awww something bad happened 😱',
            message: err.message
        })
    }
})

module.exports = router 