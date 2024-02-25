const router = require("express").Router();

const auth = require("../middlewares/auth");
const { createUser, loginUser } = require("../controllers/users");
const routesUser = require("./users");
const NotFoundError = require("../errors/NotFoundError");

const {
  validationCreateUser,
  validationLoginUser,
} = require("../middlewares/validators");

router.post("/signin", validationLoginUser, loginUser);
router.post("/signup", validationCreateUser, createUser);

router.use(auth);
router.use("/", routesUser);

router.use('/', (req, res, next) => next(new NotFoundError('Произошла ошибка: Неправильный путь')));

module.exports = router;
