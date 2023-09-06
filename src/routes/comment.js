import { Router } from "express"; 
import CommentController from "../controller/comment.js";
import isAutheticated from "../middleware/authetication.js";

let commentController = new CommentController()
const router = Router()

router.post("/createComment",isAutheticated,commentController.createComment),

router.put("/updateComment/:id",commentController.updateComment),

router.get("/getAllComment"/*,isAutheticated*/,commentController.getAllComment),
router.get("/getCommentById/:id"/*,isAutheticated*/,commentController.getCommentById),

router.delete("/deleteCommentById/:id",isAutheticated,commentController.deleteCommentById)


export default router;