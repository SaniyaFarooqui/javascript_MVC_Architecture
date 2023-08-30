import user from "../models/user.js";
import { Op } from "sequelize";
import UserActivty from "../models/userActivity.js";
import post from "../models/post.js";

class UserController{

    constructor(){

    }

    CreateUser = async(req,res) => {
        let userData = req.body
        if(userData.name == null || userData.name == undefined || userData.email == null || userData.email == undefined || userData.password == null || userData.password == undefined){
            res.status(400).json({error: "Name / Email required"});
        }else{
            try {
                let response = await user.create(userData);
                console.log(response);
                if(response == null || response == undefined){
                    res.status(400).json({error: "operation couldn't complete due to error"});
                }
                else{
                    res.status(200).json({message: "user created successfully ",data: response});
                }
            } catch (error) {
                if(!error.errors){
                    res.status(400).json({error:error.message});
                }else{
                    let validation_error = {}
                    for await(let valid_error of error.errors){
                        validation_error[`${valid_error.path}`] = valid_error.message
                    }
                    res.status(400).json({validation_error:validation_error});
                }
            }
        } 
    };
    
    UpdateUser = async(req,res)=>{
        let {id} = req.params
        let userData = req.body
        if(id == null || id == undefined){
            res.status(400).json({error : "please provide the id to update"})
        }else{
            try {
                let response = await user.update(userData,{where:{
                    id:id
                }});
                if(response > 0){
                    res.status(200).json({message : "Update successfully"})
                }else{
                    res.status(400).json({error:"Update fail please try again"})
                }
            } catch (error) {
                if(!error.errors){
                    res.status(400).json({error:error.message})
                }else{
                    let validation_error ={}
                    for await(let response of error.errors){
                        validation_error[`${response.path}`] = response.message
                    }
                    res.status(400).json({error:validation_error})
                }
            }
        }
    }

    GetAllUsers = async(req,res) => {
        let page = req.params.page 
        let limit = req.params.limit
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0
            limit = 10
        }
        let offset = page * limit
        try {
            let response = await user.findAndCountAll({
                offset : offset,
                limit : limit,
                include: [{model : UserActivty },{model:post}]
            });
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

    SearchUsers = async(req,res) => {
        let keyword = req.query?.keyword
        console.log(keyword);

        if(keyword == null || keyword == undefined){
            res.status(200).json({meassage:"please type something in search box"});
        }else{
            try {
                let response = await user.findAndCountAll({
                    where:{
                        [Op.or]:{
                            name:{
                                [Op.like]:`%${keyword}%`
                            },
                            email:{
                                [Op.like]:`%${keyword}%`
                            }    
                        }
                    }
                });
                if(response.rows.length == 0 || response.count == 0){
                    res.status(200).json({message : "No Data Avalible"})
                }else{
                    res.status(200).json({data : response})
                }
            } catch (error) {
                res.status(400).json({error : error.message})
            }
        }
    }

    GetUserById = async(req,res)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(200).json({meassage:"please provide id"})
        }else{
            try {
                let response = await user.findByPk(id)
                if(response == null || response == undefined){
                    res.status(200).json({message:"No User Found"})
                }else{
                    res.status(200).json({data:response})
                }
            } catch (error) {
                res.status(400).json({error : error,message})
            }
        }

    }
    
    DeleteUser = async(req,res)=>{
        let id = req.params.id
        if(id == null || id == undefined){
            res.status(200).json({message:"please provide id"})
        }else{
            try {
                let response = await user.destroy({
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
export default UserController

