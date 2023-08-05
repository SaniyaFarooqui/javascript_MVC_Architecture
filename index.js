import express from 'express'
import dotenv from 'dotenv'
import db from './src/config/database.js'
import Postrouter from './src/routes/post.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRouter from './src/routes/user.js'

db.sync().then(()=>{
    console.log("Database is connected successfully");
}).catch((error)=>{
    console.log(error);
})

dotenv.config()
let app = express()
let port = process.env.PORT

app.use(cors());
app.use(bodyParser())

//routers started here
app.use("/api/post",Postrouter)
app.use("/api/user",userRouter)

app.listen(port, ()=>{
    console.log(`Server is accesssing on port : ${port}`);
})