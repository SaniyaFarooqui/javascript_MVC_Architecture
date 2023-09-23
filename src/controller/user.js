import user from "../models/user.js";
import { Op, json } from "sequelize";
import UserActivty from "../models/userActivity.js";
import post from "../models/post.js";
import like from "../models/like.js";
import comment from "../models/comment.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Papa from "papaparse";
import excel from "exceljs";
import fs from "fs";
import Stream from "stream";
import { response } from "express";
class UserController {
  constructor() {}

  CreateUser = async (req, res) => {
    let userData = req.body;
    let file = req.file;
    console.log(file);
    if (
      userData.name == null ||
      userData.name == undefined ||
      userData.email == null ||
      userData.email == undefined ||
      userData.password == null ||
      userData.password == undefined
    ) {
      res.status(400).json({ error: "Name / Email required" });
    } else {
      try {
        let filepath =
          process.env.server + "/" + file.destination + "/" + file.filename;
        let salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashpassword;
        userData.user_image = filepath;
        let response = await user.create(userData);
        console.log(response);
        if (response == null || response == undefined) {
          res
            .status(400)
            .json({ error: "operation couldn't complete due to error" });
        } else {
          res
            .status(200)
            .json({ message: "user created successfully ", data: response });
        }
      } catch (error) {
        if (!error.errors) {
          res.status(400).json({ error: error.message });
        } else {
          let validation_error = {};
          for await (let valid_error of error.errors) {
            validation_error[`${valid_error.path}`] = valid_error.message;
          }
          res.status(400).json({ validation_error: validation_error });
        }
      }
    }
  };

