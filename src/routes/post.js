import { Router } from "express";
import PostController from "../controller/post.js";

let postcontroller = new PostController()
const router = Router()

router.post("/api/post/createPost",postcontroller.createPost);
router.get("")
router.put("")
router.delete("")

export default router;

