var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,
  user:req.user});
});

router.get('/about', (req, res) => {

  let role = [{
    'name': 'Computer Programmer'
  },
  {
    'name': 'Software Analyst'
  },
  {
    'name': 'Software Engineer'
  }]

  res.render('about', { 
    title: 'Job Tracker',
    role: role,
    user:req.user
  })
})

module.exports = router;
