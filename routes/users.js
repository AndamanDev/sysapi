var express = require("express");
const {
  // getUsers,
  // getUser,
  createUser,
  // updateUser,
  // deleteUser,
} = require("../controllers/users");

const router = express.Router({ mergeParams: true });

/* GET users listing. */
router
  .route('/').post(createUser);

module.exports = router;
