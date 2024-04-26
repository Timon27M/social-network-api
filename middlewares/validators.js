const { celebrate, Joi } = require('celebrate');

const validationLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    phone: Joi.number().min(100000).max(999999999999).required(),
    password: Joi.string().required().min(6),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    avatar: Joi.string().required(),
  }),
});

const validationSearchUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validationLoginUser,
  validationCreateUser,
  validationUpdateUser,
  validationSearchUser,
};
