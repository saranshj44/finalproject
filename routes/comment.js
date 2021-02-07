var mongoose=require('mongoose');
var CommentSchema=mongoose.Schema({
  comment:String,
  reacts:[{
      type:Number,
      default:0,
  }],
  postid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'post'
  },
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post'
  },
 
})
module.exports=mongoose.model('comment',CommentSchema);

