const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../database');
const { auth } = require('../middleware/auth');

// Register new user
router.post('/register',
  [
    body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Kullanıcı adı 3-50 karakter olmalı'),
    body('email').isEmail().normalizeEmail().withMessage('Geçerli bir email adresi girin'),
    body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalı'),
    body('team_name').optional().trim(),
    body('full_name').optional().trim()
  ],
  async (req, res) => {
    try {
      // Validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array()[0].msg
        });
      }

      const { username, email, password, team_name, full_name } = req.body;

      // Check if user exists (using async/await)
      const existingUser = await db.getAsync(
        'SELECT id FROM users WHERE email = ? OR username = ?',
        [email, username]
      );

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Bu kullanıcı adı veya email zaten kullanılıyor'
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Create user (using async/await)
      const sql = `INSERT INTO users (username, email, password_hash, team_name, full_name, role)
                   VALUES (?, ?, ?, ?, ?, 'coach')`;

      const result = await db.runAsync(sql, [username, email, password_hash, team_name, full_name]);

      // Create JWT token
      const token = jwt.sign(
        { id: result.lastID, username, email, role: 'coach' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      res.status(201).json({
        success: true,
        message: 'Hesabınız başarıyla oluşturuldu',
        data: {
          user: {
            id: result.lastID,
            username,
            email,
            team_name,
            full_name,
            role: 'coach'
          },
          token
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Geçerli bir email adresi girin'),
    body('password').notEmpty().withMessage('Şifre gerekli')
  ],
  async (req, res) => {
    try {
      // Validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array()[0].msg
        });
      }

      const { email, password } = req.body;

      // Find user (using async/await)
      const user = await db.getAsync('SELECT * FROM users WHERE email = ?', [email]);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Email veya şifre hatalı'
        });
      }

      // Check if user is active
      if (!user.is_active) {
        return res.status(401).json({
          success: false,
          error: 'Hesabınız devre dışı bırakılmış'
        });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Email veya şifre hatalı'
        });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      res.json({
        success: true,
        message: 'Giriş başarılı',
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            team_name: user.team_name,
            full_name: user.full_name,
            role: user.role
          },
          token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const sql = 'SELECT id, username, email, team_name, full_name, role, avatar_url, created_at FROM users WHERE id = ?';

    const user = await db.getAsync(sql, [req.user.id]);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Kullanıcı bulunamadı'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update profile
router.put('/profile', auth,
  [
    body('full_name').optional().trim(),
    body('team_name').optional().trim(),
    body('avatar_url').optional().isURL().withMessage('Geçerli bir URL girin')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
    }

    const { full_name, team_name, avatar_url } = req.body;
    const updates = [];
    const values = [];

    if (full_name !== undefined) {
      updates.push('full_name = ?');
      values.push(full_name);
    }
    if (team_name !== undefined) {
      updates.push('team_name = ?');
      values.push(team_name);
    }
    if (avatar_url !== undefined) {
      updates.push('avatar_url = ?');
      values.push(avatar_url);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Güncellenecek alan bulunamadı'
      });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(req.user.id);

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

    db.run(sql, values, function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }

      res.json({
        success: true,
        message: 'Profil başarıyla güncellendi'
      });
    });
  }
);

// Change password
router.put('/change-password', auth,
  [
    body('current_password').notEmpty().withMessage('Mevcut şifre gerekli'),
    body('new_password').isLength({ min: 6 }).withMessage('Yeni şifre en az 6 karakter olmalı')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array()[0].msg
        });
      }

      const { current_password, new_password } = req.body;

      // Get user
      db.get('SELECT password_hash FROM users WHERE id = ?', [req.user.id], async (err, user) => {
        if (err) {
          return res.status(500).json({ success: false, error: err.message });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(current_password, user.password_hash);

        if (!isMatch) {
          return res.status(400).json({
            success: false,
            error: 'Mevcut şifre hatalı'
          });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(new_password, salt);

        // Update password
        db.run('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [password_hash, req.user.id],
          (err) => {
            if (err) {
              return res.status(500).json({ success: false, error: err.message });
            }

            res.json({
              success: true,
              message: 'Şifre başarıyla değiştirildi'
            });
          }
        );
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
