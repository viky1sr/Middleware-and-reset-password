const express = require('express')
const router = express.Router()
const Register = require('../actions/login/register.action')
const {check, validationResult, body} = require('express-validator')

router.post('/', 
[
check('name')
    .not()
    .isEmpty(),
check('email')
    .isEmail(),
check('username')
    .not()
    .isEmpty(),
check('phone')
    .not()
    .isEmpty(),
check('password')
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
check('password_confirmation')
    .not()
    .isEmpty(),
body('password_confirmation').custom((value, {req}) => {
    if(value != req.body.password) {
        throw new Error("Aw snap! Password confirmation doesn't match 😱")
    } else {
        return value
    }
    })
],
async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.send({
                code: 400,
                status: 'error',
                message: errors.array()
            })
        } try {
            let data = await new Register(req).exec()
            return res.send({
                code: 201,
                status: 'Success',
                message: 'Yeay! you are registered successfully 😉',
                data
            })

            } catch(err){
                return res.send({
                    code: 400,
                    status:'Awww something bad happened 😱',
                    message: err.message
                })
        }
    }
)

module.exports = router