const express = require('express')
const router = express.Router()
const ForgotPassword = require("../actions/reset/forgotpassword.action")
const ShowPassword = require("../actions/reset/showpassword.action")
const Reset = require("../actions/reset/resetpassword.action")

router.post("/", async (req, res) => {
    try {
        let data = await new ForgotPassword(req).exec()

        return res.send({
            status: 'success',
            message: 'Reset password successfully',
            data
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.get("/:token", async (req, res) => {
    try {
        let data = await new ShowPassword({
            token: req.params.token
        }).exec()

        return res.send({
            status: 'success',
            data
        })
    } catch(err) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
})

router.post("/:token", async(req, res) => {
    try {
        let data = await new Reset(req.body.password, req.params.token).exec()

        return res.send({
            status: 'success',
            data_up:{
                user:data,
            }
           
        })
    } catch(err) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
})

module.exports = router