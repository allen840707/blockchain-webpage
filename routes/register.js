var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {
    member : null
  });
});

//members test
// router.get('/members/:memberId', function(req, res) {
//   Member.get(req.params.memberId, function(err, member) {
//     if(err) {
//       res.status(err.code);
//       res.json(err);
//     } else {
//       res.json(member);
//     }
//   });
//
// });

router.post('/', function(req, res, next) {

  //首先必須先產生出一個Member的物件在進行save
  var newMember = new Member({
    name : req.body.name,
    account : req.body.account,
    password : req.body.password
  });
  newMember.save(function(err) {
    if(err) {
      next(err);
    } else {
      //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
      req.session.member = newMember;
      res.redirect('/');
    }
  });
});

router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


module.exports = router;
