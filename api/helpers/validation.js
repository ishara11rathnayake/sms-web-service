const Joi = require("@hapi/joi");

/**
 * validate register data
 * @param {*} data
 */
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

/**
 * validate login data
 * @param {*} data
 */
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
