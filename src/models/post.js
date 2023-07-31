import { Sequelize,DataTypes, DATE } from "sequelize";
let sequelize = new Sequelize()

let post = sequelize.define('Posts',{
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
        defaultValue:sequelize.fn('now')
    },
    tag:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:sequelize.fn('now')
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:sequelize.fn('now')
    }
});
export default post;