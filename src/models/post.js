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
    location:{
        type:DataTypes.STRING
    },
    date:{
        type:DataTypes.STRING,
        defaultValue: new Date().toISOString()
    },
    
    tag:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.STRING,
        defaultValue: new Date().toISOString()
    },
    updatedAt:{
        type:DataTypes.STRING,
        defaultValue:new Date().toISOString()
    }
});
export default post;