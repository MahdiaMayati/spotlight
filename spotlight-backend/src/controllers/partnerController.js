const prisma = require('../config/db');

exports.getPartners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [partners, total] = await Promise.all([
      prisma.partner.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        skip,
        take: limit,
      }),
      prisma.partner.count({ where: { isActive: true } })
    ]);

    res.status(200).json({
      status: 200,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      },
      data: partners
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    const { logoUrl, linkUrl, sortOrder } = req.body;
    const partner = await prisma.partner.create({
      data: { logoUrl, linkUrl, sortOrder: sortOrder || 0 }
    });
    res.status(201).json({ status: 201, data: partner });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};


exports.deletePartner = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;

    if (!id) {
      return res.status(400).json({ status: 400, message: "Partner ID is required" });
    }

    await prisma.partner.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ status: 200, message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};