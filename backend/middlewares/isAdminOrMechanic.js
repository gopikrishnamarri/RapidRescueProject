const User = require('../models/user.model');
const Mechanic = require('../models/mechanic.model');

const isAdminOrMechanic = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in the request (from authentication middleware)

    // Check if the user is an admin
    const admin = await User.findById(userId);
    if (admin) {
      return next(); // Allow access
    }

    // Check if the user is a mechanic
    const mechanic = await Mechanic.findById(userId);
    if (mechanic) {
      return next(); // Allow access
    }

    // If the user is neither an admin nor a mechanic, deny access
    return res.status(403).send({ message: 'Access denied. Only admins and mechanics can perform this action.', status: 403 });
  } catch (error) {
    console.error("Error in isAdminOrMechanic middleware:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};

module.exports = isAdminOrMechanic;