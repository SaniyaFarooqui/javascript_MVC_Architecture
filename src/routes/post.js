import { Router } from "express";
import PostController from "../controller/post.js";
import isAutheticated from "../middleware/authetication.js";
import multer from "multer";
import path from "path";

let upload = multer({
  storage: multer.diskStorage({
    destination: "src/upload/post",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 20000000 }, // 2mb of file is accepted,
});

let postcontroller = new PostController();
const router = Router();

router.post(
  "/createPost",
  upload.single("file"),
  isAutheticated,
  postcontroller.createPost
);
router.put("/updatePost/:id", upload.single("file"), postcontroller.updatePost);

router.get("/getAllPost", isAutheticated, postcontroller.getAllPost);
router.get("/getPostById/:id", isAutheticated, postcontroller.getPostById);
router.get(
  "/getAllPostByUserId/:id",
  isAutheticated,
  postcontroller.getAllPostByUserId
);
router.get("/searchPosts", isAutheticated, postcontroller.SearchPosts);
router.get(
  "/ExportPostToCSV" /*,isAutheticated*/,
  postcontroller.ExportPostToCSV
);
router.get(
  "/ExportPostToExcel" /*,isAutheticated*/,
  postcontroller.ExportPostToExcel
);
router.delete("/deletePost/:id", isAutheticated, postcontroller.deletePost);
router.delete("/BulkDeletePost", isAutheticated, postcontroller.BulkDeletePost);

export default router;
