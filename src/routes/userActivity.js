import { Router } from "express";
import userActivtycontroller from "../controller/userActivity.js";

let userActivtyController = new userActivtycontroller()
let router = Router()

    router.post("/createUserActivity",userActivtyController.createUserActivity),

    router.put("/ updateuseractivity/:id",userActivtyController.updateuseractivity),

    router.get("/getAllUserActivity",userActivtyController.getAllUserActivity),
    router.get("/getAllUserActivityById/:id",userActivtyController.getAllUserActivityById),

    router.delete("/deleteUserActivity/:id",userActivtyController.deleteUseractivity)
   









export default router