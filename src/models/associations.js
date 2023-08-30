import user from '../models/user.js'
import post from '../models/post.js'
import comment from '../models/comment.js'
import like from '../models/like.js'
import UserActivty from './userActivity.js'


let associations = ()=> {

    post.hasMany(comment,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"PostId"});
    comment.belongsTo(post);

    post.hasMany(like,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"PostId"});
    like.belongsTo(post);

    user.hasMany(UserActivty,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"user_id"});
    UserActivty.belongsTo(user);
    
}

export default associations;