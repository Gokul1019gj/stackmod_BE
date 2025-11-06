export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: 'Not Found' });
};

export const errorConverter = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  const code = err.statusCode || 500;
  res.status(code).json({
    success: false,
    message: err.message || 'Server Error'
  });
};
