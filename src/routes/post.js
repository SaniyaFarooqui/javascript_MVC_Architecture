import { Router } from "express";
import PostController from "../controller/post.js";
import isAutheticated from "../middleware/authetication.js";

let postcontroller = new PostController()
const router = Router()

router.post("/createPost",isAutheticated,postcontroller.createPost);
router.put("/updatePost/:id",postcontroller.updatePost)

router.get("/getAllPost",isAutheticated,postcontroller.getAllPost)
router.get("/getPostById/:id",isAutheticated,postcontroller.getPostById)
router.get("/getAllPostByUserId/:id",isAutheticated,postcontroller.getAllPostByUserId)
router.get("/searchPosts",isAutheticated,postcontroller.SearchPosts)

router.delete("/deletePost/:id",isAutheticated,postcontroller.deletePost)

export default router;

