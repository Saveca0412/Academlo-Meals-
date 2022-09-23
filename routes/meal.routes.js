const express = require("express");
const {
  createMeal,
  getAllMeals,
  getMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/meal.controller");
const { protectSession, checkUserRole } = require("../middlewares/authMw");
const { checkMeal } = require("../middlewares/mealMw");
const { checkEatery } = require("../middlewares/restaurants.Mw");
const { mealValidator } = require("../middlewares/validatorsMw");

const mealRouter = express.Router();

mealRouter.get("/", getAllMeals);
mealRouter.get("/:id", checkMeal, getMeal);

mealRouter.use(protectSession);
mealRouter.post("/:id", mealValidator, checkEatery, createMeal);
mealRouter.patch("/:id", checkMeal, checkUserRole, updateMeal);
mealRouter.delete("/:id", checkMeal, checkUserRole, deleteMeal);

module.exports = { mealRouter };
