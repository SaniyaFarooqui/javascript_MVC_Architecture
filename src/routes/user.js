import { Router } from "express";
import UserController from "../controller/user.js";

let userController = new UserController()
let router = Router()

router.post("/createUser",userController.CreateUser)













export default router




