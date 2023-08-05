import { Sequelize , DataTypes} from "sequelize";
import database from "../config/database.js";


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
        allowNull:false,
        unique:{
            msg:"Email already exists"
        },
        validate:{
            notEmpty:{
                msg:"Email Required"
            },
            isEmail:{
                msg:"Incorrect Email"
            },
            
        }
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
        defaultValue:new Date().toISOString()
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue: new Date().toISOString()
    }

});

export default user
