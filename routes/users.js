const router = require("express").Router();
const { getUser, updateUser, getSearchUser } = require("../controllers/users");

const { validationUpdateUser, validationSearchUser } = require('../middlewares/validators');

router.get("/user", getUser);
router.get("/user-search", validationSearchUser, getSearchUser);
router.patch('/user', validationUpdateUser, updateUser);

module.exports = router;
