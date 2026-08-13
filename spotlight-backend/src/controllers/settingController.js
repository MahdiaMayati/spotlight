// const prisma = require('../config/db');

// exports.getSettings = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const [settings, total] = await Promise.all([
//       prisma.siteSetting.findMany({
//         skip,
//         take: limit,
//       }),
//       prisma.siteSetting.count()
//     ]);

//     res.status(200).json({
//       status: 200,
//       pagination: {
//         totalItems: total,
//         currentPage: page,
//         totalPages: Math.ceil(total / limit),
//         limit
//       },
//       data: settings
//     });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// exports.createOrUpdateSetting = async (req, res) => {
//   try {
//     const { settingKey, settingValue, description } = req.body;
//     const setting = await prisma.siteSetting.upsert({
//       where: { settingKey },
//       update: { settingValue, description },
//       create: { settingKey, settingValue, description }
//     });
//     res.status(200).json({ status: 200, data: setting });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

const prisma = require('../config/db');

exports.getSettings = async (req, res) => {
  try {
    const { format } = req.query; 

    const settings = await prisma.siteSetting.findMany();

    if (format === 'object') {
      const formattedSettings = settings.reduce((acc, curr) => {
        acc[curr.settingKey] = curr.settingValue;
        return acc;
      }, {});

      return res.status(200).json({ status: 200, data: formattedSettings });
    }

    res.status(200).json({
      status: 200,
      data: settings
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 2. إنشاء أو تحديث إعداد (Upsert)
exports.createOrUpdateSetting = async (req, res) => {
  try {
    const { settingKey, settingValue, description } = req.body;

    if (!settingKey) {
      return res.status(400).json({ status: 400, message: "settingKey is required" });
    }

    const setting = await prisma.siteSetting.upsert({
      where: { settingKey },
      update: { settingValue, description },
      create: { settingKey, settingValue, description }
    });

    res.status(200).json({ status: 200, data: setting });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};