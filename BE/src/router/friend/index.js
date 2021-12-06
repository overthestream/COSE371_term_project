const express = require('express');
const controllers = require('./controller');

const router = express.Router();

router.post('/add', controllers.addFriend);
router.delete('/delete', controllers.deleteFriend);
router.get('/iadd/:id', controllers.getIadd);
router.get('/addme/:id', controllers.getAddMe);
router.get('/addboth/:id', controllers.getAddBoth);

module.exports = router;
