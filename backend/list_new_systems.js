const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5002,
  path: '/api/tactical-analysis/systems',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      const systems = response.data || response;
      const modern2024 = systems.filter(s => s.era === '2024-2025');

      console.log('\n🎯 API DAN ALINAN 2024-2025 SİSTEMLER:\n');
      modern2024.forEach((s, i) => {
        console.log(`${i + 1}. ${s.name}`);
        console.log(`   ${s.formation} | ${s.style}`);
        console.log(`   Pressing: ${s.pressing_intensity}/10 | Etkinlik: ${s.effectiveness_rating}/10\n`);
      });
      console.log(`✅ API'den ${modern2024.length} modern sistem alındı!`);
      console.log(`📊 Toplam ${systems.length} sistem API'de mevcut\n`);
    } catch (e) {
      console.log('❌ Parse error:', e.message);
      console.log('Response:', data.substring(0, 200));
    }
  });
});

req.on('error', (error) => {
  console.error('❌ API Error:', error.message);
  console.log('\n💡 Server çalışmıyor olabilir. Başlatmak için:');
  console.log('   cd backend && npm start');
});

req.end();
