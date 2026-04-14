const feedbackModel = require('../models/feedback.model');

exports.getAllFeedback = async (req, res) => {

const data = await feedbackModel.getAllFeedback()

res.json(data)

}