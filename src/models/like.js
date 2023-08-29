import { DataTypes, Sequelize } from "sequelize";
import database from "../config/database.js";

let like = database.define("likes",{
    id:{
        type : DataTypes.STRING,
        primaryKey:true,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false
    },
    user_id : {
        type : DataTypes.STRING
    },
    comment_id : {
        type : DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.STRING,
        defaultValue: new Date().toISOString()
    },
    updatedAt:{
        type:DataTypes.STRING,
        defaultValue: new Date().toISOString()
    }
});

export default like