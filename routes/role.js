const express = require('express')
const Role = require('../models/role')
const router = express.Router()

const globals = require('./globalFunctions')

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
//Get method:create

router.get('/create',globals.isAuthenticated,(req, res) => {
    res.render('role/create', { title: 'Add Role'})
})

//Post method:create

router.post('/create',globals.isAuthenticated ,(req, res) => {
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