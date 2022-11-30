const express = require('express')
const router = express.Router()
const passport = require('passport')
const { route } = require('.')
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
router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile']
}), (req, res) => {}
)

router.get('/google/callback', passport.authenticate('google', {
failureRedirect: '/auth/login'
}), (req, res) => {
res.redirect('/details')
})

module.exports = router