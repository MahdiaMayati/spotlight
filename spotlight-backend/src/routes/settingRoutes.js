const express = require('express');
const router = express.Router();
const settingCtrl = require('../controllers/settingController');

router.get('/', settingCtrl.getSettings);
router.post('/', settingCtrl.createOrUpdateSetting);

module.exports = router;