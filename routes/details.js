const express = require('express')
const router = express.Router()

const Detail = require('../models/details')

const Role = require('../models/role')
const passport = require('passport')
const globals = require('./globalFunctions')

router.get('/', (req, res) => {
    Detail.find((err, details) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('details/index', {
                details: details,
                title: 'Application History',
                user:req.user
            })
        }
    }).sort('name')
})
//Get method:create
router.get('/create', globals.isAuthenticated,(req, res) => {
    Role.find((err, role) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('details/create', {
                title: 'Add a new application',
                role: role,
                user:req.user
            })
        }
    }).sort('name')   
})
//post method:create

router.post('/create',globals.isAuthenticated,(req, res) => {
    Detail.create(req.body, (err, detail) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/details')
        }
    })
})

//Get method:delete

router.get('/delete/:_id',globals.isAuthenticated, (req, res) => {
    Detail.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/details')
        }
    })
})
//Get method:edit

router.get('/edit/:_id', globals.isAuthenticated,(req, res) => {
    Detail.findById(req.params._id, (err, detail) => {
        if (err) {
            console.log(err)
        }
        else {

            Role.find((err, roles) => {
                if (err) {
                    console.log(err)
                }
                else {
                     res.render('details/edit', {
                        title: 'Place Details',
                        detail: detail,
                        roles: roles,
                        user:req.user
                    })
                }
            }).sort('name')      
        }
    })
})
//Post method:edit

router.post('/edit/:_id',globals.isAuthenticated, (req, res) => {
    Detail.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, detail) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/details')
        }
    })
})


module.exports = router