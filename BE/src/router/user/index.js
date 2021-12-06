const express = require('express');
const controllers = require('./controller');

const router = express.Router();

router.post('/register', controllers.registerUser);
router.post('/login', controllers.loginUser);
router.get('/find/:id', controllers.findUsers);

module.exports = router;
