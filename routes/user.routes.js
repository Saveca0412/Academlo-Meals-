const express = require("express");

const {
  createUser,
  updateUser,
  deleteUser,
  login,
  getUserOrders,
  getOrderById,
} = require("../controllers/users.controller");

const { userExists, orderExists } = require("../middlewares/userMw");
const {
  protectSession,
  protectUsersAccount,
  checkUserRole,
  protectUsersOrders,
} = require("../middlewares/authMw");
const { userValidator } = require("../middlewares/validatorsMw");

const userRouter = express.Router();

userRouter.post("/signup", userValidator, createUser);

userRouter.post("/login", login);

userRouter.use(protectSession);

userRouter.patch("/:id", userExists, protectUsersAccount, updateUser);

userRouter.delete("/:id", userExists, protectUsersAccount, deleteUser);

userRouter.get("/orders", getUserOrders);

userRouter.get("/orders/:id", orderExists, protectUsersOrders, getOrderById);

module.exports = { userRouter };
