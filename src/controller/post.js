import { Op, or } from "sequelize";
import comment from "../models/comment.js";
import like from "../models/like.js";
import post from "../models/post.js";
import user from "../models/user.js";

class PostController {
  constructor() {
    
  }

  createPost = async (req, res) => {
    let postData = req.body;
    if (postData == null || postData == undefined) {
      res.status(400).json({ message: "Please fill the required field" });
    } else {
      try {
        if(postData.title == undefined || postData.location == undefined){
          res.status(400).json({error:"Please enter the title / location of post"})
        }else{
          let response = await post.create(postData);
          console.log(response);
          if (response == null || response == undefined) {
            res.status(400).json({error: "Operation cannot complete due to error please try again",});
          } else {
            res.status(200).json({ data: response });
          }
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  updatePost = async(req, res) => {
    let { id } = req.params;
    let postData = req.body;
    if (postData == null || postData == undefined || id == undefined || id == null) {
      res.status(400).json({ message: "Please fill the required field" });
    } else {
      try {
        let response = await post.update(postData, {where: {id: id,}});
        console.log(response);
        if (response == 0) {
          res.status(400).json({error: "Operation cannot complete due to error please try again"});
        } else if (response > 0) {
          res.status(200).json({ message: "Updated Successfully" });
        } else {
          res.status(400).json({ error: "Something went wrong please try again" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  getAllPost = async(req, res) => {
    let page = req.params.page
    let limit = req.params.limit
    if (page == undefined || page == null || limit == undefined ||limit == null) {
      page = 0;
      limit = 10;
    }
    let offset = page * limit;
    console.log(offset); 
    try {
      let response = await post.findAndCountAll({ offset: offset, 
        limit: limit,
        include:[{model:comment},{model:like},{model:user,attributes:{exclude:["createdAt","updatedAt"]}}],
        order:[["createdAt","DESC"]],
        attributes:{
          exclude:["userId"]
        }
      });
      console.log(response);
      if (response.count == 0 || response.rows.length == 0) {
        res.status(200).json({ message: "No Data Available" });
      } else {
        res.status(200).json({ data: response });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  }

  getAllPostByUserId = async (req,res) => {
    let {id} = req.params
    let page = req.params.page
    let limit = req.params.limit
    if(page == null || page == undefined || page == 0 || limit == null || limit == undefined || limit == 0){
      page = 0
      limit = 10
    }
    let offset = page * limit
    try {
      let response = await post.findAndCountAll({
        where:{
          user_id:id
        },
        offset:offset,
        limit:limit
      });
      if(response.count == 0 || response.rows.length == 0){
        res.status(200).json({message:"No Post Found"});
      }else{
        res.status(200).json({data:response});
      }
    } catch (error) {
      res.status(400).json({error:error.message});
    }
  }

  getPostById = async(req,res) =>{
    let id = req.params.id
    if(id == undefined || id == null){
      res.status(400).json({error:"Please provide the Id of post"})  
    }else{
      try {
        let response = await post.findByPk(id);
        if(response == null){
          res.status(200).json({message:"No Data Found"})
        }else{
          res.status(200).json({data:response});
        }
      } catch (error) {
        res.status(400).json({error:error.message})
      }
    }
  }

  SearchPosts = async( req , res ) => {
    let keyword = req.query?.keyword
    let filterBy = req.query.filterBy
    filterBy = filterBy == null || filterBy == undefined ? "" : filterBy 
    if(keyword == null || keyword == undefined){
      res.status(200).json({message :"please type something in search box"})
    }
    else{
      try {
        let response = await post.findAndCountAll({
          where:{
            [Op.or]:{
              title:{
                [Op.like]:`%${keyword}%`
              },
              tag:{
                [Op.like]:`%${keyword}%`
              },
              '$user.email$':{
                [Op.like]:`%${keyword}%`
              },
              '$user.name$':{
                [Op.like]:`%${keyword}%`
              }
            },
            location:{
              [Op.like] : `%${filterBy}%`
            }
          },
          include :[{model:like},{model:comment},{model:user}],
          order:[["createdAt","DESC"]]

        });
        if(response.rows.length == 0 || response.count == 0){
          res.status(200).json({message : "No Data Avalible"})
      }else{
          res.status(200).json({data : response})
      }
        
      } catch (error) {
        res.status(400).json({error : error.message});
      }
    }
  }

  deletePost = async(req,res) =>{
    let id = req.params.id
    console.log(id);
    if(id == null || id == undefined || id == ""){
      res.status(400).json({error:"Please provide id to Delete"});
    }else{
      let response = await post.destroy({where:{id:id}});
      if(response == 0){
        res.status(400).json({error:"Coldnt delete post please try again"})
      }else{
        res.status(200).json({message:"Deleted Successfully"});
      }
    }
  }

}

export default PostController;