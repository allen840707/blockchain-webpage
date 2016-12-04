var db = require('./db');
var bcrypt = require('bcryptjs');
var async = require('async');

var salt = "blog-password-salt-edu-nccu-soslab";
//上次我們使用了一般的方法直接連接DB
var memberList = [{
  name : "William1",
  password : "password1",
  account : "account1"
},
{
  name : "William2",
  password : "password2",
  account : "account2"
},
{
  name : "William3",
  password : "password3",
  account : "account3"
}];

//像是這樣直接下SQL指令透過nodejs來操作資料庫
// db.query("DROP DATABASE blog", function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("CLEAR");
//   }
// });
//
// insertMember(memberList,function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("MEMBER INSERT DONE");
//   }
// });


// function insertMember(memberList, cb) {
//   async.each(memberList, function(member, callback) {
//     db.query("INSERT INTO member (name, account, password) VALUES (?, ?, ?)",[
//       member.name,
//       member.account,
//       bcrypt.hashSync(salt+member.password, 10)
//     ], function(err, result) {
//       if(err) {
//         callback(err);
//       } else {
//         callback(null);
//       }
//     });
//   }, function(err) {
//     if(err) {
//       cb(err);
//     } else {
//       cb(null);
//     }
//   })
// };
//這次要使用SQL builder來幫我們簡化這些動作
//
db("member")
  .insert({
    name: "Test",
    account: "account",
    password: "password"
  })
  .then(function(result) {
    var insertedId = result[0];
    console.log(insertedId);
  })
  .catch(function(err) {
    console.log(err);
  });

  //所以現在我們可以開始幫我們的資料庫撰寫資料model方便之後使用
