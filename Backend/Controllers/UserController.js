import userModel from "../Models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user

const loginUser= async(req,res)=>{
    //fetching the user details like username, email or password who has already registered

    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email}); //finding that email that the user has entered while registering

        if(!user){
            return res.json({success:false,message:"User Does Not Exists"}) //checking the user that entered the email ,already exists or not in the database
        }

        const isMatch=await bcrypt.compare(password,user.password); // checking the user password exists,if the user password exists then their password will be matched from the password saved in the database
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"}) //if saved password in the database failed to match the current password it shows invalid cred. 
        }

        // if saved password in the database matches with the current password , then a token will be generated to that particular password
         
        const token=createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user

const registerUser= async (req,res)=>{
    const {name,password,email}= req.body; //destructring the variables to store the values
    try {
        // checking the user alreadu exists
        const exists= await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"user already exists"}) 
        } 
        // validating email for strong password

        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing or encrypting the user password 

        const salt= await bcrypt.genSalt(10) // to check password strongbility
        const hashedPassword=await bcrypt.hash(password,salt); // to store password in hash

        // creating new user using password and email
        const newUser= new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user= await newUser.save() // newuser data to save in database
        const token=createToken(user._id) //creating token for user
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}

export {loginUser,registerUser}