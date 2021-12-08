const express = require('express');
const controllers = require('./controller');

const router = express.Router();

router.get('/get/:id', controllers.getList);
router.get('/name/:id', controllers.getListName);
router.post('/add', controllers.addList);
router.put('/put', controllers.putList);
router.delete('/delete/:id', controllers.deleteList);

module.exports = router;
