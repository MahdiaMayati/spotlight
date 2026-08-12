const express = require('express');
const router = express.Router();
const projectCtrl = require('../controllers/projectController');

router.get('/', projectCtrl.getProjects);
router.get('/:id', projectCtrl.getProjectById);
router.post('/', projectCtrl.createProject);
router.post('/media', projectCtrl.addProjectMedia);

module.exports = router;