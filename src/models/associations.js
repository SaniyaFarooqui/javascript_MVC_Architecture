import user from '../models/user.js'
import post from '../models/post.js'
import comment from '../models/comment.js'
import like from '../models/like.js'


let associations = ()=> {

    post.hasMany(comment,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"PostId"});
    comment.belongsTo(post);

    post.hasMany(like,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"PostId"});
    like.belongsTo(post);
}

export default associations;