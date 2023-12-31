import {Sequelize} from "sequelize";
import dotenv from 'dotenv';
dotenv.config()

let database = new Sequelize(process.env.MySQL_DATABASE_NAME, process.env.MySQL_USERNAME, process.env.MySQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});
export default database;