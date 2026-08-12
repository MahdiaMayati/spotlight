// const express = require('express');
// const router = express.Router();
// const mainCtrl = require('../controllers/mainController');
// const genCtrl = require('../controllers/generalController');

// // Services
// router.get('/services', mainCtrl.getServices);
// router.get('/services/:id', mainCtrl.getServiceById);
// router.post('/services', mainCtrl.createService);

// // Projects
// router.get('/projects', mainCtrl.getProjects);
// router.get('/projects/:id', mainCtrl.getProjectById);
// router.post('/projects', mainCtrl.createProject);

// // Messages / Inquiries
// router.post('/messages', genCtrl.sendMessage);
// router.get('/messages', genCtrl.getMessages);

// // General Site Content
// router.get('/home-videos', genCtrl.getHomeVideos);
// router.get('/partners', genCtrl.getPartners);
// router.get('/faqs', genCtrl.getFaqs);
// router.get('/social-links', genCtrl.getSocialLinks);
// router.get('/settings', genCtrl.getSettings);

// module.exports = router;


const express = require('express');
const router = express.Router();

// استدعاء ملفات المسارات المنفصلة
const serviceRoutes = require('./serviceRoutes');
const projectRoutes = require('./projectRoutes');
const messageRoutes = require('./messageRoutes');
const partnerRoutes = require('./partnerRoutes');
const faqRoutes = require('./faqRoutes');
const homeVideoRoutes = require('./homeVideoRoutes');
const socialLinkRoutes = require('./socialLinkRoutes');
const settingRoutes = require('./settingRoutes');
const verifyAdmin = require('../middlewares/authMiddleware');


// ربط كل Route مع المسار الخاص به
router.use('/services', serviceRoutes);
router.use('/projects', projectRoutes);
router.use('/messages', messageRoutes);
router.use('/partners', partnerRoutes);
router.use('/faqs', faqRoutes);
router.use('/home-videos', homeVideoRoutes);
router.use('/social-links', socialLinkRoutes);
router.use('/settings', settingRoutes);


// 1. مسارات مفتوحة للجميع (Public) - بدون Middleware
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// 2. مسارات مخصصة للأدمن فقط (Protected) 
router.post('/', verifyAdmin, serviceController.createService);
router.put('/:id', verifyAdmin, serviceController.updateService);
router.delete('/:id', verifyAdmin, serviceController.deleteService);

module.exports = router;

// https://console.cloudinary.com/app/c-62b7b4699ba5ac56a4a2e5b81d9ce8/assets/media_library/search?q=&view_mode=mosaic
//npx nodemon server.js