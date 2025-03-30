import foodModel from "../Models/FoodModel.js";
import fs from 'fs'

//add food item

const addFood=async(req,res)=>{
    //logic to store the food data in storage

    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food added"});
        
    } catch (error) {
        console.log("Error")
        res.json({success:false,message:"Error"})       
    }
}

//add food lsit

const listFood=async(req,res)=>{
    try {
        
    const foods=await foodModel.find({});
    res.json({success:true,data:foods})

    } catch (error) {
        console.log("Error");
        res.json({success:false,message:"Error"})
    }
}

//remove food list or food object

const removeFood=async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id);//finding the food list or images from the upload folders to delete it 
        fs.unlink(`uploads/${food.image}`,()=>{}) //finding that particular image to delete it 
        
        await foodModel.findByIdAndDelete(req.body.id); //finally deleted

        res.json({success:true,message:"Food Removed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
}

export {addFood,listFood,removeFood} ;