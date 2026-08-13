// // const prisma = require('../config/db');

// // exports.getServices = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const page = parseInt(req.query.page) || 1;
// //     const limit = parseInt(req.query.limit) || 10;
// //     const skip = (page - 1) * limit;


// //     const [services, total] = await Promise.all([
// //       prisma.service.findMany({
// //         where: { isActive: true },
// //         include: { features: true, media: true },
// //         skip,
// //         take: limit,
// //       }),
// //       prisma.service.count({ where: { isActive: true } })
// //     ]);
// //     const service = await prisma.service.findUnique({
// //       where: { id: parseInt(id) },
// //       include: { features: true, media: true, projects: true }
// //     });

// //     if (!service) {
// //       return res.status(404).json({
// //         status: 404,
// //         message: `Service with ID ${id} was not found.`
// //       });
// //     }

// //     res.status(200).json({
// //       status: 200,
// //       pagination: { totalItems: total, currentPage: page, totalPages: Math.ceil(total / limit), limit },
// //       data: services
// //     });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };

// // exports.getServiceById = async (req, res) => {
// //   try {
// //     const service = await prisma.service.findUnique({
// //       where: { id: parseInt(req.params.id) },
// //       include: { features: true, media: true, projects: true }
// //     });
// //     if (!service) return res.status(404).json({ status: 404, message: 'Service not found' });
    
// //     res.status(200).json({ status: 200, data: service });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };

// // exports.createService = async (req, res) => {
// //   try {
// //     const { name, slug, icon, mainImage, description, features, media } = req.body;
// //     const featuresList = Array.isArray(features) 
// //       ? features 
// //       : (features?.create || []);
// //     const service = await prisma.service.create({
// //       data: {
// //         name, slug, icon, mainImage, description,
// //         // features: { create: features || [] },
// //         // media: { create: media || [] }
// //         features: features && features.length > 0 ? {
// //       create: features.map(f => ({ text: f.text }))
// //     } : undefined,
// //     media: media && media.length > 0 ? {
// //       create: media.map(m => ({ url: m.url, mediaType: m.mediaType || 'image' }))
// //     } : undefined
// //   },
// //       include: { features: true, media: true }
// //     });
// //     res.status(201).json({ status: 201, data: service });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };

// // // exports.addServiceMedia = async (req, res) => {
// // //   try {
// // //     const { serviceId, url, mediaType } = req.body;

// // //     const media = await prisma.serviceMedia.create({
// // //       data: {
// // //         serviceId: parseInt(serviceId),
// // //         url: url,
// // //         mediaType: mediaType || 'image' // image أو video
// // //       }
// // //     });

// // //     res.status(201).json({ status: 201, data: media });
// // //   } catch (error) {
// // //     res.status(500).json({ status: 500, error: error.message });
// // //   }
// // // };

// // exports.addServiceMedia = async (req, res) => {
// //   try {
// //     const { serviceId, url, mediaType } = req.body;

// //     // التأكد من وجود البيانات الأساسية
// //     if (!serviceId || !url) {
// //       return res.status(400).json({ status: 400, message: "serviceId and url are required" });
// //     }

// //     const media = await prisma.serviceMedia.create({
// //       data: {
// //         serviceId: parseInt(serviceId),
// //         url: url,
// //         mediaType: mediaType || (url.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image')
// //       }
// //     });

// //     res.status(201).json({ status: 201, data: media });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };



// // module.exports = {
// //     getAllServices,
// //     getServiceById,
// //     createService,
// //     updateService,
// //     deleteService
// // };



// const prisma = require('../config/db');

// const getAllServices = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const [services, total] = await Promise.all([
//       prisma.service.findMany({
//         where: { isActive: true },
//         include: { features: true, media: true },
//         skip,
//         take: limit,
//       }),
//       prisma.service.count({ where: { isActive: true } })
//     ]);

//     res.status(200).json({
//       status: 200,
//       pagination: { 
//         totalItems: total, 
//         currentPage: page, 
//         totalPages: Math.ceil(total / limit), 
//         limit 
//       },
//       data: services
//     });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };


// // const getServiceById = async (req, res) => {
// //   try {
// //     const service = await prisma.service.findUnique({
// //       where: { id: parseInt(req.params.id) },
// //       include: { features: true, media: true, projects: true }
// //     });

// //     if (!service) {
// //       return res.status(404).json({ status: 404, message: 'Service not found' });
// //     }
    
// //     res.status(200).json({ status: 200, data: service });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };

// const getServiceById = async (req, res) => {
//   try {
//     const serviceId = parseInt(req.params.id);

//     const service = await prisma.service.findUnique({
//       where: { id: serviceId },
//       include: { features: true, media: true, projects: true }
//     });

//     if (!service) {
//       return res.status(404).json({ status: 404, message: 'Service not found' });
//     }

//     // --- تسجيل زيارة الخدمة في الإحصائيات ---
//     if (req.visitorId) {
//       await prisma.analyticsLog.create({
//         data: {
//           visitorId: req.visitorId,
//           pageUrl: `/services/${serviceId}`,
//           action: 'VIEW_SERVICE',
//           entityId: serviceId
//         }
//       });
//     }

