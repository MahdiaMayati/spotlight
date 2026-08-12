const express = require('express');
const router = express.Router();
const partnerCtrl = require('../controllers/partnerController');
const verifyAdmin = require('../middlewares/authMiddleware');

router.get('/', partnerCtrl.getPartners);
router.post('/', partnerCtrl.createPartner);
router.delete('/:id', verifyAdmin, partnerCtrl.deletePartner);
router.put('/:id', verifyAdmin, partnerCtrl.updatePartner);

module.exports = router;