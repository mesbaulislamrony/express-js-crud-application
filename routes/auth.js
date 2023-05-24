var express = require('express');
var router = express.Router();
var jwt = require("../middlewares/jwt");
var authController = require("../controllers/authController");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', [jwt], authController.logout);
router.get('/me', [jwt], authController.me);

module.exports = router;
