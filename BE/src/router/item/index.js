const express = require('express');
const controllers = require('./controller');

const router = express.Router();

router.get('/count/:id', controllers.getCount);
router.get('/get/:id', controllers.getItem);
router.post('/add', controllers.addItem);
router.post('/req', controllers.addReq);
router.delete('/delete', controllers.deleteItem);
router.put('/pin', controllers.pinItem);
router.put('/done', controllers.doneItem);
router.put('/title', controllers.putTitle);
router.put('/detail', controllers.putDetail);
router.put('/due', controllers.putDue);

module.exports = router;
