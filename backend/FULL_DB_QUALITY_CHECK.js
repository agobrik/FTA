const db = require('./ultra_database');

console.log('═'.repeat(70));
console.log('TÜM VERİTABANI KALİTE KONTROLÜ');
console.log('Her kayıt kontrol ediliyor - mantıklı Türkçe mi?');
console.log('═'.repeat(70) + '\n');

const problematicRecords = [];

// İngilizce kelime tespiti
const englishWords = [
  'the', 'and', 'with', 'when', 'ball', 'balls', 'player', 'players',
  'press', 'pressing', 'attack', 'attacking', 'defend', 'defending',
  'zone', 'zones', 'space', 'spaces', 'wing', 'wings', 'forward', 'forwards',
  'midfielder', 'midfielders', 'defender', 'defenders', 'fullback', 'fullbacks',
  'goalkeeper', 'possession', 'buildup', 'build-up', 'compact', 'transition',
  'transitions', 'counter-attack', 'counter', 'overlap', 'overload', 'overloads',
  'inverted', 'wide', 'narrow', 'line', 'trap', 'lanes', 'passing', 'runs',
  'movement', 'rotation', 'circulation', 'progression', 'quick', 'fast', 'slow',
  'patient', 'aggressive', 'passive', 'active', 'intense', 'extreme', 'high',
  'low', 'deep', 'can', 'will', 'should', 'must', 'exploit', 'vulnerable',
  'weakness', 'strength', 'force', 'deny', 'allow', 'create', 'break',
  'struggle', 'lack', 'creativity', 'repeatedly', 'effective', 'devastating',
  'simple', 'complex', 'organized', 'system', 'style', 'philosophy', 'strategy',
  'tactic', 'tactics', 'make', 'play', 'time', 'beat', 'offside', 'very',
  'success', 'rate', 'constant', 'mirror', 'approach', 'forced', 'about',
  'this', 'exploiting', 'exploited', 'plays', 'played', 'playing', 'attacks',
  'attacked', 'defends', 'defended'
];

// Futbol terimleri - BUNLAR OLMALI (hariç tutulacak)
const validFootballTerms = [
  'Gegenpressing', 'Possession', 'Wing-Back', 'wing-back', 'Inverted',
  'Defensive', 'Balanced', 'Compact', 'Diamond', 'Bus'
];

// Özel isimler
const properNames = [
  'Guardiola', 'Klopp', 'Mourinho', 'Conte', 'Ancelotti', 'Tuchel',
  'Arteta', 'Ten Hag', 'Simeone', 'Gasperini', 'Ranieri', 'Zidane',
  'Inzaghi', 'Flick', 'Sacchi', 'Cruyff', 'Van Gaal', 'Bielsa',
  'Rangnick', 'Nagelsmann', 'Chapman', 'Pochettino', 'Zeman', 'Löw',
  'Valverde', 'Bosz', 'Mancini', 'Emery', 'Spalletti', 'Xavi',
  'Luis Enrique', 'Heynckes', 'Allegri', 'Sarri', 'Deschamps', 'Scaloni',
  'Slot', 'Iraola', 'Postecoglou', 'De Zerbi', 'Xabi Alonso', 'Kompany'
];

function hasEnglishWords(text) {
  if (!text) return [];

  const found = [];
  const lowerText = text.toLowerCase();

  englishWords.forEach(word => {
    // Kelime sınırlarıyla kontrol et
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lowerText)) {
      // Futbol terimi veya özel isim değilse ekle
      let isValid = false;
      validFootballTerms.forEach(term => {
        if (text.includes(term)) isValid = true;
      });
      properNames.forEach(name => {
        if (text.includes(name)) isValid = true;
      });

      if (!isValid) {
        found.push(word);
      }
    }
  });

  return found;
}

console.log('1/6: Tactical Systems kontrol ediliyor...\n');

db.all('SELECT * FROM tactical_systems ORDER BY id', [], (err, systems) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  systems.forEach(s => {
    const englishIn = hasEnglishWords(s.in_possession_shape);
    const englishOut = hasEnglishWords(s.out_of_possession_shape);

    if (englishIn.length > 0 || englishOut.length > 0) {
      problematicRecords.push({
        table: 'tactical_systems',
        id: s.id,
        name: s.name,
        issues: {
          in_possession: englishIn,
          out_of_possession: englishOut
        },
        sample: s.in_possession_shape ? s.in_possession_shape.substring(0, 100) : ''
      });
    }
  });

  console.log(`   Tactical Systems: ${systems.length} kayıt tarandı, ${problematicRecords.filter(r => r.table === 'tactical_systems').length} sorunlu`);
  checkSystemWeaknesses();
});

function checkSystemWeaknesses() {
  console.log('2/6: System Weaknesses kontrol ediliyor...\n');

  db.all('SELECT * FROM system_weaknesses ORDER BY id', [], (err, weaknesses) => {
    if (err) {
      checkPressingZones();
      return;
    }

    weaknesses.forEach(w => {
      const englishDesc = hasEnglishWords(w.weakness_description);
      const englishExploit = hasEnglishWords(w.how_to_exploit);

      if (englishDesc.length > 0 || englishExploit.length > 0) {
        problematicRecords.push({
          table: 'system_weaknesses',
          id: w.id,
          type: w.weakness_type,
          issues: {
            description: englishDesc,
            exploit: englishExploit
          },
          sample: w.weakness_description ? w.weakness_description.substring(0, 100) : ''
        });
      }
    });

    console.log(`   System Weaknesses: ${weaknesses.length} kayıt tarandı, ${problematicRecords.filter(r => r.table === 'system_weaknesses').length} sorunlu`);
    checkPressingZones();
  });
}

