var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  Article.getAll(function(err, articleList) {
    if(err) {
      next();
    } else {
      //這邊的做法是使用async each這樣的方式幫我們從articleList中一筆筆去找到member，然後新增一個key叫member在article物件中
      async.each(articleList, function(article, cb) {
        Member.get(article.memberId, function(err, member) {
          if(err) {
            cb(err);
          } else {
            article.member = member;
            cb(null);
          }
        });
      }, function(err){
        if(err) {
          res.status = err.code;
          next();
        } else {
          res.render('index',
          {
            member : req.session.member || null,
            articleList: articleList
          });
        }
      });

    }
  });
});


module.exports = router;
