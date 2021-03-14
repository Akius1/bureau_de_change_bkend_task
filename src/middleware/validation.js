const Joi = require('joi');

const validateUser = (body) => {
    const userSchema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    return userSchema.validate(body, { abortEarly: false });
}

const validateLogin = (body) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return userSchema.validate(body, { abortEarly: false });
}

module.exports = { validateUser, validateLogin };
