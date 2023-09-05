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
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                msg:"Name can't be empty"
            },
            // :{
            //     RegExp:"^[\\p{L} .'-]+$",
            //     msg:"Invalid Name"
            // }
        }
    },
    age:{
        type:DataTypes.BIGINT,
        validate:{
            notEmpty:{
                msg :"Age is required"
            },
            min:{
                args:18,
                msg:"Age must be above 18"
            },
            max:{
                args:80,
                msg:"maximum age allowed is 80"
            }
        }
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
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                msg:"password required"
            },
        }
    },
    user_image:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.TEXT
    },
    country:{
        type:DataTypes.STRING
    },
    state:{
        type:DataTypes.STRING
    },
    city:{
        type:DataTypes.STRING
    },
    phone_no:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.STRING,
        defaultValue:new Date().toISOString()
    },
    updatedAt:{
        type:DataTypes.STRING,
        defaultValue: new Date().toISOString()
    }
},
{
    
}
);

export default user
