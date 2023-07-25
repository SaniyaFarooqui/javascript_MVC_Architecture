import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
let app = express()
let port = process.env.PORT















app.listen(port, ()=>{
    console.log(`Server is accesssing on port : ${port}`);
})