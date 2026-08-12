const express = require('express');
const router = express.Router();
const partnerCtrl = require('../controllers/partnerController');

router.get('/', partnerCtrl.getPartners);
router.post('/', partnerCtrl.createPartner);
router.delete('/:id', partnerCtrl.deletePartner);

module.exports = router;