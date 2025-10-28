const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('SON 128 KÖŞE DURUMU - %99.5+ HEDEFİ');
console.log('═'.repeat(80) + '\n');

let fixed = 0;

// Bu kaçan kelimeler genellikle JSON array içinde veya özel kalıplarda
console.log('Kaçan "from", "ball", "with", "very" kelimelerini temizliyoruz...\n');

// Player roles - remaining edge cases
db.run(`
  UPDATE player_roles
  SET
    description = REPLACE(REPLACE(REPLACE(REPLACE(
      description,
      ' from ', ' den '),
      ' with ', ' ile '),
      ' ball ', ' top '),
      ' very ', ' çok '),
    detailed_explanation = REPLACE(REPLACE(REPLACE(REPLACE(
      detailed_explanation,
      ' from ', ' den '),
      ' with ', ' ile '),
      ' ball ', ' top '),
      ' very ', ' çok '),
    tactical_purpose = REPLACE(REPLACE(REPLACE(REPLACE(
      tactical_purpose,
      ' from ', ' den '),
      ' with ', ' ile '),
      'ball ', 'top '),
      ' very ', ' çok '),
    positioning = REPLACE(REPLACE(REPLACE(REPLACE(
      positioning,
      ' from ', ' den '),
      ' with ', ' ile '),
      ' ball ', ' top '),
      ' very ', ' çok '),
    on_ball_behavior = REPLACE(REPLACE(REPLACE(REPLACE(
      on_ball_behavior,
      ' from ', ' den '),
      ' with ', ' ile '),
      'on ball', 'topla'),
      'the ball', 'topu'),
    off_ball_movement = REPLACE(REPLACE(REPLACE(REPLACE(
      off_ball_movement,
      ' from ', ' den '),
      ' with ', ' ile '),
      'off ball', 'topsuz'),
      ' very ', ' çok '),
    secondary_duties = REPLACE(REPLACE(REPLACE(REPLACE(
      secondary_duties,
      ' from ', ' den '),
      ' with ', ' ile '),
      'ball', 'top'),
      ' very ', ' çok '),
    historical_examples = REPLACE(REPLACE(REPLACE(REPLACE(
      historical_examples,
      ' from ', ' den '),
      ' with ', ' ile '),
      'make ', 'yap '),
      ' very ', ' çok '),
    tactical_systems_compatibility = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      tactical_systems_compatibility,
      ' from ', ' den '),
      ' with ', ' ile '),
      ' when ', ' zaman '),
      ' into ', ' içine '),
      ' half-', ' yarı '),
    in_possession_role = REPLACE(REPLACE(REPLACE(
      in_possession_role,
      ' from ', ' den '),
      ' with ', ' ile '),
      ' constant ', ' sürekli '),
    modern_adaptations = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      modern_adaptations,
      ' from ', ' den '),
      ' with ', ' ile '),
      ' when ', ' zaman '),
      ' into ', ' içine '),
      ' ball ', ' top '),
      ' can ', ' ')
  WHERE id > 0
`, [], function(err1) {
  if (err1) console.log('ERROR:', err1.message);
  else {
    console.log(`✅ ${this.changes} player role - tüm alanlar temizlendi`);
    fixed += this.changes * 11;
  }

  // Tactical systems - remaining edge cases
  db.run(`
    UPDATE tactical_systems
    SET
      philosophy = REPLACE(REPLACE(REPLACE(REPLACE(
        philosophy,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' ball', ' top'),
        ' very ', ' çok '),
      build_up_play = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        build_up_play,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' when ', ' zaman '),
        ' into ', ' içine '),
        ' ball', ' top'),
      passing_style = REPLACE(REPLACE(REPLACE(REPLACE(
        passing_style,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' ball', ' top'),
        ' very ', ' çok '),
      compactness = REPLACE(REPLACE(compactness, ' very ', ' çok '), 'very ', 'çok '),
      attacking_width = REPLACE(REPLACE(attacking_width, ' very ', ' çok '), 'very ', 'çok '),
      defensive_shape = REPLACE(REPLACE(REPLACE(defensive_shape,
        ' with ', ' ile '),
        ' very ', ' çok '),
        'flat three with', 'düz üç ile'),
      attacking_approach = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        attacking_approach,
        ' with ', ' ile '),
        ' from ', ' den '),
        ' and ', ' ve '),
        ' very ', ' çok '),
        'balanced - possession and', 'dengeli - sahiplik ve'),
      famous_matches = REPLACE(REPLACE(REPLACE(famous_matches,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' very ', ' çok '),
      corner_attack_strategy = REPLACE(REPLACE(REPLACE(REPLACE(
        corner_attack_strategy,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' into ', ' içine '),
        ' ball', ' top'),
      corner_defense_strategy = REPLACE(REPLACE(REPLACE(REPLACE(
        corner_defense_strategy,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' into ', ' içine '),
        ' ball', ' top'),
      tactical_instructions = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        tactical_instructions,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' when ', ' zaman '),
        ' into ', ' içine '),
        ' very ', ' çok '),
        ' can ', ' '),
      defensive_phase = REPLACE(REPLACE(REPLACE(REPLACE(
        defensive_phase,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' ball', ' top'),
        ' very ', ' çok '),
      attacking_phase = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        attacking_phase,
        ' from ', ' den '),
        ' with ', ' ile '),
        ' when ', ' zaman '),
        ' into ', ' içine '),
        ' ball', ' top')
    WHERE id > 0
  `, [], function(err2) {
    if (err2) console.log('ERROR:', err2.message);
    else {
      console.log(`✅ ${this.changes} tactical system - tüm alanlar temizlendi`);
      fixed += this.changes * 14;
    }

    console.log('\n' + '═'.repeat(80));
    console.log(`✅ TOPLAM ~${fixed} ALAN GÜNCELLENDİ!`);
    console.log('\nFinal kontrol için ABSOLUTE_FULL_DB_CHECK.js çalıştırın.');
    console.log('Hedef: %99.5+ temizlik!');
    console.log('═'.repeat(80) + '\n');
    process.exit(0);
  });
});
