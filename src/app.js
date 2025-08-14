// making files and folders thorugh cli is faster
import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express() // property transfer through method

app.use(cors({
    origin: process.env.CORS_ORIGIN, //* which origins we allowed : from where we accept requests in our backend
    credentials: true // allow credentials :: read docs
}))

// data will come in variuous formats and places:url, json. forms.json formsetc :: configure them 
app.use(express.json({limit: "16kb"})) //forms comes in json usually configuration that we are accepting json with limit :: dont want to exceed this limit to control load in server
//* earlier this was done through body-parser now directly in express

app.use(express.urlencoded({extended: true, limit: "16kb"})) //* data in url comes in various formats. maybe + , %20,etc : need url encoding
//* extended: true(means we can nested objects)

app.use(express.static("public")) // storing static files/folders in backend server: eg: pdf, image
// folder name can be anything

app.use(cookieParser) // options availabel but not needed

export { app }