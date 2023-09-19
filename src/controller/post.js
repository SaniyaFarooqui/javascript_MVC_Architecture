import { Op, or } from "sequelize";
import comment from "../models/comment.js";
import like from "../models/like.js";
import post from "../models/post.js";
import user from "../models/user.js";
import Papa from "papaparse";
import excel from "exceljs";
import stream from "stream";
class PostController {
  constructor() {}

  createPost = async (req, res) => {
    let userId = req.user?.id;
    let postData = req.body;
    let file = req.file;
    console.log(file);
    if (postData == null || postData == undefined) {
      res.status(400).json({ message: "Please fill the required field" });
    } else if (file == null || file == undefined) {
      res.status(400).json({ message: "Please select atleast 1 imageas  " });
    } else {
      try {
        let filepath =
          process.env.server + "/" + file.destination + "/" + file.filename;
        postData.post_image = filepath;
        postData.userId = userId;
        if (postData.title == undefined || postData.location == undefined) {
          res
            .status(400)
            .json({ error: "Please enter the title / location of post" });
        } else {
          let response = await post.create(postData);
          console.log(response);
          if (response == null || response == undefined) {
            res.status(400).json({
              error: "Operation cannot complete due to error please try again",
            });
          } else {
            res.status(200).json({ data: response });
          }
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  updatePost = async (req, res) => {
    let { id } = req.params;
    let postData = req.body;
    if (
      postData == null ||
      postData == undefined ||
      id == undefined ||
      id == null
    ) {
      res.status(400).json({ message: "Please fill the required field" });
    } else {
      try {
        let response = await post.update(postData, { where: { id: id } });
        console.log(response);
        if (response == 0) {
          res.status(400).json({
            error: "Operation cannot complete due to error please try again",
          });
        } else if (response > 0) {
          res.status(200).json({ message: "Updated Successfully" });
        } else {
          res
            .status(400)
            .json({ error: "Something went wrong please try again" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  getAllPost = async (req, res) => {
    let page = req.params.page;
    let limit = req.params.limit;
    if (
      page == undefined ||
      page == null ||
      limit == undefined ||
      limit == null
    ) {
      page = 0;
      limit = 10;
    }
    let offset = page * limit;
    console.log(offset);
    try {
      let response = await post.findAndCountAll({
        offset: offset,
        limit: limit,
        include: [
          { model: comment },
          { model: like },
          { model: user, attributes: { exclude: ["createdAt", "updatedAt"] } },
        ],
        order: [["updatedAt", "DESC"]],
        attributes: {
          exclude: ["userId"],
        },
      });
      console.log(response);
      if (response.count == 0 || response.rows.length == 0) {
        res.status(200).json({ message: "No Data Available" });
      } else {
        res.status(200).json({ data: response });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  ExportPostToCSV = async (req, res) => {
    let user_attributes = ["name", "age", "email", "country", "state"];
    let comment_attributes = ["description"];
    try {
      let postData = await post.findAndCountAll({
        include: [
          { model: comment, attributes: comment_attributes },
          { model: user, attributes: user_attributes },
        ],
        attributes: { exclude: ["userId", "id", "location"] },
        raw: true,
      });
      if (
        postData.rows.length == 0 ||
        postData == null ||
        postData === undefined
      ) {
        res.status(200).json({ error: "No Post Found to Export" });
      } else {
        let post_parser = JSON.parse(JSON.stringify(postData.rows));
        let csv = Papa.unparse(post_parser);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=Post${Date.now().toString()}.csv`
        );
        res.status(200).send(csv);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  };

  ExportPostToExcel = async (req, res) => {
    try {
      let postData = await post.findAndCountAll({ raw: true });
      console.log(postData);
      if (
        postData == null ||
        postData == undefined ||
        postData.rows.length == 0
      ) {
        res.status(200).json({ message: "No post data found" });
      } else {
        let key = Object.keys(postData.rows[0].dataValues);
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
        workbook.creator = "saniya";
        let worksheet = workbook.addWorksheet("Post's");
        worksheet.columns = datacolumns;
        postData.rows.forEach((post) => {
          worksheet.addRow(post).alignment = { horizontal: true };
        });
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
        });
        worksheet.getRow(1).eachCell((cell) => {
          cell.alignment = { horizontal: true };
        });
        let excelFile = await workbook.xlsx.writeBuffer({
          filename: "Post.xlsx",
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

  getAllPostByUserId = async (req, res) => {
    let { id } = req.params;
    let page = req.params.page;
    let limit = req.params.limit;
    if (
      page == null ||
      page == undefined ||
      page == 0 ||
      limit == null ||
      limit == undefined ||
      limit == 0
    ) {
      page = 0;
      limit = 10;
    }
    let offset = page * limit;
    try {
      let response = await post.findAndCountAll({
        where: {
          user_id: id,
        },
        offset: offset,
        limit: limit,
      });
      if (response.count == 0 || response.rows.length == 0) {
        res.status(200).json({ message: "No Post Found" });
      } else {
        res.status(200).json({ data: response });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getPostById = async (req, res) => {
    let id = req.params.id;
    if (id == undefined || id == null) {
      res.status(400).json({ error: "Please provide the Id of post" });
    } else {
      try {
        let response = await post.findByPk(id);
        if (response == null) {
          res.status(200).json({ message: "No Data Found" });
        } else {
          res.status(200).json({ data: response });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  SearchPosts = async (req, res) => {
    let keyword = req.query?.keyword;
    let filterBy = req.query.filterBy;
    filterBy = filterBy == null || filterBy == undefined ? "" : filterBy;
    if (keyword == null || keyword == undefined) {
      res.status(200).json({ message: "please type something in search box" });
    } else {
      try {
        let response = await post.findAndCountAll({
          where: {
            [Op.or]: {
              title: {
                [Op.like]: `%${keyword}%`,
              },
              tag: {
                [Op.like]: `%${keyword}%`,
              },
              "$user.email$": {
                [Op.like]: `%${keyword}%`,
              },
              "$user.name$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            location: {
              [Op.like]: `%${filterBy}%`,
            },
          },
          include: [{ model: like }, { model: comment }, { model: user }],
          order: [["createdAt", "DESC"]],
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

  deletePost = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    if (id == null || id == undefined || id == "") {
      res.status(400).json({ error: "Please provide id to Delete" });
    } else {
      let response = await post.destroy({ where: { id: id } });
      if (response == 0) {
        res.status(400).json({ error: "Coldnt delete post please try again" });
      } else {
        res.status(200).json({ message: "Deleted Successfully" });
      }
    }
  };

  BulkDeletePost = async (req, res) => {
    let { ids } = req.body;
    if (ids.length == 0 || ids == null || ids == undefined) {
      res.status(400).json({ error: "please provide ids" });
    } else {
      try {
        let response = await post.destroy({
          where: { id: ids },
        });
        if (response == null || response == undefined) {
          res.status(400).json({ error: "couldnot delete try again" });
        } else {
          res.status(200).json({ message: "deleted successfully" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };
}

export default PostController;
