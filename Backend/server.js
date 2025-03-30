import express from "express"
import cors from "cors"
import { log } from "console";
import { connectDB } from "./Config/DB.js";
import FoodRouter from "./Routes/FoodRoute.js";
import userRouter from "./Routes/UserRoutes.js";
import 'dotenv/config'
import CartRouter from "./Routes/CartRoute.js";
import orderRouter from "./Routes/orderRoute.js";


//app config

const app=express();
const port=process.env.PORT || 4000      //Using process.env.PORT to use any available port on the server 

//middleware

app.use(express.json());
app.use(cors())             

//DB connection 

connectDB();


//api endpoints

app.use("/api/food",FoodRouter)
app.use("/images",express.static('Uploads')) //code to uploaded images to show in frontend
app.use("/api/user",userRouter)
app.use("/api/cart",CartRouter) //endpoints to connect cart backend to frontend 
app.use("/api/order",orderRouter)
 
app.get("/",(req,res) =>{     
   
    res.send("API WROKING")
})  

// to run epress server

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})

//mongodb+srv://sauravsuman8316:<db_password>@cluster0.mwb71.mongodb.net/?