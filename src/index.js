// require('dotenv').config({path: './env'}) //* it works but mixing require with import disturbs code consistency
import dotenv from "dotenv" //note: better for our case : but need to config below 
// this is recently introduced: experimental : modify package.json
import connectDB from './db/index.js'

dotenv.config({
    path: './env'
})


connectDB()









/*
import express from "express"
const app = express()

import mongoose from 'mongoose'
import {DB_NAME} from "./constants"

semicolon pre-empted for iife : known problem: good practice
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) =>  {  //* event listeners of express
            console.log("ERROR:" ,error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`) //*listen on the db connection port
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})() //iife
first approach to connect DB : all code in index only : not modular
 */