const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.logVisit = async (req, res) => {
  try {
    const { path } = req.body;
    const today = new Date().toISOString().split('T')[0];

    await prisma.pageview.create({
      data: {
        path: path || '/',
        date: today,
      },
    });

    return res.status(200).json({ message: "Visit logged successfully" });
  } catch (error) {
    console.error("--- LOG VISIT ERROR ---", error);
    return res.status(500).json({ errorDetail: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const totalVisits = await prisma.pageview.count();
    const todayVisits = await prisma.pageview.count({ where: { date: today } });

    const topPagesGrouped = await prisma.pageview.groupBy({
      by: ['path'],
      _count: { path: true },
      orderBy: {
        _count: { path: 'desc' },
      },
      take: 5,
    });

    const topPages = topPagesGrouped.map((item) => ({
      path: item.path,
      views: item._count ? item._count.path : 0,
    }));

    return res.status(200).json({
      status: 200,
      message: "Stats created successfully",
      data: {
      totalVisits,
      todayVisits,
      topPages,
      },
    });
  } catch (error) {
    console.error("--- GET STATS ERROR ---", error);
    return res.status(500).json({ errorDetail: error.message });
  }
};
exports.postStats = async (req, res) => {
  try {
    const { path } = req.body;
    const today = new Date().toISOString().split('T')[0];

    await prisma.pageview.create({
      data: {  
        fullPath: path || '/',
        date: today,
      },
    });

    return res.status(201).json({ 
      status: 201,
      message: "Visit logged successfully" ,
      data: {
        totalVisits,
        todayVisits,
        topPages,
      },
    
    });
  } catch (error) {
    console.error("--- LOG VISIT ERROR ---", error);
    return res.status(500).json({ errorDetail: error.message });
  }
};
