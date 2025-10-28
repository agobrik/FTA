const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Yetkilendirme gerekli. Lütfen giriş yapın.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production');

    // Add user info to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.'
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Geçersiz yetkilendirme token.'
    });
  }
};

// Optional: Role-based auth
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Yetkilendirme gerekli.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Bu işlem için yetkiniz yok.'
      });
    }

    next();
  };
};

module.exports = { auth, authorize };
