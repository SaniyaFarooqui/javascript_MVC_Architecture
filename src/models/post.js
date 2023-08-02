import { DataTypes } from "sequelize";
import Database from "../config/database.js";

let post = Database.define('Posts',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
    },
    user_id:{
        type:DataTypes.STRING,
    },
    location:{
        type:DataTypes.STRING
    },
    date:{
        type:DataTypes.DATE,
        defaultValue:Database.fn('now')
    },
    tag:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:Database.fn('now')
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:Database.fn('now')
    }
});
export default post;