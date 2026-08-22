
// const prisma = require('../config/db');

// // 1. جلب المشاريع مع Pagination
// const getProjects = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const [projects, total] = await Promise.all([
//       prisma.project.findMany({
//         where: { isActive: true },
//         include: { features: true, media: true, service: true },
//         skip,
//         take: limit,
//       }),
//       prisma.project.count({ where: { isActive: true } })
//     ]);

//     res.status(200).json({
//       status: 200,
//       pagination: { totalItems: total, currentPage: page, totalPages: Math.ceil(total / limit), limit },
//       data: projects
//     });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // 2. جلب مشروع بواسطة UUID وتسجيل زيارة للمشروع
// const getProjectById = async (req, res) => {
//   try {
//     const projectId = req.params.id; // 👈 بدون parseInt

//     const project = await prisma.project.findUnique({
//       where: { id: projectId },
//       include: { features: true, media: true, service: true }
//     });

//     if (!project) {
//       return res.status(404).json({ status: 404, message: 'Project not found' });
//     }

//     // --- تسجيل زيارة المشروع في الإحصائيات ---
//     if (req.visitorId) {
//       await prisma.analyticsLog.create({
//         data: {
//           visitorId: req.visitorId,
//           pageUrl: `/projects/${projectId}`,
//           action: 'VIEW_PROJECT',
//           entityId: projectId // 👈 يمرر كـ UUID
//         }
//       });
//     }

//     res.status(200).json({ status: 200, data: project });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // 3. إنشاء مشروع جديد
// // const createProject = async (req, res) => {
// //   try {
// //     const { title, slug, mainImage, description, serviceId, features } = req.body;

// //     const featuresList = Array.isArray(features) 
// //       ? features 
// //       : (features?.create || []);

// //     const project = await prisma.project.create({
// //       data: {
// //         title,
// //         slug,
// //         mainImage,
// //         description,
// //         serviceId: serviceId || undefined, // 👈 يمرر كـ String إذا وجد
// //         features: featuresList.length > 0 ? {
// //           create: featuresList.map(f => ({
// //             text: f.text
// //           }))
// //         } : undefined
// //       },
// //       include: {
// //         features: true,
// //         media: true,
// //         service: true
// //       }
// //     });

// //     res.status(201).json({ status: 201, data: project });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };

// // const createProject = async (req, res) => {
// //   try {
// //     const { title, slug, mainImage, description, serviceId, features, media } = req.body;

// //     const featuresList = Array.isArray(features) ? features : (features?.create || []);
// //     const mediaList = Array.isArray(media) ? media : (media?.create || []);

// //     const project = await prisma.project.create({
// //       data: {
// //         title,
// //         slug,
// //         mainImage,
// //         description,
// //         serviceId: serviceId || undefined,
// //         features: featuresList.length > 0 ? {
// //           create: featuresList.map(f => ({ 
// //             text: typeof f === 'object' ? f.text : f 
// //           }))
// //         } : undefined,
// //         media: mediaList.length > 0 ? {
// //           create: mediaList.map(m => {
// //             const url = typeof m === 'string' ? m : m.url;
// //             const mediaType = typeof m === 'object' && m.mediaType 
// //               ? m.mediaType 
// //               : (url && url.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image');

// //             return { url, mediaType };
// //           })
// //         } : undefined
// //       },
// //       include: { features: true, media: true, service: true }
// //     });

// //     res.status(201).json({ status: 201, data: project });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };
// const createProject = async (req, res) => {
//   try {
//     const { title, slug, mainImage, description, serviceId, features, beforeMedia, afterMedia } = req.body;

//     const featuresList = Array.isArray(features) ? features : (features?.create || []);
//     const beforeList = Array.isArray(beforeMedia) ? beforeMedia : [];
//     const afterList = Array.isArray(afterMedia) ? afterMedia : [];

//     const project = await prisma.project.create({
//       data: {
//         title,
//         slug,
//         mainImage,
//         description,
//         serviceId: serviceId || undefined,
//         features: featuresList.length > 0 ? {
//           create: featuresList.map(f => ({ text: typeof f === 'object' ? f.text : f }))
//         } : undefined,
        
//         // وسائط Sebelum / Before
//         beforeMedia: beforeList.length > 0 ? {
//           create: beforeList.map(m => ({
//             url: typeof m === 'string' ? m : m.url,
//             mediaType: typeof m === 'object' && m.mediaType 
//               ? m.mediaType 
//               : ((typeof m === 'string' ? m : m.url)?.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image')
//           }))
//         } : undefined,

//         // وسائط Sesudah / After
//         afterMedia: afterList.length > 0 ? {
//           create: afterList.map(m => ({
//             url: typeof m === 'string' ? m : m.url,
//             mediaType: typeof m === 'object' && m.mediaType 
//               ? m.mediaType 
//               : ((typeof m === 'string' ? m : m.url)?.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image')
//           }))
//         } : undefined
//       },
//       include: { features: true, beforeMedia: true, afterMedia: true, service: true }
//     });

//     res.status(201).json({ status: 201, data: project });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // 4. تحديث مشروع
// // const updateProject = async (req, res) => {
// //   try {
// //     const { id } = req.params; // 👈 بدون parseInt
// //     const { title, slug, mainImage, description, serviceId, isActive } = req.body;

// //     const updatedProject = await prisma.project.update({
// //       where: { id: id },
// //       data: { 
// //         title, 
// //         slug, 
// //         mainImage, 
// //         description, 
// //         serviceId: serviceId || undefined, 
// //         isActive 
// //       },
// //       include: { features: true, media: true }
// //     });

