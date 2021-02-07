var mongoose=require('mongoose');
var PostSchema=mongoose.Schema({
  cnt:String,
  reacts:[],
  userid:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
  }],
  media:[{
      type:String,
      default:''
  }],
  comment:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'comment'
  }]
})

module.exports=mongoose.model('post',PostSchema);

