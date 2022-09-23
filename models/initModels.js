const { Meal } = require("./mealM");
const { Order } = require("./orderM");
const { Eatery } = require("./restaurantM");
const { Review } = require("./reviewM");
const { User } = require("./userM");

const initModels = () => {
  Eatery.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Eatery);

  Eatery.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Eatery);

  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);
};
module.exports = { initModels };