// //     res.status(200).json({ status: 200, data: updatedProject });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };
// const updateProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, slug, description, mainImage, client, serviceId, area, isActive, features, media } = req.body;

//     const dataToUpdate = {
//       ...(title && { title }),
//       ...(slug && { slug }),
//       ...(description !== undefined && { description }),
//       ...(mainImage !== undefined && { mainImage }),
//       ...(client !== undefined && { client }),
//       ...(serviceId !== undefined && { serviceId }),
//       ...(area !== undefined && { area }),
//       ...(isActive !== undefined && { isActive }),
//     };

//     if (features && Array.isArray(features)) {
//       dataToUpdate.features = {
//         deleteMany: {},
//         create: features.map(f => ({ text: f.text }))
//       };
//     }

//     if (media && Array.isArray(media)) {
//       dataToUpdate.media = {
//         deleteMany: {},
//         create: media.map(m => ({
//           url: m.url,
//           mediaType: m.mediaType || (m.url.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image')
//         }))
//       };
//     }

//     const updatedProject = await prisma.project.update({
//       where: { id },
//       data: dataToUpdate,
//       include: { features: true, media: true, service: true }
//     });

//     res.status(200).json({ status: 200, data: updatedProject });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error.message });
//   }
// };
// // 5. حذف مشروع
// const deleteProject = async (req, res) => {
//   try {
//     const { id } = req.params; // 👈 بدون parseInt

//     await prisma.project.delete({
//       where: { id: id }
//     });

//     res.status(200).json({ status: 200, message: 'Project deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // 6. إضافة ميديا للمشروع
// // const addProjectMedia = async (req, res) => {
// //   try {
// //     const { projectId, url, mediaType } = req.body;

// //     if (!projectId || !url) {
// //       return res.status(400).json({ 
// //         status: 400, 
// //         message: "projectId and url are required" 
// //       });
// //     }

// //     const media = await prisma.projectMedia.create({
// //       data: {
// //         projectId: projectId, // 👈 بدون parseInt
// //         url: url,
// //         mediaType: mediaType || (url.match(/\.(mp4|mov|avi|wmv|mkv)$/i) ? 'video' : 'image')
// //       }
// //     });

// //     res.status(201).json({ status: 201, data: media });
// //   } catch (error) {
// //     res.status(500).json({ status: 500, error: error.message });
// //   }
// // };

// module.exports = {
//   getProjects,
//   getProjectById,
//   createProject,
//   updateProject,
//   deleteProject,
//   // addProjectMedia,
// };




const prisma = require('../config/db');

// 1. جلب المشاريع مع Pagination
const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { isActive: true },
        include: { features: true, beforeAfters: true, service: true },
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

// 2. جلب مشروع بواسطة UUID
const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { features: true, beforeAfters: true, service: true }
    });

    if (!project) {
      return res.status(404).json({ status: 404, message: 'Project not found' });
    }

    if (req.visitorId) {
      await prisma.analyticsLog.create({
        data: {
          visitorId: req.visitorId,
          pageUrl: `/projects/${projectId}`,
          action: 'VIEW_PROJECT',
          entityId: projectId
        }
      });
    }

    res.status(200).json({ status: 200, data: project });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 3. إنشاء مشروع جديد
const createProject = async (req, res) => {
  try {
    const { 
      title, slug, mainImage, videoUrl, description, longDescription, 
      locationText, area, buildStart, buildFinish, serviceId, features, beforeAfters 
    } = req.body;

    const featuresList = Array.isArray(features) ? features : [];
    const beforeAfterList = Array.isArray(beforeAfters) ? beforeAfters : [];

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        mainImage,
        videoUrl,
        description,
        longDescription,
        locationText,
        area,
        buildStart: buildStart ? new Date(buildStart) : null,
        buildFinish: buildFinish ? new Date(buildFinish) : null,
        serviceId: serviceId || undefined,
        features: featuresList.length > 0 ? {
          create: featuresList.map(f => ({ text: typeof f === 'object' ? f.text : f }))
        } : undefined,
        beforeAfters: beforeAfterList.length > 0 ? {
          create: beforeAfterList.map(ba => ({
            beforeUrl: ba.beforeUrl || ba.beforeImage,
            afterUrl: ba.afterUrl || ba.afterImage,
            sortOrder: ba.sortOrder || 0
          }))
        } : undefined
      },
      include: { features: true, beforeAfters: true, service: true }
    });

    res.status(201).json({ status: 201, data: project });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 4. تحديث مشروع
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, slug, mainImage, videoUrl, description, longDescription, 
      locationText, area, buildStart, buildFinish, serviceId, isActive, features, beforeAfters 
    } = req.body;

    const dataToUpdate = {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(mainImage !== undefined && { mainImage }),
      ...(videoUrl !== undefined && { videoUrl }),
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

    if (beforeAfters && Array.isArray(beforeAfters)) {
      dataToUpdate.beforeAfters = {
        deleteMany: {},
        create: beforeAfters.map(ba => ({
          beforeUrl: ba.beforeUrl || ba.beforeImage,
          afterUrl: ba.afterUrl || ba.afterImage,
          sortOrder: ba.sortOrder || 0
        }))
      };
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: dataToUpdate,
      include: { features: true, beforeAfters: true, service: true }
    });

    res.status(200).json({ status: 200, data: updatedProject });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// 5. حذف مشروع
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: id }
    });

    res.status(200).json({ status: 200, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};