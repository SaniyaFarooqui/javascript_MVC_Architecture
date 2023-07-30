import express from 'express'
import dotenv from 'dotenv'
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