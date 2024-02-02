const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({

email:{
    type:String,
    unique:true,
    required:true
},
password:{
type:String,
required:true,

},
name:{
    type:String,
    Required:true,
},
firstname:{
    type:String,
    required:true,

},
role: { 
    type: String,
     enum: ['admin','client'], 
     default: 'client' 
    },




});
const User = mongoose.model('User', userSchema);
module.exports = User;