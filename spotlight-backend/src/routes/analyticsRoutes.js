const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// مسار تسجيل زيارة
router.post('/visit', analyticsController.logVisit);

// مسار جلب الإحصائيات
router.get('/stats', analyticsController.getStats);

    
module.exports = router;