const express = require('express')
const router = express.Router()

const Activation = require('../actions/login/activation.action.js')

router.get('/:token', async (req, res) => {
    try {
        let data = await new Activation(req.params.token).exec()

        return res.send({
            code: 200,
            status: 'Success',
            message: "You've got it, activation has completed 😉",
            data: data
        })
    } catch (err) {
        return res.send({
            code: 400,
            status: 'Oh man! there are something wrong 😱',
            message: err.message
        })
    }
})

module.exports = router