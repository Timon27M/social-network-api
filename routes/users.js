const router = require("express").Router();
const {
  getUser,
  updateUser,
  getSearchUser,
  updateAvatarUser,
} = require("../controllers/users");

const {
  validationUpdateUser,
  validationSearchUser,
  validationUpdateUserAvatar,
} = require("../middlewares/validators");

router.get("/user", getUser);
router.get("/user-search", validationSearchUser, getSearchUser);
router.patch("/user", validationUpdateUser, updateUser);
router.patch("/user-avatar", validationUpdateUserAvatar, updateAvatarUser);

module.exports = router;
