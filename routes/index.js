var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/about', function(req, res, next) {
//   res.render('index', { title: 'HI' });
// });
router.get('/about', (req, res) => {
  let roles = [{
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
    roles: roles,
    user:req.user
  })
})
// // router.get('/details', function(req, res, next) {
// //   res.render('index', { title: 'this' });
// // });
// // router.get('/role', function(req, res, next) {
// //   res.render('index', { title: 'yup' });
// // });
module.exports = router;
