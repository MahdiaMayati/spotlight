const prisma = require('../config/db');

exports.getFaqs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [faqs, total] = await Promise.all([
      prisma.faq.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        skip,
        take: limit,
      }),
      prisma.faq.count({ where: { isActive: true } })
    ]);

    res.status(200).json({
      status: 200,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      },
      data: faqs
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.createFaq = async (req, res) => {
  try {
    const { question, answer, sortOrder } = req.body;
    const faq = await prisma.faq.create({
      data: { question, answer, sortOrder: sortOrder || 0 }
    });
    res.status(201).json({ status: 201, data: faq });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};


exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faqId = parseInt(id);

    if (isNaN(faqId)) {
      return res.status(400).json({ status: 400, message: "Invalid FAQ ID" });
    }

    const existingFaq = await prisma.faq.findUnique({ where: { id: faqId } });
    if (!existingFaq) {
      return res.status(404).json({ status: 404, message: "FAQ not found" });
    }

    const { question, answer, sortOrder, isActive } = req.body;

    const updatedFaq = await prisma.faq.update({
      where: { id: faqId },
      data: {
        ...(question && { question }),
        ...(answer && { answer }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      }
    });

    res.status(200).json({ status: 200, data: updatedFaq });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};


exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faqId = parseInt(id);

    if (isNaN(faqId)) {
      return res.status(400).json({ status: 400, message: "Invalid FAQ ID" });
    }

    const existingFaq = await prisma.faq.findUnique({ where: { id: faqId } });
    if (!existingFaq) {
      return res.status(404).json({ status: 404, message: "FAQ not found" });
    }

    await prisma.faq.delete({ where: { id: faqId } });
    res.status(200).json({ status: 200, message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};
// exports.deleteFaq = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await prisma.faq.delete({ where: { id: parseInt(id) } });
//     res.status(200).json({ status: 200, message: "FAQ deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };