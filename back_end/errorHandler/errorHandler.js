module.exports = (error, req, res, next) => {
  res.status(error.status).json({
    Error: {
      message: error.message,
      status: error.status,
    },
  });
};
