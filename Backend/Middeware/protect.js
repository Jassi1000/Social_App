const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.protect = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Token is empty' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Token is Invalid' });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Error in protect middleware:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}