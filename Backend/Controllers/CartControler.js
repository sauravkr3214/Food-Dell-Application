
import userModel from "../Models/UserModel.js"
//add items to user cart
const AddtoCart= async (req,res)=>{


   try {
        let userData=await userModel.findOne({_id:req.body.userId}); //finding user data to match the token for authentication
        let CartData=await userData.CartData;

    if(!CartData[req.body.itemId]){
        
        CartData[req.body.itemId] = 1; //adding a product in the cart if there is no product entry into the cart
    }
    else{
        CartData[req.body.itemId] +=1; // if the product is already in the cart,then this logic will increase that product quantity in the cart 

    }
    await userModel.findByIdAndUpdate(req.body.userId,{CartData});  //updating the adding or removing the cart product details in the item id
    res.json({success:true,message:"Added to Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}



//remove items from to user cart

const removeFromCart=async (req,res)=>{

    try {
        let userData=await userModel.findById(req.body.userId);
        let CartData=await userData.CartData;

        if(CartData[req.body.itemId] > 0){
            CartData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{CartData})
        res.json({success:true,message:"Removed from cart"});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}
    


//fetch user cart data

const getCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let CartData=await userData.CartData;
        res.json({success:true,CartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}

export {AddtoCart,removeFromCart,getCart}