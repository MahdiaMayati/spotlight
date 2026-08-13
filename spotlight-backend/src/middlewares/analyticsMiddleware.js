const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const trackVisitor = async (req, res, next) => {
  try {
    let visitorCookie = req.cookies?.spotlight_visitor_id;

    if (!visitorCookie) {
      visitorCookie = uuidv4();

      res.cookie('spotlight_visitor_id', visitorCookie, {
        maxAge: 365 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        sameSite: 'lax'
      });
    }

    
    const visitor = await prisma.visitor.upsert({
      where: { cookieId: visitorCookie },
      update: { lastActive: new Date() },
      create: { cookieId: visitorCookie }
    });

   
    req.visitorId = visitor.id;
  } catch (error) {
    console.error('Analytics Middleware Error:', error);
  }

  next();
};

module.exports = trackVisitor;