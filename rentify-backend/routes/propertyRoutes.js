//rentify-backend/routes/propertyRoutes.js
const express = require('express');
const {
    createProperty,
    getProperties,
    getUserProperties,
    updateProperty,
    deleteProperty,
    likeProperty,
    interestedInProperty
} = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const { validate, propertySchema } = require('../middleware/validate');

const router = express.Router();

router.post('/', authMiddleware, validate(propertySchema), createProperty);
router.get('/', getProperties);
router.get('/my-properties', authMiddleware, getUserProperties);
router.put('/:id', authMiddleware, validate(propertySchema), updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);
router.patch('/:id/like', authMiddleware, likeProperty);
router.post('/:id/interested', authMiddleware, interestedInProperty);

module.exports = router;
