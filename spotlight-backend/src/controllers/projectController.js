
const prisma = require('../config/db');

// دالة تحويل البيانات لتناسب الفرونت إند
const formatProjectData = (project) => {
  if (!project) return null;
  const media = project.media || [];
  return {
    ...project,
    beforeImages: media.filter(m => m.type === 'BEFORE').map(m => m.url),
    afterImages: media.filter(m => m.type === 'AFTER').map(m => m.url),
    videos: media.filter(m => m.type === 'VIDEO').map(m => m.url),
  };
};

const getProjects = async (req, res) => {
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
      data: projects.map(formatProjectData)
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { features: true, media: true, service: true }
    });

    if (!project) return res.status(404).json({ status: 404, message: 'Project not found' });

    res.status(200).json({ status: 200, data: formatProjectData(project) });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { 
      title, slug, mainImage, description, longDescription, 
      locationText, area, buildStart, buildFinish, serviceId, 
      features, beforeImages, afterImages, videos 
    } = req.body;

    const mediaToCreate = [
      ...(Array.isArray(beforeImages) ? beforeImages.map(url => ({ url, type: 'BEFORE' })) : []),
      ...(Array.isArray(afterImages) ? afterImages.map(url => ({ url, type: 'AFTER' })) : []),
      ...(Array.isArray(videos) ? videos.map(url => ({ url, type: 'VIDEO' })) : [])
    ];

    const project = await prisma.project.create({
      data: {
        title, slug, mainImage, description, longDescription, locationText, area,
        buildStart: buildStart ? new Date(buildStart) : null,
        buildFinish: buildFinish ? new Date(buildFinish) : null,
        serviceId: serviceId || undefined,
        features: features && features.length > 0 ? {
          create: features.map(f => ({ text: typeof f === 'object' ? f.text : f }))
        } : undefined,
        media: mediaToCreate.length > 0 ? { create: mediaToCreate } : undefined
      },
      include: { features: true, media: true, service: true }
    });

    res.status(201).json({ status: 201, data: formatProjectData(project) });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, slug, mainImage, description, longDescription, 
      locationText, area, buildStart, buildFinish, serviceId, isActive, 
      features, beforeImages, afterImages, videos 
    } = req.body;

    const dataToUpdate = {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(mainImage !== undefined && { mainImage }),
      ...(description !== undefined && { description }),
      ...(longDescription !== undefined && { longDescription }),
      ...(locationText !== undefined && { locationText }),
      ...(area !== undefined && { area }),
      ...(buildStart !== undefined && { buildStart: buildStart ? new Date(buildStart) : null }),
      ...(buildFinish !== undefined && { buildFinish: buildFinish ? new Date(buildFinish) : null }),
      ...(serviceId !== undefined && { serviceId }),
      ...(isActive !== undefined && { isActive }),
    };

    if (features && Array.isArray(features)) {
      dataToUpdate.features = {
        deleteMany: {},
        create: features.map(f => ({ text: typeof f === 'object' ? f.text : f }))
      };
    }

    if (beforeImages || afterImages || videos) {
      const mediaToCreate = [
        ...(Array.isArray(beforeImages) ? beforeImages.map(url => ({ url, type: 'BEFORE' })) : []),
        ...(Array.isArray(afterImages) ? afterImages.map(url => ({ url, type: 'AFTER' })) : []),
        ...(Array.isArray(videos) ? videos.map(url => ({ url, type: 'VIDEO' })) : [])
      ];
      dataToUpdate.media = {
        deleteMany: {},
        create: mediaToCreate
      };
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: dataToUpdate,
      include: { features: true, media: true, service: true }
    });

    res.status(200).json({ status: 200, data: formatProjectData(updatedProject) });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.status(200).json({ status: 200, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };