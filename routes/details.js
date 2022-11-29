const express = require('express')
const router = express.Router()

const Detail = require('../models/details')

const Role = require('../models/role')
const passport = require('passport')

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    else{
        res.redirect('/auth/login')
    }
}

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

router.get('/create', isAuthenticated,(req, res) => {
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

router.post('/create',isAuthenticated,(req, res) => {
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


router.get('/delete/:_id',isAuthenticated, (req, res) => {
    Detail.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/details')
        }
    })
})
router.get('/edit/:_id', isAuthenticated,(req, res) => {
    
    Role.find((err, role) => {
        if (err) {
            console.log(err)
        }
        else {
           
            Detail.findById(req.params._id, (err, details) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('details/edit', { 
                        title: 'Application Details',
                        role: role,
                        details: details,
                        user:req.user

                    })
                }
            })           
        }
    }).sort('name')   
})

router.post('/edit/:_id',isAuthenticated, (req, res) => {
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