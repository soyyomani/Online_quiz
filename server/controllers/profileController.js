const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedFields = {
      name,
      email,
      ...(profilePicture && { profilePicture })
    };

    const user = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
