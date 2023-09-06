import { Router } from "express";
import UserController from "../controller/user.js";
import isAutheticated from "../middleware/authetication.js";
import multer from "multer";
import path from 'path'

let upload = multer({
    storage:multer.diskStorage({
        destination:'src/upload/user',
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now()+ path.extname(file.originalname))
        }
    }),
    limits:{fileSize:20000000}, // 2mb of file is accepted,
});

let userController = new UserController()
let router = Router()

router.post("/createUser",upload.single('file'),userController.CreateUser)
router.post("/loginUser",userController.LoginController)

router.put("/updateUser/:id",upload.single("file"),isAutheticated,userController.UpdateUser)

router.get("/getAllUsers"/*,isAutheticated*/,userController.GetAllUsers)
router.get("/searchUsers"/*,isAutheticated*/,userController.SearchUsers)
router.get("/getUserById/:id"/*,isAutheticated*/,userController.GetUserById)

router.delete("/deleteUserById/:id",isAutheticated,userController.DeleteUser)








export default router




