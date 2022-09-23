const express = require("express");
const {
  getAllEateries,
  createEatery,
  getOneEatery,
  updateEatery,
  deleteEatery,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/restaurants.controller");
const { protectSession, checkUserRole } = require("../middlewares/authMw");
const {
  checkEatery,
  checkReview,
  checkReviewOwner,
} = require("../middlewares/restaurants.Mw");
const {
  createResValidator,
  createReviewValidator,
} = require("../middlewares/validatorsMw");

const eateryRouter = express.Router();

eateryRouter.get("/", getAllEateries);
eateryRouter.get("/:id", checkEatery, getOneEatery);

eateryRouter.use(protectSession);

eateryRouter.post("/", checkUserRole, createResValidator, createEatery);

eateryRouter.patch("/:id", checkUserRole, checkEatery, updateEatery);

eateryRouter.delete("/:id", checkUserRole, checkEatery, deleteEatery);

eateryRouter.post(
  "/reviews/:id",
  checkEatery,
  createReviewValidator,
  createReview
);

eateryRouter.patch(
  "/reviews/:id",
  createReviewValidator,
  checkReview,
  checkReviewOwner,
  updateReview
);

eateryRouter.delete(
  "/reviews/:id",
  checkReview,
  checkReviewOwner,
  deleteReview
);

module.exports = { eateryRouter };
