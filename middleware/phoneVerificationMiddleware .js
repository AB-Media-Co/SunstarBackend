import jwt from 'jsonwebtoken';

export const phoneVerificationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.phoneVerified) {
      req.user = decoded; 
      return next();
    } else {
      return res.status(401).json({ error: 'Phone number not verified' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
