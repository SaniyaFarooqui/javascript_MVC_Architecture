import { Router } from "express";
import PostController from "../controller/post.js";
import isAutheticated from "../middleware/authetication.js";

let postcontroller = new PostController()
const router = Router()

router.post("/createPost",isAutheticated,postcontroller.createPost);
router.put("/updatePost/:id",postcontroller.updatePost)

router.get("/getAllPost",isAutheticated,postcontroller.getAllPost)
router.get("/getPostById/:id",postcontroller.getPostById)
router.get("/getAllPostByUserId/:id",postcontroller.getAllPostByUserId)
router.get("/searchPosts",postcontroller.SearchPosts)

router.delete("/deletePost/:id",postcontroller.deletePost)

export default router;

