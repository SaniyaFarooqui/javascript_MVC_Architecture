import { Router } from "express";
import UserController from "../controller/user.js";
import isAutheticated from "../middleware/authetication.js";
import multer from "multer";
import path from "path";

//Normal Upload for Upload Folder
let upload = multer({
  storage: multer.memoryStorage({
    destination: "src/upload/user",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 20000000 }, // 2mb of file is accepted,
});

let userController = new UserController();
let router = Router();

router.post("/createUser", upload.single("file"), userController.CreateUser);
router.post("/loginUser", userController.LoginController);
router.post(
  "/ImportUser",
  upload.single("file"),
  //   isAutheticated,
  userController.ImportUserFromExcel_or_CSV
);

router.put(
  "/updateUser/:id",
  upload.single("file"),
  isAutheticated,
  userController.UpdateUser
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
