require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const db = require('./database');

// Environment validation - Critical for production
const requiredEnvVars = ['JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ HATA: Eksik environment variable\'lar:', missingEnvVars.join(', '));
  console.error('💡 İpucu: .env dosyanızda bu değişkenleri tanımladığınızdan emin olun.');
  if (process.env.NODE_ENV === 'production') {
    console.error('⚠️  Production ortamında çalıştırma durduruldu.');
    process.exit(1);
  } else {
    console.warn('⚠️  Development ortamında devam ediliyor, ancak JWT_SECRET tanımlanmalı!');
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
const { auth } = require('./middleware/auth');

// Routes
const authRouter = require('./routes/auth');
const playersRouter = require('./routes/players');
const matchesRouter = require('./routes/matches');
const tacticsRouter = require('./routes/tactics');
const opponentsRouter = require('./routes/opponents');
const trainingRouter = require('./routes/training');
const dashboardRouter = require('./routes/dashboard');
const tacticalAnalysisRouter = require('./routes/tacticalAnalysis');
const exportRouter = require('./routes/export');

// Public routes (Authentication disabled for demo/development)
app.use('/api/auth', authRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/tactical-analysis', tacticalAnalysisRouter);
app.use('/api/players', playersRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/tactics', tacticsRouter);
app.use('/api/opponents', opponentsRouter);
app.use('/api/training', trainingRouter);
app.use('/api/export', exportRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Football Tactics API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint bulunamadı',
    path: req.path
  });
});

// Global error handler - must be last
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Sunucu hatası oluştu';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});
