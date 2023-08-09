import { Router } from "express";
import UserController from "../controller/user.js";

let userController = new UserController()
let router = Router()

router.post("/createUser",userController.CreateUser)

router.put("/updateUser/:id",userController.UpdateUser)












export default router




