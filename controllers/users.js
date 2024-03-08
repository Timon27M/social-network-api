const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const IncorrectEmailError = require("../errors/IncorrectEmailError");
const UnauthorizatedError = require("../errors/UnauthorizatedError");

const User = require("../models/user");

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("Пользователь не найден");
    })
    .then((user) => {
      res.send({
        name: user,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Пользователь не найден"));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const {
    name,
    email,
    phone,
    avatar,
  } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
      phone,
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({
        name: user.name,
        phone: user.phone,
        email: user.email,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        return next(new IncorrectEmailError('Пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    phone,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      phone,
      email,
      password: hash,
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret');
      res.status(200).send({
        token,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new IncorrectEmailError('Пользователь с таким email уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret');
      res.send({
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatar: user.avater,
        token,
      });
    })
    .catch(() => {
      next(new UnauthorizatedError('Неправильный логин или пароль'));
    });
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  loginUser,
};
