const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) return next(); // No token, continue without user auth

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user information to the request
  } catch (err) {
    console.log('Invalid token', err);
  }
  next();
};

module.exports = authMiddleware;
