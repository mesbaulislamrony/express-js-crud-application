var express = require('express');
var router = express.Router();
var usersController = require("../controllers/userController");

router.get('/', usersController.get);
router.post('/', usersController.create);
router.get('/:id', usersController.show);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;
