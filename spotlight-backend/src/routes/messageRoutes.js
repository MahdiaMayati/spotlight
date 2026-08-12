const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/messageController');
const verifyAdmin = require('../middlewares/authMiddleware');

router.post('/', messageCtrl.sendMessage);
router.get('/', messageCtrl.getMessages);
router.delete('/:id', verifyAdmin, messageCtrl.deleteMessage);

module.exports = router;