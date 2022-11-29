const express = require('express')
const Role = require('../models/role')
const router = express.Router()

router.get('/', (req, res) => {
    Role.find((err, role) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('role/index', {
                role: role,
                user:req.user
            })
        }
    })
})
router.get('/create', (req, res) => {
    res.render('role/create', { title: 'Add Role'})
})


router.post('/create', (req, res) => {
    Role.create(req.body, (err, role) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/role')
        }
    })
})

module.exports = router