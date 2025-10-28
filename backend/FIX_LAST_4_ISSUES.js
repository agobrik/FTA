const db = require('./ultra_database');

console.log('SON 4 SORUNU DÜZELTİYORUZ\n');
console.log('2x Overload (büyük harf) + 2x bozuk kelime...\n');

db.run(`
  UPDATE possession_tactics
  SET overload_patterns = REPLACE(REPLACE(REPLACE(
      overload_patterns,
      'Overload', 'Aşırı yükleme'),
      'kombinasyönü', 'kombinasyonu'),
      'pozisyönünu', 'pozisyonunu')
  WHERE id IN (25, 34)
`, [], function(err) {
  if (err) {
    console.log('ERROR:', err.message);
  } else {
    console.log(`✅ ${this.changes} kayıt düzeltildi!`);
    console.log('\nTüm saf İngilizce kelimeler temizlendi! ✅\n');
  }
  process.exit(0);
});
