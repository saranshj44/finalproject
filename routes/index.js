var express = require('express');
var passport=require('passport');
var localstrategy=require('passport-local');
var router = express.Router();
var usermodel=require('./users');
var postmodel=require('./post');
var commentmodel=require('./comment')

passport.use(new localstrategy(usermodel.authenticate()));

router.get('/', function(req, res, next) {
  res.json('index page');
});
router.post('/reg',function(req,res){
  var newuser=new usermodel({
    name:req.body.name,
    username:req.body.username,
    email:req.body.email
  })
  usermodel.register(newuser,req.body.password)
  .then(function(createduser){
    passport.authenticate('local')(req,res,function(){
      res.json({
        value:createduser
      })
    })
  })
})
router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/'
}),function(req,res){})

router.get('/profile',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(u){
    res.json(u)
  })
})

router.post('/post',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(founduser){
    postmodel.create({
      cnt:req.body.cnt,
      userid:founduser
    })
    .then(function(createdpost){
      founduser.post.push(createdpost)
      founduser.save()
      .then(function(data){
        res.json({users:data,post:createdpost})
      })
    })
  })
})
router.post('/comment/:postid',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(founduser){
    commentmodel.create({
      comment:req.body.comment,
      postid:req.params.postid
    })
    .then(function(commentcreated){
      postmodel.findOne({_id:req.params.postid})
      .then(function(postfound){
        postfound.comment.push(commentcreated);
        postfound.save()
        .then(function(savedpost){
          res.status(300).json({post:savedpost,commentcreated})
        })
      })
    })
  })
})
router.get('/post/:postid/react',function(req,res){
  // var user=usermodel.findOne({username:req.session.passport.user})
  postmodel.findOne({_id:req.params.postid})
  .then(function(postfound){
    if(postfound.reacts.includes(req.session.passport.user)){
      var index=postfound.reacts.indexOf(req.session.passport.user);
      postfound.reacts.splice(index,1);
      postfound.save()
      .then(function(){
        res.json(postfound.reacts);
      })
    }
    else{
      postfound.reacts.push(req.session.passport.user);
      postfound.save()
      .then(function(){
        res.json(postfound.reacts);
      })
    }
  })
})
module.exports = router;