//     res.status(200).json({ status: 200, data: service });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };



// const createService = async (req, res) => {
//   try {
//     const { name, slug, icon, mainImage,shortDescription, description, features, media } = req.body;

//     const service = await prisma.service.create({
//       data: {
//         name, slug, icon, mainImage,shortDescription, description,
//         features: features && features.length > 0 ? {
//           create: features.map(f => ({ text: f.text }))
//         } : undefined,
//         media: media && media.length > 0 ? {
//           create: media.map(m => ({ url: m.url, mediaType: m.mediaType || 'image' }))
//         } : undefined
//       },
//       include: { features: true, media: true }
//     });

//     res.status(201).json({ status: 201, data: service });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// const updateService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, slug, icon, mainImage, shortDescription, description } = req.body;

//     const updatedService = await prisma.service.update({
//       where: { id: parseInt(id) },
//       data: { name, slug, icon, mainImage, shortDescription, description }
//     });

//     res.status(200).json({ status: 200, data: updatedService });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // 5. حذف خدمة
// const deleteService = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.service.delete({
//       where: { id: parseInt(id) }
//     });

//     res.status(200).json({ status: 200, message: 'Service deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // 6. إضافة ميديا للخدمة
// const addServiceMedia = async (req, res) => {
//   try {
//     const { serviceId, url, mediaType } = req.body;

//     if (!serviceId || !url) {
//       return res.status(400).json({ status: 400, message: "serviceId and url are required" });
//     }

//     const media = await prisma.serviceMedia.create({
//       data: {
//         serviceId: parseInt(serviceId),
//         url: url,
//         mediaType: mediaType || (url.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image')
//       }
//     });

//     res.status(201).json({ status: 201, data: media });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // تصدير كائن التصدير الموحد في آخر الملف
// module.exports = {
//   getAllServices,
//   getServiceById,
//   createService,
//   updateService,
//   deleteService,
//   addServiceMedia
// };

const prisma = require('../config/db');

// 1. جلب جميع الخدمات مع Pagination
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
      pagination: { 
        totalItems: total, 
        currentPage: page, 
        totalPages: Math.ceil(total / limit), 
        limit 
      },
      data: services
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 2. جلب خدمة واحدة بواسطة UUID وتسجيل الزيارة في الإحصائيات
const getServiceById = async (req, res) => {
  try {
    // 👈 أخذ الـ id مباشرة كـ String بدون parseInt
    const serviceId = req.params.id;

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { features: true, media: true, projects: true }
    });

    if (!service) {
      return res.status(404).json({ status: 404, message: 'Service not found' });
    }

    // --- تسجيل زيارة الخدمة في الإحصائيات ---
    if (req.visitorId) {
      await prisma.analyticsLog.create({
        data: {
          visitorId: req.visitorId,
          pageUrl: `/services/${serviceId}`,
          action: 'VIEW_SERVICE',
          entityId: serviceId // 👈 يمرر الآن كـ String (UUID)
        }
      });
    }

    res.status(200).json({ status: 200, data: service });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 3. إنشاء خدمة جديدة
const createService = async (req, res) => {
  try {
    const { name, slug, icon, mainImage, shortDescription, description, features, media } = req.body;

    const service = await prisma.service.create({
      data: {
        name, slug, icon, mainImage, shortDescription, description,
        features: features && features.length > 0 ? {
          create: features.map(f => ({ text: f.text }))
        } : undefined,
        media: media && media.length > 0 ? {
          create: media.map(m => ({ url: m.url, mediaType: m.mediaType || 'image' }))
        } : undefined
      },
      include: { features: true, media: true }
    });

    res.status(201).json({ status: 201, data: service });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 4. تحديث خدمة
const updateService = async (req, res) => {
  try {
    const { id } = req.params; // 👈 id أصبح String
    const { name, slug, icon, mainImage, shortDescription, description } = req.body;

    const updatedService = await prisma.service.update({
      where: { id: id },
      data: { name, slug, icon, mainImage, shortDescription, description }
    });

    res.status(200).json({ status: 200, data: updatedService });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 5. حذف خدمة
const deleteService = async (req, res) => {
  try {
    const { id } = req.params; // 👈 id أصبح String

    await prisma.service.delete({
      where: { id: id }
    });

    res.status(200).json({ status: 200, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 6. إضافة ميديا للخدمة
const addServiceMedia = async (req, res) => {
  try {
    const { serviceId, url, mediaType } = req.body;

    if (!serviceId || !url) {
      return res.status(400).json({ status: 400, message: "serviceId and url are required" });
    }

    const media = await prisma.serviceMedia.create({
      data: {
        serviceId: serviceId, // 👈 serviceId تمرر كما هي String
        url: url,
        mediaType: mediaType || (url.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image')
      }
    });

    res.status(201).json({ status: 201, data: media });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  addServiceMedia
};