const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

router.post('/', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Cloudinary Error:', err);
      return res.status(500).json({ status: 500, error: err.message || err });
    }

    if (!req.file) {
      return res.status(400).json({ status: 400, message: 'لم يتم اختيار أي ملف' });
    }

    res.status(200).json({
      status: 200,
      message: 'تم رفع الملف على Cloudinary بنجاح',
      url: req.file.path
    });
  });
});

module.exports = router;