const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

const adminController = require('../controllers/admin.controller');

router.get('/', auth, admin, adminController.getAllFeedback);

module.exports = router;