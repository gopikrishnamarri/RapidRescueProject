const Feedback = require('../models/feedback.model');
const User = require('../models/user.model');
const Mechanic = require('../models/mechanic.model');
const Issue = require('../models/issue.model');

exports.submitFeedback = async (req, res) => {
  try {
    const { user_Id, mechanic_Id, issue_Id, rating, comment } = req.body;

    // Validate required fields
    if (!user_Id || !mechanic_Id || !issue_Id || !rating) {
      return res.status(400).send({ message: 'user_Id, mechanic_Id, issue_Id, and rating are required', status: 400 });
    }

    // Validate rating (must be between 1 and 5)
    if (rating < 1 || rating > 5) {
      return res.status(400).send({ message: 'Rating must be between 1 and 5', status: 400 });
    }

    // Check if the user exists
    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).send({ message: 'User not found', status: 404 });
    }

    // Check if the mechanic exists
    const mechanic = await Mechanic.findById(mechanic_Id);
    if (!mechanic) {
      return res.status(404).send({ message: 'Mechanic not found', status: 404 });
    }

    // Check if the issue exists
    const issue = await Issue.findById(issue_Id);
    if (!issue) {
      return res.status(404).send({ message: 'Issue not found', status: 404 });
    }

    // Create the feedback
    const newFeedback = await Feedback.create({
      user_Id,
      mechanic_Id,
      issue_Id,
      rating,
      comment
    });

    return res.status(200).send({
      data: newFeedback,
      message: 'Feedback submitted successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in submitFeedback:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};