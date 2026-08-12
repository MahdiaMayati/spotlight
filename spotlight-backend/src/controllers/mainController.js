const prisma = require('../config/db');

exports.getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        include: { features: true, media: true },
        skip: skip,
        take: limit,
      }),
      prisma.service.count({ where: { isActive: true } })
    ]);

    res.status(200).json({
      status: 200,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit: limit
      },
      data: services
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { features: true, media: true, projects: true }
    });
    if (!service) return res.status(404).json({ status: 404, message: 'Not found' });
    
    res.status(200).json({ status: 200, data: service });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const { name, slug, icon, mainImage, description, features, media } = req.body;
    const service = await prisma.service.create({
      data: {
        name, slug, icon, mainImage, description,
        features: { create: features || [] },
        media: { create: media || [] }
      },
      include: { features: true, media: true }
    });
    res.status(201).json({ status: 201, data: service });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { isActive: true },
        include: { features: true, media: true, service: true },
        skip: skip,
        take: limit,
      }),
      prisma.project.count({ where: { isActive: true } })
    ]);

    res.status(200).json({
      status: 200,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit: limit
      },
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
    if (!project) return res.status(404).json({ status: 404, message: 'Not found' });
    
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