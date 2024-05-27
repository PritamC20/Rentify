//propertyControllers.js

const Property = require('../models/Property');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.interestedInProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner');
        const buyer = req.user;

        const mailOptions = {
            from: process.env.EMAIL,
            to: property.owner.email,
            subject: 'New Interest in Your Property',
            text: `Hi ${property.owner.firstName},\n\n${buyer.firstName} ${buyer.lastName} is interested in your property located at ${property.place}.\n\nContact Details:\nEmail: ${buyer.email}\nPhone: ${buyer.phoneNumber}\n\nRegards,\nRentify`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send('Interest email sent');
    } catch (err) {
        res.status(500).send('Error sending email');
    }
};

exports.createProperty = async (req, res) => {
    const propertyData = req.body;
    propertyData.owner = req.user.userId;

    try {
        const property = new Property(propertyData);
        await property.save();
        res.status(201).send('Property created');
    } catch (err) {
        res.status(500).send('Error creating property');
    }
};

exports.getProperties = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const properties = await Property.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Property.countDocuments();
        res.status(200).json({
            properties,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).send('Error fetching properties');
    }
};

exports.getUserProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.userId });
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).send('Error fetching properties');
    }
};

exports.updateProperty = async (req, res) => {
    try {
        await Property.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send('Property updated');
    } catch (err) {
        res.status(500).send('Error updating property');
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.status(200).send('Property deleted');
    } catch (err) {
        res.status(500).send('Error deleting property');
    }
};

exports.likeProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        property.likes += 1;
        await property.save();
        res.status(200).send('Property liked');
    } catch (err) {
        res.status(500).send('Error liking property');
    }
};
