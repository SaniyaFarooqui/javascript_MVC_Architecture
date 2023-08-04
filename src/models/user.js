import { Sequelize , DataTypes} from "sequelize";
import database from "../config/database";


let user = database.define("users",{

    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING
    },
    age:{
        type:DataTypes.BIGINT
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
    },
    password:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.TEXT
    },
    country:{
        type:DataTypes.STRING
    },
    phone_no:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:Sequelize.fn("now")
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:Sequelize.fn("now")
    }

});

export default user