  LoginController = async (req, res) => {
    let { email, password } = req.body;
    if (
      email == undefined ||
      (email == null && password == null) ||
      password == undefined
    ) {
      res.status(400).json({ error: "Email | password Required" });
    } else {
      try {
        let isEmailExist = await user.findOne({
          where: {
            email: email,
          },
        });
        console.log(isEmailExist);
        if (isEmailExist == null) {
          res.status(400).json({
            error: "User with this email not registered please Sign up",
          });
        } else {
          if (await bcrypt.compare(password, isEmailExist.password)) {
            let token = jwt.sign(
              { id: isEmailExist.id, userName: isEmailExist.name },
              process.env.jwt_secret,
              { expiresIn: "30min" }
            );
            let refreshToken = jwt.sign(
              { id: isEmailExist.id },
              process.env.jwt_secret,
              { expiresIn: "356d" }
            );
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: true,
            });
            res.cookie("accessToken", token, { httpOnly: true, secure: true });
            res.status(200).json({ user: isEmailExist });
          } else {
            res.status(200).json({ error: "Invalid Password" });
          }
        }
      } catch (error) {
        res.status(400).json({ error: error });
      }
    }
  };

  RefreshToken = async (req, res) => {
    let refreshToken = req.params.token;
    if (refreshToken == null || refreshToken == undefined) {
      res.status(400).json({ error: "refresh token required" });
    } else {
      try {
        let decode = jwt.verify(refreshToken, process.env.jwt_secret);
        console.log(decode.id);
        if (decode == null || decode == undefined) {
          res.status(400).json({ error: "invalid token" });
        } else {
          let userData = await user.findByPk(decode.id);
          if (userData == null || userData == undefined) {
            res.status(400).json({ error: "invalid refresh token" });
          } else {
            let token = jwt.sign(
              { id: userData.id, userName: userData.name },
              process.env.jwt_secret,
              { expiresIn: "30min" }
            );
            res.status(200).json({ accesToken: token /*,user:userData*/ });
          }
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  UpdateUser = async (req, res) => {
    let { id } = req.params;
    let userData = req.body;
    if (id == null || id == undefined) {
      res.status(400).json({ error: "please provide the id to update" });
    } else {
      try {
        let response = await user.update(userData, {
          where: {
            id: id,
          },
        });
        if (response > 0) {
          res.status(200).json({ message: "Update successfully" });
        } else {
          res.status(400).json({ error: "Update fail please try again" });
        }
      } catch (error) {
        if (!error.errors) {
          res.status(400).json({ error: error.message });
        } else {
          let validation_error = {};
          for await (let response of error.errors) {
            validation_error[`${response.path}`] = response.message;
          }
          res.status(400).json({ error: validation_error });
        }
      }
    }
  };

  GetAllUsers = async (req, res) => {
    let page = req.params.page;
    let limit = req.params.limit;
    if (
      page == null ||
      page == undefined ||
      limit == null ||
      limit == undefined ||
      page == 0 ||
      limit == 0
    ) {
      page = 0;
      limit = 10;
    }
    let offset = page * limit;
    try {
      let response = await user.findAndCountAll({
        offset: offset,
        limit: limit,
        include: [
          { model: UserActivty },
          {
            model: post,
            include: [{ model: comment }, { model: like }],
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        order: [["updatedAt", "DESC"]],
        attributes: {
          exclude: ["country"],
        },
      });
      if (response.count == 0 || response.rows.length == 0) {
        res.status(200).json({ message: "no data avaliable" });
      } else {
        res.status(200).json({ data: response });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  ExportUserToCSV = async (req, res) => {
    try {
      let UserData = await user.findAndCountAll({
        attributes: { exclude: ["id", "password"] },
      });
      if (
        UserData.rows.length == null ||
        UserData == null ||
        UserData == undefined
      ) {
        res.status(400).json({ error: "no user found to export" });
      } else {
        let user_parser = JSON.parse(JSON.stringify(UserData.rows));
        let csv = Papa.unparse(user_parser);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=User${Date.now().toString()}.csv`
        );
        res.status(200).send(csv);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  ImportUserFromExcel_or_CSV = async (req, res) => {
    let file = await req.file;
    let eachData = [];
    let finaldata = [];
    if (file == null || file == undefined) {
      res.status(400).json({ error: "Please Select File to Import" });
    } else {
      try {
        let data = JSON.parse(
          JSON.stringify(file.buffer.toString().split("\r\n"))
        );
        let header = data[0];
        data.shift();
        let key = header.split(",");
        data.forEach((value) => {
          eachData.push(value.split(","));
        });
        // for (let response of eachData) {
        //   let object = {};
        //   for (let i = 0; i < key.length; i++) {
        //     object[`${key[i]}`] = response[i];
        //     finaldata.push(object);
        //   }
        // }
        // let response = await user.bulkCreate(finaldata);
        // console.log(response);
        res.status(200).json({ data: finaldata });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  ExportUserToExcel = async (req, res) => {
    try {
      let userData = await user.findAndCountAll();
      if (userData == null || userData == undefined) {
        res.status(200).json({ message: "No Data Found" });
      } else {
        let key = Object.keys(userData.rows[0].dataValues);
        let datacolumns = [];
        for (let i = 0; i < key.length; i++) {
          let object = {};
          object["header"] = key[i].split(",")[0];
          object["key"] = key[i];
          object["width"] = 20;
          datacolumns.push(object);
        }
        let stream = new Stream();
        let workbook = new excel.Workbook();
        workbook.creator = "Saniya";
        let worksheet = workbook.addWorksheet("User's");
        worksheet.columns = datacolumns;
        userData.rows.forEach((user) => {
          worksheet.addRow(user).alignment = { horizontal: true };
        });
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
        });
        worksheet.getRow(1).eachCell((cell) => {
          cell.alignment = { horizontal: true };
        });
        let excelFile = await workbook.xlsx.writeBuffer({
          filename: `User.xlsx`,
          stream: stream,
        });
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename=User.xlsx`);
        res.send(excelFile);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getTimeStamp = async () => {
    return Math.floor(Date.now() / 1000);
  };

  SearchUsers = async (req, res) => {
    let keyword = req.query?.keyword;
    let filterBy = req.query?.filterBy;
    console.log(keyword);

    if (keyword == null || keyword == undefined) {
      res
        .status(200)
        .json({ meassage: "please type Data for something in search box" });
    } else {
      try {
        let response = await user.findAndCountAll({
          where: {
            [Op.or]: {
              name: {
                [Op.like]: `%${keyword}%`,
              },
              email: {
                [Op.like]: `%${keyword}%`,
              },
            },
            country: {
              [Op.like]: `%${filterBy}%`,
            },
          },
        });
        if (response.rows.length == 0 || response.count == 0) {
          res.status(200).json({ message: "No Data Avalible" });
        } else {
          res.status(200).json({ data: response });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  GetUserById = async (req, res) => {
    let id = req.params.id;
    if (id == null || id == undefined) {
      res.status(200).json({ meassage: "please provide id" });
    } else {
      try {
        let response = await user.findByPk(id);
        if (response == null || response == undefined) {
          res.status(200).json({ message: "No User Found" });
        } else {
          res.status(200).json({ data: response });
        }
      } catch (error) {
        res.status(400).json({ error: error, message });
      }
    }
  };

  DeleteUser = async (req, res) => {
    let id = req.params.id;
    if (id == null || id == undefined) {
      res.status(200).json({ message: "please provide id" });
    } else {
      try {
        let response = await user.destroy({
          where: { id: id },
        });
        if (response == 0) {
          res.status(400).json({ error: "can't delete kindly try again" });
        } else {
          res.status(200).json({ message: "Deleted Successfully" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  BulkDeleteUser = async (req, res) => {
    let { ids } = req.body;
    console.log(ids);
    if (ids.length == 0) {
      res.status(400).json({ error: "please provide ids to delete" });
    } else {
      try {
        let response = await user.destroy({
          where: { id: ids },
        });
        if (response == null || response == undefined || response == 0) {
          res.status(400).json({ error: "cannot delete please try again " });
        } else {
          res.status(200).json({ message: "deleted successfully" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  LogoutController = (req, res) => {
    try {
      res.cookie("accessToken", "", { maxAge: 1 });
      res.cookie("refreshToken", "", { maxAge: 1 });
      res.status(200).json({ error: "Logout Successfully" });
      res.end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
export default UserController;
