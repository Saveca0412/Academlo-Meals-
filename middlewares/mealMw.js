const { Meal } = require("../models/mealM");

const { catchAsync } = require("../util/catchAsyncUtil");
const { appError } = require("../util/appError.util");

const checkMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({ where: { id } });
  if (!meal) {
    return next(new appError("Meal Not found", 400));
  }
  if (meal.status !== "active") {
    return next(new appError("Meal not active", 403));
  }
  req.meal = meal;
});

module.exports = { checkMeal };
