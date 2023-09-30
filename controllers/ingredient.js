const AppError = require("../utils/appError");
const conn = require("../services/db");

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
    conn.query(
      "INSERT INTO ingredient (name) VALUES(?)",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        conn.query(`SELECT * FROM ingredient WHERE id='${uuid}'`,function(err,data,fields) {
          res.status(201).json({
            status: "success",
            message: "ingredient created!",
            data: data[0],
          });
        })
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