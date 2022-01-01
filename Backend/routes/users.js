var express = require("express");
var router = express.Router();
const {
  registeration,
  login,
  getAllUser,
  removeBlog,
  removeUser,
  approveBlog,
  getAdminStatus,
  saveBlog,
  getBlog,
} = require("../controllers/main.controller");

router.get("/isAdminExist", getAdminStatus);

router.post("/userRegisteration", registeration);

router.post("/userLogin", login);

router.get("/getAllUser", getAllUser);

router.get("/approveBlog", approveBlog);

router.get("/removeUser", removeUser);

router.get("/removeBlog", removeBlog);

router.post("/saveBlog", saveBlog);

router.get("/getBlog", getBlog);

module.exports = router;
