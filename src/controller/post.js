import post from "../models/post.js";

class PostController {
  constructor() {
    
  }

  createPost = (req, res) => {
    let postData = req.body;
    if (postData == null || postData == undefined) {
      res.status(400).json({ message: "Please fill the required field" });
    } else {
      try {
        let response = post.create(postData);
        console.log(response);
        if (response == null || response == undefined) {
          res
            .status(400)
            .json({
              error: "Operation cannot complete due to error please try again",
            });
        } else {
          res.status(200).json({ data: response });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  updatePost = (req, res) => {
    let { id } = req.params;
    let postData = req.body;
    if (postData == null || postData == undefined) {
      res.status(400).json({ message: "Please fill the required field" });
    } else {
      try {
        let response = post.update(postData, {where: {id: id,}});
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

  getAllPost = (req, res) => {
    let { page, limit } = req.params;
    let offset = (page - 1) * limit;
    if (
      page == undefined ||
      page == null ||
      limit == undefined ||
      limit == null
    ) {
      page = 0;
      limit = 10;
    } else {
      try {
        let response = post.findAndCountAll({ offset: offset, limit: limit });
        if (response.count == 0 || response.rows.length == 0) {
          res.status(200).json({ message: "No Data Available" });
        } else {
          res.status(200).json({ data: response });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  getPostById = (req,res) =>{
    let id = req.params.id
    if(id == undefined || id == null){
      try {
        let response = post.findByPk(id);
        if(response == null){
          res.status(200).json({message:"No Data Found"})
        }else{
          res.status(200).json({data:response});
        }
      } catch (error) {
        res.status(400).json({error:error.message})
      }
    }else{
      res.status(400).json({error:"Please provide the Id of post"})
    }
  }

  deletePost = (req,res) =>{
    let {id} = req.params
    if(id == null || id == undefined){
      res.status(400).json({error:"Please provide id to Delete"});
    }else{
      let response = post.destroy({where:{id:id}});
      if(response == 0){
        res.status(400).json({error:"Coldnt delete post please try again"})
      }else{
        res.status(200).json({message:"Deleted Successfully"});
      }
    }
  }

}

export default PostController;