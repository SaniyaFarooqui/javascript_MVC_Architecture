import { Router } from "express";
import UserController from "../controller/user.js";


let userController = new UserController()
let router = Router()

router.post("/createUser",userController.CreateUser)
router.post("/loginUser",userController.LoginController)

router.put("/updateUser/:id",userController.UpdateUser)

router.get("/getAllUsers",userController.GetAllUsers)
router.get("/searchUsers",userController.SearchUsers)
router.get("/getUserById/:id",userController.GetUserById)

router.delete("/deleteUserById/:id",userController.DeleteUser)








export default router




