const { Eatery } = require("../models/restaurantM");
const { Review } = require("../models/reviewM");

const { catchAsync } = require("../util/catchAsyncUtil");
const { appError } = require("../util/appError.util");

const checkEatery = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const eatery = await Eatery.findOne({ where: { id }, status: "active" });
  if (!eatery) {
    return next(
      new appError(
        `Restaurant with id ${id} does not exist in this server.`,
        404
      )
    );
  }
  if (eatery.status !== "active") {
    return next(
      new appError(`Restaurant with id ${id} is not active right now.`, 403)
    );
  }
  req.eatery = eatery;
});

const checkReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findByPk(id);
  if (!review) {
    return next(
      new appError(`Review with id ${id} does not exist in this server.`, 404)
    );
  }
  req.review = review;
});

const checkReviewOwner = catchAsync(async (req, res, next) => {
  const { review, sessionUser } = req;
  if (sessionUser.id !== review.userId) {
    return next(
      new appError(
        `The review with id (${review.id}) does not belong to you.`,
        403
      )
    );
  }
});

module.exports = {
  checkEatery,
  checkReview,
  checkReviewOwner,
};
