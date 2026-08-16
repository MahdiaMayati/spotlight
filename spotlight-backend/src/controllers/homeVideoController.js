const prisma = require('../config/db');

exports.getHomeVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [videos, total] = await Promise.all([
      prisma.homeVideo.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        skip,
        take: limit,
      }),
      prisma.homeVideo.count({ where: { isActive: true } })
    ]);

    res.status(200).json({
      status: 200,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      },
      data: videos
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.createHomeVideo = async (req, res) => {
  try {
    const { url, sortOrder, isMainVideo } = req.body;
    const video = await prisma.homeVideo.create({
      data: { url, sortOrder: sortOrder || 0, isMainVideo: isMainVideo || false }
    });
    res.status(201).json({ status: 201, data: video });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.updateHomeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, sortOrder, isMainVideo, isActive } = req.body;

    const video = await prisma.homeVideo.update({
      where: { id: parseInt(id) },
      data: {
        ...(url && { url }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) }),
        ...(isMainVideo !== undefined && { isMainVideo: Boolean(isMainVideo) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      }
    });

    res.status(200).json({ status: 200, data: video });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.deleteHomeVideo = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.homeVideo.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ status: 200, message: 'Home video deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};