import userActivty from "../models/userActivity.js";

class userActivtyController{

    constructor(){

    }

    createUserActivity = async(req,res)=>{
        let userActivity = req.body
        if(userActivity == null || userActivity== undefined){
            res.status(400).json({error :"please entre userActivity"});
        }else{
            try {
                let response = await userActivty.create(userActivity);
                if(response == null || response == undefined){
                    res.status(400).json({error : "couldn't complete operation "})
                }else{
                    res.status(200).json({messages : "useractivity created successfully " ,data:response})
                }
            } catch (error) {
                res.status(400).json({error : error.messages})
            }
        }

    };

    updateUserActivity = async(req,res) => {
        let {id} = req.params
        let userActivity = req.body
        if(id == null || id == undefined){
            res.status(400).json({error : "please provide id"})
        }else{
            try {
                let response = await userActivty.update(userActivity,{
                    where :{
                        id : id
                    }
                })
                if(response == null || response == undefined){
                    res.status(400).json({error : "couldn't update please try again"})
                }else{
                    res.status(200).json({messages : "updated successfully",data : response})
                }
            } catch (error) {
                res.status(400).json({error:error.messages})
            }
        }
    };

    getAllUserActivity = async(req,res) => {
        let page = req.params.page
        let limit = req.params.limit
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0
            limit = 10
        }
        let offset = page * limit
        try {
            let response = await userActivty.findAndCountAll({
                offset : offset,
                limit : limit
            })
            if(response.count == 0 || response.rows.length == 0){
                res.status(200).json({message:"no data avaliable"});
            }else{
                res.status(200).json({data : response});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({error:error.message});
        }     
    }

    getAllUserActivityById = async(req,res) => {
        let {id} = req.params
        if(id == null || id == undefined){
            res.status(200).json({meassage:"please provide id"})
        }else{
            try {
                let response = await userActivty.findByPk(id)
                if(response == null || response == undefined){
                    res.status(200).json({message:"No User Found"})
                }else{
                    res.status(200).json({data:response})
                }
            } catch (error) {
                res.status(400).json({error : error,message})
            }
        }
        
    };

    deleteUseractivity = async(req,res)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(200).json({message:"please provide id"})
        }else{
            try {
                let response = await userActivty.destroy({
                    where : {id : id}
                });
                if(response == 0){
                    res.status(400).json({error : "can't delete kindly try again"});
                }else{
                    res.status(200).json({message:"Deleted Successfully"});
                }
            } catch (error) {
                res.status(400).json({error : error.message})
            }
        }


    }

 }    

export default userActivtyController