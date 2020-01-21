const express = require('express');
const router = express.Router();
const Create = require('../actions/users/create.user.action');
const Get_all = require('../actions/users/getAll.user.action');
const Delete = require('../actions/users/delete.user.action');
const Edit = require('../actions/users/edite.user.action');
const Details = require('../actions/users/detail.user.action');
const { check, validationResult, body } = require('express-validator');

router.post('/create', 
[
    check('name')
    .not()
    .isEmpty(),
    check('username')
    .not()
    .isEmpty(),
    check('email')
    .not()
    .isEmpty(),
    check('gender')
    .not()
    .isEmpty(),
    check('phone')
    .not()
    .isEmpty(),
    check('password')
    .not()
    .isEmpty()
    .isLength({ min: 6 }), 
    body('password_confirmation').custom((value, {req}) => {
        if(value != req.body.password){
            throw new Error("Passwod confirmation doesn't match 😱")
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
        let data = await new Create(req).exec()
        return res.send({
            code: 201,
            status: 'Success',
            message: 'Yeay! User account has created successfully 😉',
            data
        })

        } catch(err){
            return res.send({
                code: 400,
                status:'Awww something went wrong 😱',
                message: err.message
            }) 
        }
    })


router.get('/list', async (req, res) => {
    try {
        let data = await new Get_all().exec()
        return res.send({
            code: 200,
            status: "Hey buddy! these are user's account data 😉",
            data
        })
    } catch(err) {
        return res.send({
            code: 400,
            status: 'Awww something went wrong 😱',
            message: err.message
        })
    }
})

router.post('/', async (req, res) => {
    try {
        
        let data = await new Details(req).exec()

        return res.send({
            code: 200,
            status: "Here is the details of user's account data 😉",
            data
        })
    } catch(err) {
        return res.send({
            code: 400,
            status: 'Awww something went wrong 😱',
            messsage: err.message
        })
    }
})

router.put('/:id', async (req, res) => {
    let { id } = req.params
    let updatedData = {
        name: req.body.name,
        phone: req.body.phone,
    }

    try {
        let data = await new Edit(id, updatedData).exec()

        return res.send({
            code: 200,
            status: "Success",
            message: "Yoo, you have updated user's data successfully 😉",
            data
        })
    } catch(err) {
        return res.send({
            code: 400,
            status: 'Awww something went wrong 😱',
            messsage: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    let { id } = req.params

    try {
        let data = await new Delete(id).exec()

        return res.send({
            code: 200,
            status: "Success",
            message: "Here we go, user's account has deleted 😉",
            data
        })
    } catch(err) {
        return res.send({
            code: 400,
            status: 'Awww something went wrong 😱',
            messsage: err.message
        })
    }
})

module.exports = router;