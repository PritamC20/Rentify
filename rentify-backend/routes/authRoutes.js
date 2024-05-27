//rentify-backend/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const { validate, registerSchema } = require('../middleware/validate');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', login);

module.exports = router;
