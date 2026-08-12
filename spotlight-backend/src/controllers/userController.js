
const getUsers = (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'User One' },
      { id: 2, name: 'User Two' }
    ]
  });
};

module.exports = { getUsers };