import express from "express"
import { loginUser,registerUser } from "../Controllers/UserController.js"


const userRouter=express.Router();

userRouter.post("/login",loginUser);
userRouter.post("/register",registerUser)

export default userRouter;