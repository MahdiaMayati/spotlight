const express = require('express');
const router = express.Router();
const homeVideoCtrl = require('../controllers/homeVideoController');

router.get('/', homeVideoCtrl.getHomeVideos);
router.post('/', homeVideoCtrl.createHomeVideo);

module.exports = router;