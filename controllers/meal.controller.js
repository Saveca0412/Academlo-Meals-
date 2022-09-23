const { Meal } = require("../models/mealM");
const { Eatery } = require("../models/restaurantM");
const { appError } = require("../util/appError.util");
const { catchAsync } = require("../util/catchAsyncUtil");

const createMeal = catchAsync(async (req, res, next) => {
  const restaurantId = req.params.id;
  const { name, price } = req.body;
  const newMeal = await Meal.create({
    name,
    price,
    restaurantId,
  });
  res.status(201).json({
    status: "success",
    data: { newMeal },
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: "active" },
    include: [{ model: Eatery, exclude: ["createdAt", "updatedAt"] }],
  });
  if (!meals) {
    return next(new appError(" Meals list is empty.", 404));
  }
  res.status(200).json({
    status: "success",
    data: { meals },
  });
});

const getMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: { id },
    include: [{ model: Eatery, exclude: ["createdAt", "updatedAt"] }],
  });
  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;
  await meal.update({
    name,
    price,
  });
  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await meal.update({ status: "disable" });
  res.status(204).json({ status: "success" });
});

module.exports = { createMeal, getAllMeals, getMeal, updateMeal, deleteMeal };
