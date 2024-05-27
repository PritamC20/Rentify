//authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, isSeller } = req.body;

    try {
        const user = new User({ firstName, lastName, email, phoneNumber, password, isSeller });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send('Error logging in');
    }
};
