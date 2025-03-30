import orderModel from "../Models/OrderModel.js"
import userModel from "../Models/UserModel.js";
import Stripe from "stripe"
import axios from 'axios'


//placing order for frontend

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY); // setting up of Stripe payment gatetway for the payment or orders

const placeOrder=async (req,res)=>{

    const frontend_url='https://food-dell-application-frontend.onrender.com/';
    try {
        //getting new order from the below code
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();  //saving the new order in the backend
        await userModel.findByIdAndUpdate(req.body.userId,{CartData:{}});  //updating the cartdata according to the orders or cleaning the cartdata

        //logic for stripe payments
        const line_items=req.body.items.map((item)=>({

            // here we are setting the price,currency with the aligned items in the cart for the payments on the stripe
            price_data:{
                currency:"inr",

                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity  //getting quantity of the  food item
        }))
        // pushing the delivery chrages that we have set ($2)
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1  //the above price will be appilcable once at a time or on one product
        })
        // after setting up of the line items, we are setting up of payment session where a user can pay the payments and if payment fails user will be cancel url or if payment sucess user will be redirect ot the cancel url(defined below)

        const session=await stripe.checkout.sessions.create({  //here await is missing from the sir,i added to function the session properly
            line_items:line_items,
            payment_method_types: ["card"],
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`, //url redirect for the payment which gets successful 
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url});
    }
        catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        }

}

// here we are writing the code for the successful status of the payment and saving the status of the payment in the backend(generally we do it through webhook,but here we are creating temporary fn.)
  const verifyOrder=async (req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true}); //here we are checking the payment is successful or not  with the help of orderModel 
            res.json({success:true,message:"Paid"})  //if payment get succesful,it will show message paid
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"}) //if payment fails,it will show Error in the console
    }
  }

  //user orders for frontend or code for showing all the ordered items on the order page or order option on home page

  const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId}); //finding all the ordered items in the order option on home page through the userId
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})   
    }
  }
  //logic to fetch all the orders from all the users on the order page of admin panel(and for this we have to create api)
   const listOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({});  //getting or saving all the users ordered data in this allOrders variable
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
   }

   //creating the logic to change the status of the food like food processing,ordered or delivered

   const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

   }


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
