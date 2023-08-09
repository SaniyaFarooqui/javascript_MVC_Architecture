import { response } from "express";
import user from "../models/user.js";

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

    GetAllUser = async(req,res)=>{

    }

    GetUserById = async(req,res)=>{

    }
    DeleteUser = async(req,res)=>{
        
    }
}
export default UserController

