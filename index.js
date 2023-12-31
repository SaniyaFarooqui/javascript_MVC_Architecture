import express from 'express'
import dotenv from 'dotenv'
import db from './src/config/database.js'
import Postrouter from './src/routes/post.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRouter from './src/routes/user.js'
import commentRouter from './src/routes/comment.js'
import likeRouter from './src/routes/like.js'
import setAssociations from './src/models/associations.js'
import userActivityRouter from './src/routes/userActivity.js'

db.sync({alter:true}).then(()=>{
    console.log("Database is connected successfully");
}).catch((error)=>{
    console.log(error);
})
setAssociations()

dotenv.config()
let app = express()
let port = process.env.PORT

app.use(cors());
app.use(bodyParser())

//routers started here
app.use("/api/post",Postrouter)
app.use("/api/user",userRouter)
app.use("/api/comment",commentRouter)
app.use("/api/like",likeRouter)
app.use("/api/userActivity",userActivityRouter)

app.use("/src/upload",express.static("src/upload"))

app.listen(port, ()=>{
    console.log(`Server is accesssing on port : ${port}`);
})