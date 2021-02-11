var mongoose=require('mongoose');
var MessageSchema=mongoose.Schema({
  message:String,
  author:String,
  time:{
      type:Date,
      default:(new Date()).toUTCString(),
  },
  chatid:String,
  reciver:String
})

module.exports=mongoose.model('message',MessageSchema);

