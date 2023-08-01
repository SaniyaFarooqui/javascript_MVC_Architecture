import post from '../models/post.js'

class PostController{

    constructor(){

    }

    createPost = (req,res) =>{
        let postData = req.body
        if(postData == null || postData == undefined){
            res.status(400).json({message:"Please fill the required field"});
        }else{
            try {
                let response = post.create(postData);
                console.log(response);
                if(response == null || response == undefined){
                    res.status(400).json({error:"Operation cannot complete due to error please try again"});
                }else{
                    res.status(200).json({data:response});
                }
            } catch (error) {
                res.status(400).json({error:error.message});
            }
        }
    }

    updatePost(){

    }

}
export default PostController;