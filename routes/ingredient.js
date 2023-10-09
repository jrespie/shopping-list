/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the ingredient
 *         name:
 *           type: string
 *           description: The name of the ingredient
 *       example:
 *         id: ef984a96-cb5e-11ed-b1fe-4bf2de81eb15
 *         name: Burger buns
 */


const express = require("express");
const ingredientControllers = require("../controllers/ingredient");
const router = express.Router();

router.route("/ingredient").get(ingredientControllers.getAllIngredients).post(ingredientControllers.createIngredient)
router
 .route("/ingredient/:id")
 .get(ingredientControllers.getIngredient)
 .patch(ingredientControllers.updateIngredient);
//  .delete(controllers.deleteTodo);
module.exports = router;