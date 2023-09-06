import { Router } from "express"; 
import LikeController from "../controller/like.js";
import isAutheticated from "../middleware/authetication.js";

let likecontroller = new LikeController()
const router = Router()

router.post("/createlike",isAutheticated,likecontroller.createLike),

router.put("/updatelike/:id",likecontroller.updateLike),

router.get("/getAllLike"/*,isAutheticated*/,likecontroller.getAllLike),
router.get("/getLikeById/:id"/*,isAutheticated*/,likecontroller.getLikeById),
router.get("/getAllLikeByPostId/:id"/*,isAutheticated*/,likecontroller.getAllLikeByPostId),

router.delete("/deleteLikeById/:id",isAutheticated,likecontroller.deleteLike)


export default router;