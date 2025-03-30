import express from "express"
import { AddtoCart,removeFromCart,getCart } from '../Controllers/CartControler.js'
import authMiddleware from '../Middlewares/Auth.js';

const CartRouter=express.Router();

CartRouter.post("/add",authMiddleware,AddtoCart)
CartRouter.post("/remove",authMiddleware,removeFromCart)
CartRouter.post("/get",authMiddleware,getCart)




export default CartRouter;