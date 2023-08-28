import user from '../models/user.js'
import post from '../models/post.js'
import comment from '../models/comment.js'


let associations = ()=> {

    post.hasMany(comment,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"PostId"});
    comment.belongsTo(post);

}

export default associations;