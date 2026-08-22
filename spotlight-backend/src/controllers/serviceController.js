
const prisma = require('../config/db');

const formatServiceData = (service) => {
  if (!service) return null;
  const { media = [], ...rest } = service; // استبعاد media من rest
  return {
    ...rest,
    beforeImages: media.filter(m => m.type === 'BEFORE').map(m => m.url),
    afterImages: media.filter(m => m.type === 'AFTER').map(m => m.url),
    videos: media.filter(m => m.type === 'VIDEO').map(m => m.url),
  };
};

const getAllServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        include: { features: true, media: true },
        skip,
        take: limit,
      }),
      prisma.service.count({ where: { isActive: true } })
    ]);

    res.status(200).json({
      status: 200,
      pagination: { totalItems: total, currentPage: page, totalPages: Math.ceil(total / limit), limit },
      data: services.map(formatServiceData)
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { features: true, media: true, projects: true }
    });

    if (!service) return res.status(404).json({ status: 404, message: 'Service not found' });

    res.status(200).json({ status: 200, data: formatServiceData(service) });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { name, slug, icon, mainImage, shortDescription, description, features, beforeImages, afterImages, videos } = req.body;

    const mediaToCreate = [
      ...(Array.isArray(beforeImages) ? beforeImages.map(url => ({ url, type: 'BEFORE' })) : []),
      ...(Array.isArray(afterImages) ? afterImages.map(url => ({ url, type: 'AFTER' })) : []),
      ...(Array.isArray(videos) ? videos.map(url => ({ url, type: 'VIDEO' })) : [])
    ];

    const service = await prisma.service.create({
      data: {
        name, slug, icon, mainImage, shortDescription, description,
        features: features && features.length > 0 ? {
          create: features.map(f => ({ text: typeof f === 'object' ? f.text : f }))
        } : undefined,
        media: mediaToCreate.length > 0 ? { create: mediaToCreate } : undefined
      },
      include: { features: true, media: true }
    });

    res.status(201).json({ status: 201, data: formatServiceData(service) });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, icon, mainImage, shortDescription, description, isActive, features, beforeImages, afterImages, videos } = req.body;

    const dataToUpdate = {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(icon !== undefined && { icon }),
      ...(mainImage !== undefined && { mainImage }),
      ...(shortDescription !== undefined && { shortDescription }),
      ...(description !== undefined && { description }),
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

    const updatedService = await prisma.service.update({
      where: { id },
      data: dataToUpdate,
      include: { features: true, media: true }
    });

    res.status(200).json({ status: 200, data: formatServiceData(updatedService) });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    res.status(200).json({ status: 200, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = { getAllServices, getServiceById, createService, updateService, deleteService };