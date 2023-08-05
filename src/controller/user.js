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
                let validation_error = {}
                for await(let valid_error of error.errors){
                    validation_error[`${valid_error.path}`] = valid_error.message
                }
                res.status(400).json({validation_error:validation_error});
            }
        } 
    };
    
    UpdateUser = async(req,res)=>{

    }

    GetAllUser = async(req,res)=>{

    }

    GetUserById = async(req,res)=>{

    }
    DeleteUser = async(req,res)=>{
        
    }
}
export default UserController

