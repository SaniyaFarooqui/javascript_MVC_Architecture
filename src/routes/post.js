import { Router } from "express";
import PostController from "../controller/post.js";

let postcontroller = new PostController()
const router = Router()

router.post("/createPost",postcontroller.createPost);
router.put("/updatePost/:id",postcontroller.updatePost)

router.get("/getAllPost",postcontroller.getAllPost)
router.get("/getPostById/:id",postcontroller.getPostById)
router.get("/getAllPostByUserId/:id",postcontroller.getAllPostByUserId)

router.delete("/deletePost/:id",postcontroller.deletePost)

export default router;

