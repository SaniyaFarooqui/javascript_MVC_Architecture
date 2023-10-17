import { Router } from "express";
import UserController from "../controller/user.js";
import isAutheticated from "../middleware/authetication.js";
import multer from "multer";
import path from "path";

//Normal Upload for Upload Folder
let upload = multer({
  storage: multer.memoryStorage(),
});

let userController = new UserController();
let router = Router();

router.post("/createUser", upload.single("file"), userController.CreateUser);
router.post("/loginUser", userController.LoginController);
router.post(
  "/ImportUserFromCSV",
  upload.single("file"),
  //   isAutheticated,
  userController.ImportUserFromCSV
);

router.put(
  "/updateUser/:id",
  upload.single("file"),
  isAutheticated,
  userController.UpdateUser
);
router.post(
  "/importuserfromexcel",
  upload.single("file"),
  userController.ImportUserFromExcel
);

router.get("/getAllUsers", isAutheticated, userController.GetAllUsers);
router.get("/refreshToken/:token", isAutheticated, userController.RefreshToken);
router.get("/searchUsers", isAutheticated, userController.SearchUsers);
router.get("/getUserById/:id", isAutheticated, userController.GetUserById);
router.get("/ExportUserToCSV", userController.ExportUserToCSV);
router.get("/ExportUserToExcel", userController.ExportUserToExcel);

router.delete("/deleteUserById/:id", isAutheticated, userController.DeleteUser);
router.delete("/BulkDeleteUser", isAutheticated, userController.BulkDeleteUser);

router.get("/logoutUser", userController.LogoutController);

export default router;
