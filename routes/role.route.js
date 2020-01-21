const express = require('express')
const router = express.Router()
const CreateRole = require('../actions/roles/create.role.action')
const DeleteRole = require('../actions/roles/delete.role.action')
const RoleList = require ('../actions/roles/listing.role.action')
const UpdateRole = require('../actions/roles/update.role.action')

router.post('/', 

async (req, res) => {
    try {
    let data = await new CreateRole(req).exec()

    return res.send({
        code: 200,
        status: 'Success',
        message: 'Yeay! Role has created successfully 😉',
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

router.get('/', 

async (req, res) => {
    try {
        let data = await new RoleList(req).exec()
        return res.send({
        code: 200,
        status: 'Success',
        message: `Hey buddy! these are roles list 😉`,
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

router.put('/:id',

async (req, res) => {
    try {
        let {id} = req.params
        let data = await new UpdateRole(id, req).update()

        return res.send({
            code: 200,
            status: 'Success',
            message: 'Yeay! Role has updated successfully 😉',
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

router.delete('/:id', 

async (req, res) => {
    try {
        let {id} = req.params
        let data = await new DeleteRole(id).delete()

        return res.send({
            code: 200,
            status: 'Success',
            message: 'Yeay! Role has deleted successfully 😉',
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
    
module.exports = router