/**
 * @swagger
 * components:
 *   schemas:
 *     BaseResponse:
 *       type: objecct
 *       properties:
 *         status:
 *           type: string
 *         length:
 *           type: integer
 *     Recipes:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseResponse'
 *         - type: object
 *           properties:
 *             recipes:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeResponse'
 *     RecipeResponse:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - created_date
 *         - updated_date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the recipe
 *         name:
 *           type: string
 *           description: The name of the recipe
 *         created_date:
 *           type: string
 *           description: The date the recipe was created
 *         updated_date:
 *           type: string
 *           description: The date the recipe was last updated
 *         deleted_date:
 *           type: string
 *           description: The date the recipe was deleted, NULL if still active
 *     RecipeRequest:
 *        type: object
 *        required:
 *        - name
 *        properties:
 *          name:
 *            type: string
 *            description: The name of the recipe
 */


const express = require("express");
const controllers = require("../controllers/recipe");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recipe
 *   description: The recipe managing API
 * /recipe:
 *   get:
 *     summary: Get all recipes
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: include status=deleted to find deleted recipes
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: All active recipe details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipes'
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeRequest'
 *     responses:
 *       200:
 *         description: The created recipe.
 *         content:
 *           application/json:
 *             schema:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *               $ref: '#/components/schemas/RecipeResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 * /recipe/{id}:
 *   get:
 *     summary: Get a single recipe
 *     parameters:
 *     - in: path
 *       name: id
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: The recipe by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/RecipeResponse'
 *       404:
 *         description: The recipe was not found
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: Update a single recipe
 *     parameters:
 *     - in: path
 *       name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeRequest'
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: Recipe updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/RecipeResponse'
 *       404:
 *         description: The recipe was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete a single recipe
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *     tags: [Recipe]
 *     responses:
 *       204:
 *         description: Recipe deleted
 *       404:
 *         description: The recipe was not found
 */

router.route("/recipe").get(controllers.getAllRecipes).post(controllers.createRecipe)
router
  .route("/recipe/:id")
  .get(controllers.getRecipe)
  .patch(controllers.updateRecipe)
  .delete(controllers.deleteRecipe);

router.route("/recipe/:id/ingredient").post(controllers.createRecipeIngredient)

module.exports = router;