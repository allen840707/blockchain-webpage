//這是一個Member Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var Member = function(options) {
  this.id = options.id;
  this.name = options.name;
  this.password = options.password;
  this.account = options.account;
};

//Class Function
Member.get = function(memberId, cb) {
  //這邊是當傳入一個memberId時，進入資料庫查出相對應的member資料
  db.select()
    .from('member')
    .where({
      id : memberId
    })
    .map(function(row) {
      //將select出來的資料轉換成Member物件
      return new Member(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList[0]);
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    });
};

Member.getByAccount = function(account, cb) {
  //這邊是當傳入一個memberId時，進入資料庫查出相對應的member資料
  db.select()
    .from('member')
    .where({
      account : account
    })
    .map(function(row) {
      //將select出來的資料轉換成Member物件
      return new Member(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList[0]);
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    });
};
//我們接下來嘗試是否可以正確取得資料
//接下來完成其他會用到的function
//Instance Function
Member.prototype.save = function (cb) {
  //save的概念是當物件不存在時新增，存在時對DB做更新
  if (this.id) {
    //已存在
    db("member")
      .where({
        id : this.id
      })
      .update({
        name : this.name,
        account : this.account,
        password : this.password
      })
      .then(function() {
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("MEMBER UPDATED", err);
        cb(new GeneralErrors.Database());
      });
  } else {
    //不存在
    db("member")
      .insert({
        name: this.name,
        account: this.account,
        password: this.password
      })
      .then(function(result) {
        var insertedId = result[0];
        this.id = insertedId;
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("MEMBER INSERT", err);
        cb(new GeneralErrors.Database());
      });
  }
};

//這樣基本上就完成了一個DataModel會用到的method, 之後有需要的時候再過來新增
module.exports = Member;
