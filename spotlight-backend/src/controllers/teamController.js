const prisma = require('../config/db');

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

exports.createTeamMember = async (req, res) => {
  try {
    const { name, role, image, order } = req.body;
    const newMember = await prisma.teamMember.create({
      data: { name, role, image, order: order ? parseInt(order) : 0 }
    });
    res.status(201).json({ status: 201, data: newMember });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, image, order } = req.body;
    const updated = await prisma.teamMember.update({
      where: { id: parseInt(id) },
      data: { name, role, image, order: order ? parseInt(order) : undefined }
    });
    res.status(200).json({ status: 200, data: updated });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.teamMember.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ status: 200, message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};