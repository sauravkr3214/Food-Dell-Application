
import jwt from 'jsonwebtoken'

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers; //taking the token from the user using headers
    if(!token){  //checking if the token has received fromthe user
        return res.json({success:false,message:"Not Authorized,Login Again"})
    }
    try {    //decoding the token using try catch block

        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id; //using this user id a user can add,remove or get the item from the cart
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}


export default authMiddleware;