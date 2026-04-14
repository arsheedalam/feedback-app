const feedbackModel = require('../models/feedback.model');

exports.addFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    const feedback = await feedbackModel.createFeedback(userId, message);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyFeedback = async (req, res) => {
  try {
    const userId = req.user.id;

    const feedbacks = await feedbackModel.getFeedbackByUser(userId);
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { message } = req.body;

    const updated = await feedbackModel.updateFeedback(id, userId, message);

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const userId = req.user.id;     // logged-in user
    const { id } = req.params;      // feedback id

    const deleted = await feedbackModel.deleteFeedback(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found or not yours" });
    }

    res.json({ message: "Feedback deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};