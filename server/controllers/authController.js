const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is missing');
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);

        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log('Login attempt:', req.body); // Debug log

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            console.log('Missing credentials');
            return res.status(400).json({
                success: false,
                error: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        // Compare passwords
        console.log('Comparing password for user:', user.email);
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('Password mismatch for user:', user.email);
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        // Generate token
        const token = generateToken(user._id);
        console.log('Login successful for user:', user.email);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login Error:', {
            message: error.message,
            stack: error.stack,
            body: req.body
        });

        res.status(500).json({
            success: false,
            error: "Server error during login",
            detailed: process.env.NODE_ENV === 'development' ? {
                message: error.message,
                stack: error.stack
            } : null
        });
    }
};