const jwt = require('jsonwebtoken');
const tokenSignature = require('../utils/global')
const authenticateToken = (req, res, next) => {
  // Get token from the Authorization header
  console.log(req.header('Authorization'));
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(403).json({ message: 'No token, authorization denied' });
  }


  try {
    // Verify token
    const decoded = jwt.verify(token,global.tokenSignature );

    // Attach the user to the request object
    req.user = decoded;

    next(); // Pass control to the next handler
  } catch (err) {
    return res.status(403).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticateToken;
