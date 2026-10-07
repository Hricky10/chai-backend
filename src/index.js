import { app } from "./app.js";

//require('dotenv').config({path: './env'})
import dotenv from "dotenv";

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})


connectDB()
.then(() =>{
    app.listen(process.env.PORT, ()=>{
        console.log(`server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed ",err);
})





















/*
import express from "express"
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/
            ${DB_NAME}`)
            application.on("error",(error)=>{
                console.log("ERROR: ",error);
                throw error
            })


            application.listen(process.env.PORT,()=>{
                console.log(`APP is listening in port $ 
                    {process.env.PORT}`);
            })
    } catch (error) {
        console.error("ERROR", error)
        throw err
    }
})()
*/