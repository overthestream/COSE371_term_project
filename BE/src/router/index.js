const express = require('express');
const userRouter = require('./user/index');
const friendRouter = require('./friend/index');

const router = express.Router();

router.use('/user', userRouter);
router.use('/friend', friendRouter);

module.exports = router;
