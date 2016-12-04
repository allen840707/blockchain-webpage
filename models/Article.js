var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Article = function(options) {
  this.id = options.id;
  this.title = options.title;
  this.memberId = options.memberId;
  this.content = options.content;
  this.createdAt = options.createdAt;
};

Article.getAll = function(cb) {
  db.select()
    .from('article')
    .map(function(row) {
      return new Article({
        id : row.id,
        title : row.title,
        memberId : row.member_id, //這邊剛剛忘記修正了
        content : row.content,
        createdAt : row.createdAt
      });
    })
    .then(function(articleList) {
      cb(null, articleList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
};

Article.get = function(articleId, cb) {
  db.select()
    .from('article')
    .where({
      id : articleId
    })
    .map(function(row) {
      return new Article({
        id : row.id,
        title : row.title,
        memberId : row.member_id, //這邊剛剛忘記修正了
        content : row.content,
        createdAt : row.createdAt
      });
    })
    .then(function(articleList) {
      if(articleList.length) {
        cb(null, articleList[0]);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
};

//instance fnuction
Article.prototype.save = function (cb) {
  if(this.id) {
    db("article")
      .update({
        title : this.title,
        content : this.content
      })
      .where({
        id : this.id
      })
      .then(function() {
        cb(null);
      })
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      });
  } else {
    db("article")
      .insert({
        title : this.title,
        content : this.content,
        member_id : this.memberId
      })
      .then(function(result) {
        this.id = result[0];
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      });
  }
};


module.exports = Article;
