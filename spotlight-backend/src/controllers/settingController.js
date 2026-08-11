const prisma = require('../config/db');

exports.getSettings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [settings, total] = await Promise.all([
      prisma.siteSetting.findMany({
        skip,
        take: limit,
      }),
      prisma.siteSetting.count()
    ]);

    res.status(200).json({
      status: 200,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      },
      data: settings
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.createOrUpdateSetting = async (req, res) => {
  try {
    const { settingKey, settingValue, description } = req.body;
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