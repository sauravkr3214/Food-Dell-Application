import mongoose from "mongoose";

export  const connectDB=async() =>{
    await mongoose.connect('mongodb+srv://sauravsuman8316:854311@cluster0.mwb71.mongodb.net/Food-Dell').then(()=>console.log("DB Connected"));
}