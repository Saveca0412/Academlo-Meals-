const { Eatery } = require("../models/restaurantM");
const { Review } = require("../models/reviewM");

const { catchAsync } = require("../util/catchAsyncUtil");
const { appError } = require("../util/appError.util");

const createEatery = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;
  const newEatery = await Eatery.create({
    name,
    address,
    rating,
  });
  res.status(201).json({
    status: "success",
    data: { newEatery },
  });
});

const getAllEateries = catchAsync(async (req, res, next) => {
  const eateries = await Eatery.findAll({
    where: { status: "active" },
    include: { model: Review, where: { status: "active" } },
  });
  res.status(200).json({
    status: "success",
    data: { eateries },
  });
});

const getOneEatery = catchAsync(async (req, res, next) => {
  const { id } = req.eatery;
  const eatery = await Eatery.findOne({
    where: { id },
    status: "active",
    include: { model: Review },
  });
  res.status(200).json({
    status: "succes",
    data: { eatery },
  });
});

const updateEatery = catchAsync(async (req, res, next) => {
  const { name, adress } = req.body;
  const { eatery } = req;
  await eatery.update({ name, adress });
  res.status(200).json({
    status: "success",
    data: { eatery },
  });
});

const deleteEatery = catchAsync(async (req, res, next) => {
  const { eatery } = req;
  await eatery.update({ status: "disable" });
  res.status(204).json({
    status: "success",
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const restaurantId = req.eatery.id;
  const userId = req.sessionUser.id;
  const newReview = await Review.create({
    userId,
    comment,
    restaurantId,
    rating,
  });
  if (rating > 5 || rating < 1) {
    return next(
      new appError("rating has to be an  integer between 1 and 5.", 400)
    );
  }
  res.status(201).json({
    status: "success",
    data: { newReview },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;
  await review.update({ comment, rating });
  if (rating > 5 || rating < 1) {
    return next(
      new appError("rating has to be an  integer between 1 and 5.", 400)
    );
  }
  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  await review.update({ status: "deleted" });
  res.status(204).json({ status: "success" });
});

module.exports = {
  createEatery,
  getAllEateries,
  getOneEatery,
  updateEatery,
  deleteEatery,
  createReview,
  updateReview,
  deleteReview,
};
