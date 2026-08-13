const express = require('express');
const router = express.Router();
const socialCtrl = require('../controllers/socialLinkController');
const verifyAdmin = require('../middlewares/authMiddleware');

router.get('/', socialCtrl.getSocialLinks);
router.post('/', socialCtrl.createSocialLink);
router.put('/:id', verifyAdmin, socialCtrl.updateSocialLink);
router.delete('/:id', verifyAdmin, socialCtrl.deleteSocialLink);
module.exports = router;