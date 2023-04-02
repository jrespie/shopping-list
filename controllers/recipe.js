const AppError = require("../utils/appError");
const conn = require("../services/db");
const crypto = require("crypto")

exports.getAllRecipes = (req, res, next) => {
  let query=""
  if(req.query.status=='deleted'){
    query="SELECT * FROM recipe where deleted_date is not null order by created_date"
  }
  else {
    query = "SELECT * FROM recipe where deleted_date is null order by created_date"
  }
    conn.query(query, function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        recipes: data,
      });
    });
   };

   exports.createRecipe = (req, res, next) => {
    if (!req.body.name) return next(new AppError("Name field is required", 400));
    const values = [req.body.name];
    const uuid = crypto.randomUUID()  
    conn.query(
      `INSERT INTO recipe (id,name) VALUES('${uuid}',?)`,
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        conn.query(`SELECT * FROM recipe WHERE id='${uuid}'`,function(err,data,fields) {
          res.status(201).json({
            status: "success",
            message: "recipe created!",
            data: data[0],
          });
        })
      }
    );
   };

   exports.getRecipe = (req, res, next) => {
    const values = [req.params.id];
    conn.query(
      "SELECT * FROM recipe WHERE id = ?",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        if (data?.length <1) return next(new AppError("Record not found",404));
        res.status(200).json(data[0]);
      }
    );
   }

   exports.updateRecipe = (req, res, next) => {
    if (!req.body.name) return next(new AppError("Name field is required", 400));
    const values = [req.body.name, req.params.id];
    conn.query(
      "UPDATE recipe SET name = ? WHERE id = ?",
      values,
      function(err,data,fields) {
        if(err) return next(new AppError(err,500));
        if(data?.affectedRows<1) return next(new AppError("Recipe not found",404))
        conn.query(`SELECT * FROM recipe WHERE id='${req.params.id}'`,function(err,data,fields) {
          res.status(200).json({
            status: "success",
            message: "recipe updated",
            data: data[0],
          })
        })
      }
    )
   }

   exports.deleteRecipe = (req, res, next) => {
    const values = [req.params.id];
    conn.query(
      "UPDATE recipe SET deleted_date = current_timestamp WHERE id = ?",
      values,
      function(err,data,fields) {
        if(err) return next(new AppError(err,500));
        if(data?.affectedRows<1) return next(new AppError("Recipe not found",404))
        res.status(204).json()
      }
    )
   }

   exports.createRecipeIngredient = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 400));
    const values = [req.params.id,req.body.ingredient_id,req.body.quantity,req.body.unit]
    conn.query(
      "INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit) VALUES(?)",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "ingredient added to recipe!",
        });
      }
    )
   }