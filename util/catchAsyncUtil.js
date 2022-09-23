const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next)
      .then(() => next())
      .catch(error => next(error));
  };
};
module.exports = { catchAsync };
