const express = require('express');
const router = express.Router();
const faqCtrl = require('../controllers/faqController');
const verifyAdmin = require('../middlewares/authMiddleware');

router.get('/', faqCtrl.getFaqs);
router.post('/', faqCtrl.createFaq);
router.delete('/:id', verifyAdmin, faqCtrl.deleteFaq);

module.exports = router;