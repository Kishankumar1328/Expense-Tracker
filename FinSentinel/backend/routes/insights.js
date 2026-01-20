const express = require('express');
const router = express.Router();
const insightController = require('../controllers/insightController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', insightController.getInsights);

module.exports = router;
