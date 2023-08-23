import { Router } from "express"; 
import LikeController from "../controller/like.js";

let likecontroller = new LikeController()
const router = Router()

router.post("/createlike",likecontroller.createLike),

router.put("/updatelike/:id",likecontroller.updateLike),

router.get("/getAllLike",likecontroller.getAllLike),
router.get("/getLikeById/:id",likecontroller.getLikeById),
router.get("/getAllLikeByPostId/:id",likecontroller.getAllLikeByPostId),

router.delete("/deleteLikeById/:id",likecontroller.deleteLike)


export default router;