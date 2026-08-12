const express = require('express');
const router = express.Router();
const socialCtrl = require('../controllers/socialLinkController');

router.get('/', socialCtrl.getSocialLinks);
router.post('/', socialCtrl.createSocialLink);
router.delete('/:id', socialCtrl.deleteSocialLink);
module.exports = router;