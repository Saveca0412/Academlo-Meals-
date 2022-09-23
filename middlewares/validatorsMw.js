const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);

    const message = errorMessages.join(". ");

    return res.status(400).json({
      status: "error",
      message,
    });
  }
  next();
};

const userValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().trim().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6, max: 6 })
    .withMessage("Password must be  6 characters"),
  checkValidations,
];
const mealValidator = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name can not be empty")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),
  body("price")
    .isNumeric()
    .withMessage("price must be a number")
    .notEmpty()
    .withMessage("price can not be empty"),
];
const createResValidator = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name can not be empty")
    .isLength({ min: 5 })
    .withMessage("name must be at least 5 characters"),
  body("address")
    .isString()
    .withMessage("address must be a string")
    .notEmpty()
    .withMessage("address can not be empty"),
  body("rating")
    .isNumeric({ min: 1, max: 5 })
    .withMessage("rating must be a number")
    .notEmpty()
    .withMessage("rating can not be empty"),
];

const createReviewValidator = [
  body("comment")
    .isString()
    .withMessage("comment must be a string")
    .notEmpty()
    .withMessage("comment can not be empty"),
  body("rating")
    .isNumeric()
    .isLength({ min: 1, max: 1 })
    .withMessage("rating must be a number")
    .notEmpty()
    .withMessage("rating can not be empty"),
];

module.exports = {
  userValidator,
  mealValidator,
  createResValidator,
  createReviewValidator,
};
