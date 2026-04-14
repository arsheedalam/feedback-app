const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, feedbackController.addFeedback);
router.get('/', authMiddleware, feedbackController.getMyFeedback);
router.put('/:id', authMiddleware, feedbackController.editFeedback);
router.delete('/:id', authMiddleware, feedbackController.deleteFeedback);
module.exports = router;