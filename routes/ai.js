// routes/ai.js

const express = require('express');
const router = express.Router();
const { analyzeSkills } = require('../controllers/aiController');

router.post('/skill-analyze', analyzeSkills);

module.exports = router;
