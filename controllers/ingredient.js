const AppError = require("../utils/appError");
const conn = require("../services/db");
const crypto = require("crypto")

exports.getAllIngredients = (req, res, next) => {
    conn.query("SELECT * FROM ingredient", function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };

   exports.createIngredient = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 400));
    const values = [req.body.name];
    const uuid = crypto.randomUUID();
    conn.query(
      `INSERT INTO ingredient (id,name) VALUES('${uuid}',?)`,
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        conn.query(`SELECT * FROM ingredient WHERE id='${uuid}'`,function(err,data,fields) {
          res.status(201).json({
            status: "success",
            message: "ingredient created!",
            data: data[0],
          });
        });
      }
    );
   };

   exports.getIngredient = (req, res, next) => {
    const values = [req.params.id];
    conn.query(
      "SELECT * FROM ingredient WHERE id = ?",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        if (data?.length <1) return next(new AppError("Record not found",404));
        res.status(200).json(data[0]);
      }
    );
   }

   exports.updateIngredient = (req, res, next) => {
    if (!req.body.name) return next(new AppError("Name is required", 400));
    const values = [req.body.name,req.params.id];
    conn.query(
      `UPDATE ingredient SET name = '${req.body.name}' WHERE id = '${req.params.id}'`,
      values,
      function(err,data,fields) {
        if(err) return next(new AppError(err,500));
        if(data?.affectedRows<1) return next(new AppError("Recipe not found",404))
        conn.query(`SELECT * FROM ingredient WHERE id='${req.params.id}'`,function(err,data,fields) {
          res.status(200).json({
            status: "success",
            message: "ingredient updated",
            data: data[0],
          })
        })
      }
    )
   }