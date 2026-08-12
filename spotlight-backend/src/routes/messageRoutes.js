const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/messageController');

router.post('/', messageCtrl.sendMessage);
router.get('/', messageCtrl.getMessages);
router.delete('/:id', messageCtrl.deleteMessage);
module.exports = router;