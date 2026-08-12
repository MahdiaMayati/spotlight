const express = require('express');
const router = express.Router();
const faqCtrl = require('../controllers/faqController');

router.get('/', faqCtrl.getFaqs);
router.post('/', faqCtrl.createFaq);
router.delete('/:id', faqCtrl.deleteFaq);

module.exports = router;