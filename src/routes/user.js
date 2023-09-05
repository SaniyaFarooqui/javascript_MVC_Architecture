import { Router } from "express";
import UserController from "../controller/user.js";
import isAutheticated from "../middleware/authetication.js";


let userController = new UserController()
let router = Router()

router.post("/createUser",isAutheticated,userController.CreateUser)
router.post("/loginUser",isAutheticated,userController.LoginController)

router.put("/updateUser/:id",userController.UpdateUser)

router.get("/getAllUsers",isAutheticated,userController.GetAllUsers)
router.get("/searchUsers",isAutheticated,userController.SearchUsers)
router.get("/getUserById/:id",isAutheticated,userController.GetUserById)

router.delete("/deleteUserById/:id",isAutheticated,userController.DeleteUser)








export default router




