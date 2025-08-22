const jwt = require('jsonwebtoken');
const { tokenSignature } = require('../../utils/global');

exports.isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, tokenSignature);
    req.user = decoded;

    if (decoded?.role !== 'admin') {
      return res.status(403).json({ message: 'Access restricted to admin only.' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

