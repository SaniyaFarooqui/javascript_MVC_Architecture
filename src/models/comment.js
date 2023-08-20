import { DataTypes } from "sequelize";
import database from "../config/database.js";

let comment = database.define("comments",{
    id:{
        type : DataTypes.STRING,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false,
    },
    user_id:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    commentAt:{
        type:DataTypes.STRING,
        defaultValue: new Date().toISOString()
    },
    createdAt:{
        type:DataTypes.STRING,
        defaultValue:new Date().toISOString()
    },
    updatedAt:{
        type:DataTypes.STRING,
        defaultValue: new Date().toISOString()
    }
});

export default comment