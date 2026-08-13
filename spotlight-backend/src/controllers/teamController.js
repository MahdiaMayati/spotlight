// const prisma = require('../config/db');

// exports.getTeamMembers = async (req, res) => {
//   try {
//     const members = await prisma.teamMember.findMany({
//       orderBy: { order: 'asc' }
//     });
//     res.status(200).json({ status: 200, data: members });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// exports.createTeamMember = async (req, res) => {
//   try {
//     const { name, role, image, order } = req.body;
//     const newMember = await prisma.teamMember.create({
//       data: { name, role, image, order: order ? parseInt(order) : 0 }
//     });
//     res.status(201).json({ status: 201, data: newMember });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// exports.updateTeamMember = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, role, image, order } = req.body;
//     const updated = await prisma.teamMember.update({
//       where: { id: parseInt(id) },
//       data: { name, role, image, order: order ? parseInt(order) : undefined }
//     });
//     res.status(200).json({ status: 200, data: updated });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// exports.deleteTeamMember = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await prisma.teamMember.delete({ where: { id: parseInt(id) } });
//     res.status(200).json({ status: 200, message: 'Team member deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };



const prisma = require('../config/db');

// 1. جلب جميع أعضاء الفريق مرتبين
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    });
    res.status(200).json({ status: 200, data: members });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 2. إضافة عضو جديد للفريق
exports.createTeamMember = async (req, res) => {
  try {
    const { name, role, image, order } = req.body;

    if (!name || !role) {
      return res.status(400).json({ status: 400, message: "Name and role are required" });
    }

    const newMember = await prisma.teamMember.create({
      data: { 
        name, 
        role, 
        image, 
        order: order !== undefined ? parseInt(order) : 0 
      }
    });
    res.status(201).json({ status: 201, data: newMember });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 3. تحديث بيانات عضو
exports.updateTeamMember = async (req, res) => {
  try {
    const memberId = parseInt(req.params.id);
    if (isNaN(memberId)) {
      return res.status(400).json({ status: 400, message: "Invalid member ID" });
    }

    const { name, role, image, order } = req.body;

    const existingMember = await prisma.teamMember.findUnique({
      where: { id: memberId }
    });

    if (!existingMember) {
      return res.status(404).json({ status: 404, message: "Team member not found" });
    }

    const updated = await prisma.teamMember.update({
      where: { id: memberId },
      data: { 
        name, 
        role, 
        image, 
        order: order !== undefined ? parseInt(order) : undefined 
      }
    });

    res.status(200).json({ status: 200, data: updated });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// 4. حذف عضو من الفريق
exports.deleteTeamMember = async (req, res) => {
  try {
    const memberId = parseInt(req.params.id);
    if (isNaN(memberId)) {
      return res.status(400).json({ status: 400, message: "Invalid member ID" });
    }

    const existingMember = await prisma.teamMember.findUnique({
      where: { id: memberId }
    });

    if (!existingMember) {
      return res.status(404).json({ status: 404, message: "Team member not found" });
    }

    await prisma.teamMember.delete({ 
      where: { id: memberId } 
    });

    res.status(200).json({ status: 200, message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  } 
};