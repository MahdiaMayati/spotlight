const express = require('express');
const router = express.Router();
const teamCtrl = require('../controllers/teamController');
const verifyAdmin = require('../middlewares/authMiddleware');

router.get('/', teamCtrl.getTeamMembers);
router.post('/', verifyAdmin, teamCtrl.createTeamMember);
router.put('/:id', verifyAdmin, teamCtrl.updateTeamMember);
router.delete('/:id', verifyAdmin, teamCtrl.deleteTeamMember);

module.exports = router;