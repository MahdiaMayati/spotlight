const express = require('express');
const router = express.Router();
const faqCtrl = require('../controllers/faqController');
const verifyAdmin = require('../middlewares/authMiddleware');

router.get('/', faqCtrl.getFaqs);
router.post('/', faqCtrl.createFaq);
router.put('/:id', verifyAdmin, faqCtrl.updateFaq);
router.delete('/:id', verifyAdmin, faqCtrl.deleteFaq);

module.exports = router;