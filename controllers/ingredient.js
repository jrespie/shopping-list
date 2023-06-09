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
        res.status(201).json({
          status: "success",
          message: "ingredient created!",
        });
      }
    );
   };