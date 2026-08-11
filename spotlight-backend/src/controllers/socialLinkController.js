const prisma = require('../config/db');

exports.getSocialLinks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      prisma.socialLink.findMany({
        skip,
        take: limit,
      }),
      prisma.socialLink.count()
    ]);

    res.status(200).json({
      status: 200,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      },
      data: links
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.createSocialLink = async (req, res) => {
  try {
    const { platform, url } = req.body;
    const link = await prisma.socialLink.create({
      data: { platform, url }
    });
    res.status(201).json({ status: 201, data: link });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};