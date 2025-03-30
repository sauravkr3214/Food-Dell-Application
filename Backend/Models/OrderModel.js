import mongoose from "mongoose"

// creating order food schema for the ordered food

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const orderModel=mongoose.model.order|| mongoose.model("Order",orderSchema);

export default orderModel; 