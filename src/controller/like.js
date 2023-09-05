import Like from "../models/like.js";

class LikeController {
  constructor() {
    
  }

  createLike = async (req, res) => {
    let LikeData = req.body;
    //console.log(LikeData);
    if (LikeData.user_id == undefined && LikeData.post_id == undefined || LikeData.user_id == undefined && LikeData.comment_id == undefined) {
      res.status(400).json({ error: "Please fill the required field" });
    } else {
      try {
        if(LikeData == undefined || LikeData == undefined){
          res.status(400).json({error:"Please enter the title of Like"})
        }else{
          let isexist = await Like.findOne({
            where:{
              user_id:LikeData.user_id,
              PostId:LikeData.PostId
            }
          });
          console.log(isexist);
          if(isexist == null){
            let response = await Like.create(LikeData);
            console.log(response);
            if (response == null || response == undefined) {
              res.status(400).json({error: "Operation cannot complete due to error please try again",});
            } else {
              res.status(200).json({ data: response,message:"Liked Successfully!!!" });
            }
          }else{
            let response = await Like.destroy({where:{
              post_id:LikeData.post_id,
            }});
            if (response == null || response == undefined) {
              res.status(400).json({error: "Operation cannot complete due to error please try again",});
            } else {
              res.status(200).json({ data: "Disliked Successfully!!!!"});
            }
          }
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  updateLike = async(req, res) => {
    let { id } = req.params;
    let LikeData = req.body;
    if (LikeData == null || LikeData == undefined || id == undefined || id == null) {
      res.status(400).json({ message: "Please fill the required field" });
    } else {
      try {
        let response = await Like.update(LikeData, {where: {id: id,}});
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

  commentlike = async(req,res)=>{
    let commentData = req.data
    if(commentData.comment_id == undefined && commentData.user_id == undefined|| commentData.user_id == null && commentData.comment_id == undefined){
      res.status(400).json({error : "please provide required Data"})
    }else{
      try {
        

      } catch (error) {
        
      }
    }
  }

  getAllLike = async(req, res) => {
    let page = req.params.page
    let limit = req.params.limit
    
    if (page == undefined || page == null || limit == undefined ||limit == null) {
      page = 0;
      limit = 10;
    }
    let offset = page * limit;
    console.log(offset); 
    try {
      let response = await Like.findAndCountAll({ 
        offset: offset,
        limit: limit,
        order:[["createdAt","DESC"]]
       });
      if (response.count == 0 || response.rows.length == 0) {
        res.status(200).json({ message: "No Data Available" });
      } else {
        res.status(200).json({ data: response });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  }

  getLikeById = async(req,res) =>{
    let id = req.params.id
    if(id == undefined || id == null){
      res.status(400).json({error:"Please provide the Id of Like"})  
    }else{
      try {
        let response = await Like.findByPk(id);
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

  getAllLikeByPostId = async(req,res)=>{
    let {id} = req.params
    if(id == undefined || id == null){
      res.status(400).json({error:"Please provide the Id of post Like"})  
    }else{
      try {
        let response = await Like.findAndCountAll({
          where:{
            post_id:id
          }
        })
        if(response == null || response == undefined){
          res.status(200).json({message:"No Data Found"})
        }else{
          res.status(200).json({data:response});
        }
      } catch (error) {
        res.status(400).json({error:error.message})
      }
    }
  }

  deleteLike = async(req,res) =>{
    let id = req.params.id
    console.log(id);
    if(id == null || id == undefined || id == ""){
      res.status(400).json({error:"Please provide id to Delete"});
    }else{
      let response = await Like.destroy({where:{id:id}});
      if(response == 0){
        res.status(400).json({error:"Coldnt delete Like please try again"})
      }else{
        res.status(200).json({message:"Deleted Successfully"});
      }
    }
  }

}

export default LikeController;