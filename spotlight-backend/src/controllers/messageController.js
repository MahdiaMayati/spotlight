const prisma = require('../config/db');

exports.sendMessage = async (req, res) => {
  try {
    const { serviceId, fullName, phone, email, regionProvince, preferredTime, messageText } = req.body;
    const message = await prisma.message.create({
      data: {
        serviceId: serviceId ? parseInt(serviceId) : null,
        fullName, phone, email, regionProvince, preferredTime, messageText
      }
    });
    res.status(201).json({ status: 201, data: message });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        include: {
          service: {
            select: {
              id: true,
              name: true 
            }
          }
         },
        skip,
        take: limit,
      }),
      prisma.message.count()
    ]);

    res.status(200).json({
      status: 200,
      pagination: { totalItems: total, currentPage: page, totalPages: Math.ceil(total / limit), limit },
      data: messages
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // التأكد من وجود الرسالة قبل الحذف
    const existingMessage = await prisma.message.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingMessage) {
      return res.status(404).json({
        status: 404,
        message: 'Message not found'
      });
    }

    // تنفيذ الحذف في قاعدة البيانات
    await prisma.message.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      status: 200,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
};
