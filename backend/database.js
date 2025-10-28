const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { promisify } = require('util');

const dbPath = path.join(__dirname, 'football_tactics.db');
const db = new sqlite3.Database(dbPath);

// Promisify database methods for async/await support
db.runAsync = promisify(db.run.bind(db));
db.getAsync = promisify(db.get.bind(db));
db.allAsync = promisify(db.all.bind(db));

// Veritabanı tablolarını oluştur
db.serialize(() => {
  // Oyuncular tablosu
  db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    age INTEGER,
    jersey_number INTEGER,
    height INTEGER,
    weight INTEGER,
    nationality TEXT,
    preferred_foot TEXT,
    rating INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Oyuncu istatistikleri tablosu
  db.run(`CREATE TABLE IF NOT EXISTS player_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER,
    matches_played INTEGER DEFAULT 0,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    yellow_cards INTEGER DEFAULT 0,
    red_cards INTEGER DEFAULT 0,
    minutes_played INTEGER DEFAULT 0,
    pass_accuracy REAL DEFAULT 0,
    shots INTEGER DEFAULT 0,
    tackles INTEGER DEFAULT 0,
    interceptions INTEGER DEFAULT 0,
    season TEXT,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
  )`);

  // Maçlar tablosu
  db.run(`CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    opponent TEXT NOT NULL,
    match_date DATE NOT NULL,
    location TEXT,
    home_away TEXT,
    score_home INTEGER,
    score_away INTEGER,
    formation TEXT,
    result TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Maç performans metrikleri tablosu
  db.run(`CREATE TABLE IF NOT EXISTS match_performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id INTEGER,
    possession REAL,
    shots INTEGER,
    shots_on_target INTEGER,
    corners INTEGER,
    fouls INTEGER,
    offsides INTEGER,
    passes INTEGER,
    pass_accuracy REAL,
    tackles INTEGER,
    saves INTEGER,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
  )`);

  // Maç oyuncu performansı tablosu
  db.run(`CREATE TABLE IF NOT EXISTS match_player_performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id INTEGER,
    player_id INTEGER,
    minutes_played INTEGER,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    yellow_card INTEGER DEFAULT 0,
    red_card INTEGER DEFAULT 0,
    rating REAL,
    notes TEXT,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
  )`);

  // Taktik şablonları tablosu
  db.run(`CREATE TABLE IF NOT EXISTS tactics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    formation TEXT NOT NULL,
    description TEXT,
    style TEXT,
    positions TEXT,
    instructions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Rakip takımlar tablosu
  db.run(`CREATE TABLE IF NOT EXISTS opponents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    league TEXT,
    typical_formation TEXT,
    playing_style TEXT,
    strengths TEXT,
    weaknesses TEXT,
    key_players TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Antrenman şablonları tablosu
  db.run(`CREATE TABLE IF NOT EXISTS training_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    duration INTEGER,
    description TEXT,
    objectives TEXT,
    equipment TEXT,
    exercises TEXT,
    difficulty TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Antrenman planları tablosu
  db.run(`CREATE TABLE IF NOT EXISTS training_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    template_id INTEGER,
    notes TEXT,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES training_templates(id) ON DELETE SET NULL
  )`);

  console.log('Veritabanı tabloları oluşturuldu.');
});

module.exports = db;
