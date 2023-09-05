import { Sequelize , DataTypes} from "sequelize";
import database from "../config/database.js";

let UserActivty = database.define("useractivities",{

    id :{
        type:DataTypes.STRING,
        primaryKey : true,
        allowNull : false,
        defaultValue : DataTypes.UUIDV4
    },

    location : {
        type : DataTypes.STRING
    },
    
    description : {
        type : DataTypes.STRING
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
export default UserActivty