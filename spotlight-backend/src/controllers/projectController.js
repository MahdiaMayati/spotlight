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
    const { title, slug, mainImage, description, features, media } = req.body;

    // استخراج الميزات سواء أُرْسِلَت كـ Array أو بداخل object
    const featuresList = Array.isArray(features) 
      ? features 
      : (features?.create || []);

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        mainImage,
        description,
        features: featuresList.length > 0 ? {
          create: featuresList.map(f => ({
            text: f.text
          }))
        } : undefined
      },
      include: {
        features: true,
        media: true
      }
    });

    res.status(201).json({ status: 201, data: project });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.addProjectMedia = async (req, res) => {
  try {
    const { projectId, url, mediaType } = req.body;

    // التحقق من المدخلات الأساسية
    if (!projectId || !url) {
      return res.status(400).json({ 
        status: 400, 
        message: "projectId and url are required" 
      });
    }

    const media = await prisma.projectMedia.create({
      data: {
        projectId: parseInt(projectId),
        url: url,
        mediaType: mediaType || (url.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image')
      }
    });

    res.status(201).json({ status: 201, data: media });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};