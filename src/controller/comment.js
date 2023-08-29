import comment from "../models/comment.js"

class CommentController{
  
  constructor(){

  }

  createComment = async(req,res) => {
    let commentData = req.body
    if(commentData == null || commentData == undefined){
      res.status(400).json({error : "please fill the required field"});
    }else{
      try {
        let response = await comment.create(commentData)
        console.log(response);
        if(response == null || response == undefined){
          res.status(400).json({error :"operation couldnot completed due to error"})
        }else{
          res.status(200).json({message : "comment created successfully",data : response});
        }
      } catch (error) {
        res.status(400).json({error : error.message});
      }
    }
  };

 
  updateComment = async(req,res) =>{
    let {id} = req.params
    let commentData = req.body
    if(id == null || id == undefined){
      res.status(400).json({error :  "please provide the id to update"})
    }else{
      try {
        let response = await comment.update(commentData,{where:{
          id:id
        }});
        if(response == 0){
          res.status(400).json({error: "Operation cannot complete due to error please try again"});
        } else if (response > 0) {
          res.status(200).json({ message: "Updated Successfully" });
        } else {
          res.status(400).json({ error: "Something went wrong please try again" });
        }
      } catch (error) {
        res.status(400).json({error : error.message})
      }
    }
  };

  getAllComment = async(req,res) => {
    let page = req.params.page
    let limit = req.params.limit
    if(page == null || page == undefined || page == 0 || limit == null || limit == undefined || limit == 0){
      page = 0
      limit = 10
    }
    let offset = page * limit
    try {
      let response = await comment.findAndCountAll({
        offset:offset,
        limit:limit
      })
      console.log(response);
      if(response.count == 0 || response.rows.length == 0){
        res.status(200).json({message:"no data avaliable"});
      }else{
        res.status(200).json({data : response});
      }
    } catch (error) {
      res.status(400),json({error:error.message});
    }
  };

  getCommentById = async(req,res)=>{
    let id = req.params.id
    if(id == null || id == undefined){
      res.status(400).json({error : "please provide id"})
    }else{
      try {
        let response = await comment.findByPk(id)
        if(response == null || response == undefined){
          res.status(200).json({message : "No Comment Found"})
        }else{
          res.status(200).json({message:"commented successfully",data: response})
        }
      } catch (error) {
        res.status(400).json({error : error.message})
      }
    }
  };

  deleteCommentById = async(req,res)=>{
    let {id} = req.params
    if(id == null || id == undefined){
      res.status(400).json({error : "please provide id"})
    }else{
      try {
        let response = await comment.destroy({where:{
          id:id
        }})
        if(response == 0){
          res.status(200).json({message: "could not delete comment please try again"})
        }else{
          res.status(200).json({message : "deleted successfully",data:response})
        }
      } catch (error) {
        res.status(400).json({error : error.message})
      }
    }
  }


}
export default CommentController