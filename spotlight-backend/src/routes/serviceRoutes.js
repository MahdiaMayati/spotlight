const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/serviceController');

router.get('/', serviceCtrl.getServices);
router.get('/:id', serviceCtrl.getServiceById);
router.post('/', serviceCtrl.createService);
router.post('/media', serviceCtrl.addServiceMedia);

module.exports = router;