import userActivty from "../models/userActivity.js";

class userActivtyController{

    constructor(){

    }

    createUserActivity =async (res,req)=>{
        let userActivity = req.body
        if(userActivity == null || userActivity == undefined){
            res.status(400).json({error : "please entre userActivity"})
        }else{
            try {
                let response = await userActivty.create(userActivity);
                if(response == null || response == undefined){
                    res.status(400).json({error : "couldn't complete operation "})
                }else{
                    res.status(200).json({messages : "useractivity created successfully " ,data:response})
                }
            } catch (error) {
                res.status(400).json({error : errors.messages})
            }
        }

    }





}










export default userActivtyController