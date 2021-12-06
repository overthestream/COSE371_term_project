const express = require('express');
const controllers = require('./controller');

const router = express.Router();

router.post('/add', controllers.addList);
router.put('/put', controllers.putList);
router.delete('/delete', controllers.deleteList);

module.exports = router;
