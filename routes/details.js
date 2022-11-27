const express = require('express')
const router = express.Router()

const Detail = require('../models/details')

const Role = require('../models/role')
// const passport = require('passport')

// //auth check
// function isAuthenticated(req,res,next){
//     if(req.isAuthenticated()){
//         return next()
//     }
//     else{
//         res.redirect('/auth/login')
//     }
// }

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

router.get('/create', (req, res) => {
    Role.find((err, roles) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('role/create', {
                title: 'Mention your desired role',
                roles: roles,
                user:req.user
            })
        }
    }).sort('name')   
})

router.post('/create',(req, res) => {
    Detail.create(req.body, (err, details) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/details')
        }
    })
})


router.get('/delete/:_id', (req, res) => {
    Detail.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/details')
        }
    })
})

router.get('/edit/:_id', (req, res) => {
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
                        title: 'Application Details',
                        detail: detail,
                        roles: roles,
                        user:req.user
                    })
                }
            }).sort('name')      
        }
    })
})

router.post('/edit/:_id', (req, res) => {
    Place.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, detail) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/details')
        }
    })
})

module.exports = router