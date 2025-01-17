

const express = require('express');
const router = express.Router();
const analyzeEmotion  = require('../utils/emotionAnalysis');

router.post('/log', analyzeEmotion );

module.exports = router;

// 