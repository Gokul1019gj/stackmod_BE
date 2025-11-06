export const validate = (schema) => (req, res, next) => {
  const toValidate = {};
  if (schema.body) toValidate.body = schema.body.validate(req.body, { abortEarly: false });
  if (schema.params) toValidate.params = schema.params.validate(req.params);
  if (schema.query) toValidate.query = schema.query.validate(req.query);

  const errors = Object.values(toValidate)
    .filter(r => r && r.error)
    .map(r => r.error.details.map(d => d.message))
    .flat();

  if (errors.length) {
    return res.status(400).json({ success:false, message:'Validation error', errors });
  }

  if (toValidate.body && toValidate.body.value) req.body = toValidate.body.value;
  if (toValidate.params && toValidate.params.value) req.params = toValidate.params.value;
  if (toValidate.query && toValidate.query.value) req.query = toValidate.query.value;

  next();
};
