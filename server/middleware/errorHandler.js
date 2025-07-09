const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose bad ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid ObjectId' });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(400).json({ message: 'Duplicate key error' });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ message: errors.join(', ') });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    } 

    // JWT expires
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Not authorized, token expired' });
    }

    // Default to 500 server error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error'
    });
};

module.exports = errorHandler;