function checkPressingZones() {
  console.log('3/6: Pressing Trap Zones kontrol ediliyor...\n');

  db.all('SELECT * FROM pressing_trap_zones ORDER BY id', [], (err, zones) => {
    if (err) {
      checkPossessionTactics();
      return;
    }

    zones.forEach(z => {
      const englishExec = hasEnglishWords(z.trap_execution);

      if (englishExec.length > 0) {
        problematicRecords.push({
          table: 'pressing_trap_zones',
          id: z.id,
          name: z.trap_name,
          issues: {
            execution: englishExec
          },
          sample: z.trap_execution ? z.trap_execution.substring(0, 100) : ''
        });
      }
    });

    console.log(`   Pressing Zones: ${zones.length} kayıt tarandı, ${problematicRecords.filter(r => r.table === 'pressing_trap_zones').length} sorunlu`);
    checkPossessionTactics();
  });
}

function checkPossessionTactics() {
  console.log('4/6: Possession Tactics kontrol ediliyor...\n');

  db.all('SELECT * FROM possession_tactics ORDER BY id', [], (err, poss) => {
    if (err) {
      checkNonPossessionTactics();
      return;
    }

    poss.forEach(p => {
      const englishCirc = hasEnglishWords(p.circulation_patterns);
      const englishProg = hasEnglishWords(p.progression_patterns);

      if (englishCirc.length > 0 || englishProg.length > 0) {
        problematicRecords.push({
          table: 'possession_tactics',
          id: p.id,
          issues: {
            circulation: englishCirc,
            progression: englishProg
          },
          sample: p.circulation_patterns ? p.circulation_patterns.substring(0, 100) : ''
        });
      }
    });

    console.log(`   Possession Tactics: ${poss.length} kayıt tarandı, ${problematicRecords.filter(r => r.table === 'possession_tactics').length} sorunlu`);
    checkNonPossessionTactics();
  });
}

function checkNonPossessionTactics() {
  console.log('5/6: Non-Possession Tactics kontrol ediliyor...\n');

  db.all('SELECT * FROM non_possession_tactics ORDER BY id', [], (err, nonposs) => {
    if (err) {
      checkCounterTactics();
      return;
    }

    nonposs.forEach(n => {
      const englishDef = hasEnglishWords(n.defensive_philosophy);
      const englishPress = hasEnglishWords(n.pressing_philosophy);

      if (englishDef.length > 0 || englishPress.length > 0) {
        problematicRecords.push({
          table: 'non_possession_tactics',
          id: n.id,
          issues: {
            defensive: englishDef,
            pressing: englishPress
          },
          sample: n.defensive_philosophy ? n.defensive_philosophy.substring(0, 100) : ''
        });
      }
    });

    console.log(`   Non-Possession Tactics: ${nonposs.length} kayıt tarandı, ${problematicRecords.filter(r => r.table === 'non_possession_tactics').length} sorunlu`);
    checkCounterTactics();
  });
}

function checkCounterTactics() {
  console.log('6/6: Counter Tactics kontrol ediliyor...\n');

  db.all('SELECT * FROM counter_tactics ORDER BY id', [], (err, counters) => {
    if (err) {
      finishCheck();
      return;
    }

    counters.forEach(c => {
      const englishStrat = hasEnglishWords(c.detailed_strategy);

      if (englishStrat.length > 0) {
        problematicRecords.push({
          table: 'counter_tactics',
          id: c.id,
          name: c.counter_name,
          issues: {
            strategy: englishStrat
          },
          sample: c.detailed_strategy ? c.detailed_strategy.substring(0, 100) : ''
        });
      }
    });

    console.log(`   Counter Tactics: ${counters.length} kayıt tarandı, ${problematicRecords.filter(r => r.table === 'counter_tactics').length} sorunlu`);
    finishCheck();
  });
}

function finishCheck() {
  console.log('\n' + '═'.repeat(70));
  console.log('TARAMA TAMAMLANDI!\n');

  if (problematicRecords.length === 0) {
    console.log('✅ TÜM VERİTABANI TEMİZ! Hiç İngilizce kelime yok.\n');
  } else {
    console.log(`❌ ${problematicRecords.length} SORUNLU KAYIT BULUNDU:\n`);

    // Tabloya göre grupla
    const byTable = {};
    problematicRecords.forEach(r => {
      if (!byTable[r.table]) byTable[r.table] = [];
      byTable[r.table].push(r);
    });

    Object.keys(byTable).forEach(table => {
      console.log(`\n📋 ${table}: ${byTable[table].length} sorunlu kayıt`);
      byTable[table].slice(0, 5).forEach(r => {
        console.log(`   ID ${r.id}: ${JSON.stringify(r.issues)}`);
        console.log(`   Örnek: "${r.sample}..."`);
      });
      if (byTable[table].length > 5) {
        console.log(`   ... ve ${byTable[table].length - 5} kayıt daha`);
      }
    });

    console.log('\n\nDetaylı rapor için veriler hazır.');
  }

  console.log('\n' + '═'.repeat(70) + '\n');
  process.exit(0);
}
