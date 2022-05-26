const express = require('express');
const router = express.Router();

const cityControllers = require('../controllers/cityControllers');

router.get('/api/cities', cityControllers.all);
router.get('/api/cities/:id', cityControllers.single);

module.exports = router;