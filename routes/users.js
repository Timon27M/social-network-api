const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");

const { validationUpdateUser } = require('../middlewares/validators');

router.get("/user", getUser);
router.patch('/user', validationUpdateUser, updateUser);

module.exports = router;
