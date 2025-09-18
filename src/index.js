import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import express from 'express';
const app=express()
dotenv.config({
    path:'./env'
})
connectDB()
.then(
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port : ${process.env.PORT}`);
        
    })
    
)
.catch((err)=>{
    console.log('Mongo db connection failed !!!',err);
    
})
























/*


(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log('err',error);
            throw error
         })
         app.listen(process.env.PORT,()=>{
            console.log(` the app is running at ${process.env.PORT}`);
            
         })
    } catch (error) {
        console.error("error",error);
        throw error
        
    }
})()*/