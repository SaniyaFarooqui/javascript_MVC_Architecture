import { Router } from "express";
import userActivtycontroller from "../controller/userActivity.js";
import isAutheticated from "../middleware/authetication.js";

let userActivtyController = new userActivtycontroller()
let router = Router()

    router.post("/createUserActivity",isAutheticated,userActivtyController.createUserActivity),

    router.put("/updateUserActivity/:id",isAutheticated,userActivtyController.updateUserActivity),

    router.get("/getAllUserActivity",isAutheticated,userActivtyController.getAllUserActivity),
    router.get("/getAllUserActivityById/:id",isAutheticated,userActivtyController.getAllUserActivityById),

    router.delete("/deleteUserActivity/:id",isAutheticated,userActivtyController.deleteUseractivity)
   









export default router