const express = require('express');
const userRouter = require('./user/index');
const friendRouter = require('./friend/index');
const listRouter = require('./list/index');
const itemRouter = require('./item/index');

const router = express.Router();

router.use('/user', userRouter);
router.use('/friend', friendRouter);
router.use('/list', listRouter);
router.use('/item', itemRouter);

module.exports = router;
