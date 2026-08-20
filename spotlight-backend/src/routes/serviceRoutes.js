const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const verifyAdmin = require('../middlewares/authMiddleware');

// 1. مسارات مفتوحة للجميع (Public)
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// 2. مسارات مخصصة للأدمن فقط (Protected)
router.post('/', verifyAdmin, serviceController.createService);
router.put('/:id', verifyAdmin, serviceController.updateService);
router.delete('/:id', verifyAdmin, serviceController.deleteService);
// router.post('/media', verifyAdmin, serviceController.addServiceMedia);
module.exports = router;