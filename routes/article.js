var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');

router.get('/new', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }

  res.render('postArticle', {
    member : req.session.member || null
  });
});

//members test
router.get('/:articleId', function(req, res, next) {
  Article.get(req.params.articleId, function(err, article) {
    if(err) {
      console.log(err);
      next();
    } else {
      Member.get(article.memberId, function(err, member) {
        if(err) {
          console.log(err);
        } else {
          article.member = member;
          res.render('articleDetail', {
            article : article,
            member : req.session.member || null
          });
        }
      });

    }
  });
});




router.post('/', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }

  var newArticle = new Article({
    title : req.body.title,
    content : req.body.content,
    memberId : req.session.member.id
  });

  newArticle.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {

      res.redirect("/");
    }
  });
});


module.exports = router;
