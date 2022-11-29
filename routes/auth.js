const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/register', (req,res) => {
    res.render('auth/register', {titile: 'User Registration'})

})

router.post('/register',(req,res) => {
User.register(new User({username:req.body.username}), req.body.password,(err, user) => {
    if (err){
        return res.render('auth/register')
    }
    else{
        req.login(user,(err) => {
            res.redirect('/details')
        })
    }
})
})

router.get('/login', (req,res) => {
    let messages = req.session.messages || []
    req.session.messages = []
    res.render('auth/login', {
        titile: 'User login',
        messages:messages
    })

})
router.post('/login', passport.authenticate('local',{
    successRedirect:'/details',
    
    failureRedirect:'/auth/login',
    failureMessage:'Invalid Login'
}))

router.get('/logout',(req,res,next) => {
    req.session.messages = []
    req.logout((err) => {
        if(err){
            return next(err)
        }
        res.redirect('/auth/login')
    })
})
module.exports = router