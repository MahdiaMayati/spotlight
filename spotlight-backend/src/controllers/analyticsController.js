const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardStats = async (req, res) => {
  try {
    // 1. إجمالي عدد الزوار الفريدين
    const totalVisitors = await prisma.visitor.count();

    // 2. إجمالي المشاهدات
    const totalPageViews = await prisma.analyticsLog.count();

    // 3. الخدمات الأكثر مشاهدة
    const topServicesGrouped = await prisma.analyticsLog.groupBy({
      by: ['entityId'],
      where: { 
        action: 'VIEW_SERVICE',
        entityId: { not: null }
      },
      _count: { entityId: true },
      orderBy: {
        _count: { entityId: 'desc' }
      },
      take: 5
    });

    // جلب تفاصيل الخدمات الأكثر مشاهدة
    const topServices = await Promise.all(
      topServicesGrouped.map(async (item) => {
        const service = await prisma.service.findUnique({
          where: { id: item.entityId },
          select: { id: true, name: true, slug: true, mainImage: true }
        });
        return {
          service: service || null,
          viewsCount: item._count.entityId
        };
      })
    );

    // 4. أحدث سجلات الزيارات
    const recentLogs = await prisma.analyticsLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        visitor: true
      }
    });

    res.status(200).json({
      status: 200,
      data: {
        summary: {
          totalVisitors,
          totalPageViews
        },
        topServices: topServices.filter(s => s.service !== null),
        recentLogs
      }
    });

  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = {
  getDashboardStats
};