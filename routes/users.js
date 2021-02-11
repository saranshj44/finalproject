var mongoose=require('mongoose');
var plm=require('passport-local-mongoose');
mongoose.connect('mongodb://localhost/hhhhhh');
var UserSchema=mongoose.Schema({
  name:String,
  username:String,
  email:String,
  password:String,
  post:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post'
  }],
  msg:[{
    chatid:String,
    user:String,
    reciver:String
  }]
})
UserSchema.plugin(plm);
module.exports=mongoose.model('user',UserSchema);

