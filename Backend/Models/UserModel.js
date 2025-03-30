import mongoose from 'mongoose'

// to authenticate  the user login creditanials model from mongoose model

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    CartData:{type:Object,default:{}}
},{minimize:false})

const userModel=mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;