import express from "express";

import { addFood ,listFood ,removeFood} from "../Controllers/FoodController.js";
import multer  from "multer";  {/* to store image in the backend*/}

const FoodRouter=express.Router(); {/* to get different router method like get method*/}


//image storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})

FoodRouter.post("/add",upload.single("image"),addFood)
FoodRouter.get("/list",listFood)
FoodRouter.post("/remove",removeFood);













export default FoodRouter;