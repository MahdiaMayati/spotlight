// const prisma = require('../config/db');

// exports.sendMessage = async (req, res) => {
//   try {
//     const { serviceId, fullName, phone, email, regionProvince, preferredTime, messageText } = req.body;
//     const message = await prisma.message.create({
//       data: {
//         serviceId: serviceId ? parseInt(serviceId) : null,
//         fullName, phone, email, regionProvince, preferredTime, messageText
//       }
//     });
//     res.status(201).json({ status: 201, data: message });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// exports.getMessages = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const [messages, total] = await Promise.all([
//       prisma.message.findMany({
//         include: { service: true },
//         skip: skip,
//         take: limit,
//       }),
//       prisma.message.count()
//     ]);

//     res.status(200).json({
//       status: 200,
//       pagination: {
//         totalItems: total,
//         currentPage: page,
//         totalPages: Math.ceil(total / limit),
//         limit: limit
//       },
//       data: messages
//     });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// exports.getHomeVideos = async (req, res) => {
//   try {
//     const videos = await prisma.homeVideo.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
//     res.status(200).json({ status: 200, data: videos });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };


// exports.getPartners = async (req, res) => {
//   try {
//     const partners = await prisma.partner.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
//     res.status(200).json({ status: 200, data: partners });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // --- FAQs ---
// exports.getFaqs = async (req, res) => {
//   try {
//     const faqs = await prisma.faq.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
//     res.status(200).json({ status: 200, data: faqs });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // --- Social Links ---
// exports.getSocialLinks = async (req, res) => {
//   try {
//     const links = await prisma.socialLink.findMany();
//     res.status(200).json({ status: 200, data: links });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// // --- Site Settings ---
// exports.getSettings = async (req, res) => {
//   try {
//     const settings = await prisma.siteSetting.findMany();
//     res.status(200).json({ status: 200, data: settings });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };