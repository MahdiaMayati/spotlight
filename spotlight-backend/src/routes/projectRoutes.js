const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifyAdmin = require('../middlewares/authMiddleware');

// Public
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

// Protected (Admin)
router.post('/', verifyAdmin, projectController.createProject);
router.put('/:id', verifyAdmin, projectController.updateProject);
router.delete('/:id', verifyAdmin, projectController.deleteProject);

// Media
router.post('/media', verifyAdmin, projectController.addProjectMedia);

module.exports = router;