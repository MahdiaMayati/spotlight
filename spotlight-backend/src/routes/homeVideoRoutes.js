const express = require('express');
const router = express.Router();
const homeVideoCtrl = require('../controllers/homeVideoController');

router.get('/', homeVideoCtrl.getHomeVideos);
router.post('/', homeVideoCtrl.createHomeVideo);
router.put('/:id', homeVideoCtrl.updateHomeVideo);
router.delete('/:id', homeVideoCtrl.deleteHomeVideo);

module.exports = router;