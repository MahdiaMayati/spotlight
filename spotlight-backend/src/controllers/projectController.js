const prisma = require('../config/db');

exports.getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { isActive: true },
        include: { features: true, media: true, service: true },
        skip,
        take: limit,
      }),
      prisma.project.count({ where: { isActive: true } })
    ]);

    res.status(200).json({
      status: 200,
      pagination: { totalItems: total, currentPage: page, totalPages: Math.ceil(total / limit), limit },
      data: projects
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { features: true, media: true, service: true }
    });
    if (!project) return res.status(404).json({ status: 404, message: 'Project not found' });
    
    res.status(200).json({ status: 200, data: project });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { serviceId, title, slug, mainImage, description, longDescription, locationText, area, buildStart, buildFinish, features, media } = req.body;
    const project = await prisma.project.create({
      data: {
        serviceId: serviceId ? parseInt(serviceId) : null,
        title, slug, mainImage, description, longDescription, locationText, area,
        buildStart: buildStart ? new Date(buildStart) : null,
        buildFinish: buildFinish ? new Date(buildFinish) : null,
        features: { create: features || [] },
        media: { create: media || [] }
      },
      include: { features: true, media: true }
    });
    res.status(201).json({ status: 201, data: project });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    return res.status(200).json({ message: "تم حذف المشروع بنجاح" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};