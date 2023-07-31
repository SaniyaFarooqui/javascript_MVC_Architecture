import express from 'express'
import dotenv from 'dotenv'
import db from './src/config/database.js'

db.sync({alter:true}).then(()=>{
    console.log("Database is connected successfully");
}).catch((error)=>{
    console.log(error);
})

dotenv.config()


let app = express()
let port = process.env.PORT

//modify the routes in future
// app.get("/arbaz",(req,res)=>{
//     res.status(400).json({message:"Arbaz backend is connected and running properly"})
// })

// app.get("/saniya",(req,res)=>{
//     res.status(400).json({message:"saniya backend is connected and running properly"})
// })

app.listen(port, ()=>{
    console.log(`Server is accesssing on port : ${port}`);
})