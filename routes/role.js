const express = require('express')
const Role = require('../models/role')
const router = express.Router()

router.get('/', (req, res) => {
    Role.find((err, roles) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('categories/index', {
                roles: roles,
                user:req.user
            })
        }
    })
})

router.get('/create', (req, res) => {
    res.render('roles/create')
    res.render('roles/create', {
        user: req.user})
})

router.post('/create', (req, res) => {
    Role.create(req.body, (err, role) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/roles')
        }
    })
})

// make public
module.exports = router