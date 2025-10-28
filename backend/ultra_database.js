const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { promisify } = require('util');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const ultraDb = new sqlite3.Database(dbPath);

// Promisify database methods for async/await support
ultraDb.runAsync = promisify(ultraDb.run.bind(ultraDb));
ultraDb.getAsync = promisify(ultraDb.get.bind(ultraDb));
ultraDb.allAsync = promisify(ultraDb.all.bind(ultraDb));

module.exports = ultraDb;
