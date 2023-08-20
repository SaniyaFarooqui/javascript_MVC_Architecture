import { Router } from "express"; 
import CommentController from "../controller/comment.js";

let commentController = new CommentController()
const router = Router()

router.post("/createComment",commentController.createComment),

router.put("/updateComment/:id",commentController.updateComment),

router.get("/getAllComment",commentController.getAllComment),
router.get("/getCommentById/:id",commentController.getCommentById),

router.delete("/deleteCommentById/:id",commentController.deleteCommentById)


export default router;