//validate.js

const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    isSeller: Joi.boolean().required()
});

const propertySchema = Joi.object({
    place: Joi.string().required(),
    area: Joi.number().required(),
    bedrooms: Joi.number().required(),
    bathrooms: Joi.number().required(),
    nearby: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required()
});

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
};

module.exports = {
    registerSchema,
    propertySchema,
    validate
};
