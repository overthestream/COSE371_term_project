const express = require('express');
const userRouter = require('./user/index');

const router = express.Router();

router.use('/user', userRouter);

module.exports = router;
