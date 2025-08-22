const jwt = require('jsonwebtoken');
const { tokenSignature } = require('../../utils/global')
const authenticateToken = (req, res, next) => {
  // Get token from the Authorization header
  // const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  // console.log(token);
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(403).json({ message: 'No token, authorization denied' });
  }


  try {
    // Verify token
    const decoded = jwt.verify(token, tokenSignature );

    // Attach the user to the request object
    req.user = decoded;

    next(); // Pass control to the next handler
  } catch (err) {
    return res.status(403).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticateToken;
