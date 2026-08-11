const express = require('express');
const router = express.Router();
const faqCtrl = require('../controllers/faqController');

router.get('/', faqCtrl.getFaqs);
router.post('/', faqCtrl.createFaq);

module.exports = router;