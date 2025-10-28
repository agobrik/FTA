/**
 * Tarih formatlama
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '';

  const d = new Date(date);

  if (format === 'short') {
    return d.toLocaleDateString('tr-TR');
  }

  if (format === 'long') {
    return d.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (format === 'datetime') {
    return d.toLocaleString('tr-TR');
  }

  return d.toLocaleDateString('tr-TR');
};

/**
 * Sayı formatlama
 */
export const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined) return '0';

  return Number(num).toFixed(decimals);
};

/**
 * Yüzde formatlama
 */
export const formatPercentage = (value, total) => {
  if (!total || total === 0) return '0%';

  const percentage = (value / total) * 100;
  return `${formatNumber(percentage, 1)}%`;
};

/**
 * Rating rengi
 */
export const getRatingColor = (rating) => {
  if (rating >= 80) return 'text-green-600';
  if (rating >= 70) return 'text-green-500';
  if (rating >= 60) return 'text-yellow-500';
  if (rating >= 50) return 'text-orange-500';
  return 'text-red-500';
};

/**
 * Pozisyon kısaltması
 */
export const getPositionAbbr = (position) => {
  const abbr = {
    'Kaleci': 'KAL',
    'Defans': 'DEF',
    'Orta Saha': 'OS',
    'Forvet': 'FOR'
  };

  return abbr[position] || position;
};

/**
 * Maç sonucu badge rengi
 */
export const getResultColor = (result) => {
  const colors = {
    'Galibiyet': 'bg-green-100 text-green-800',
    'Beraberlik': 'bg-yellow-100 text-yellow-800',
    'Mağlubiyet': 'bg-red-100 text-red-800'
  };

  return colors[result] || 'bg-gray-100 text-gray-800';
};

/**
 * Süre formatlama (dakika → saat:dakika)
 */
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}s ${mins}dk`;
  }

  return `${mins}dk`;
};

export default {
  formatDate,
  formatNumber,
  formatPercentage,
  getRatingColor,
  getPositionAbbr,
  getResultColor,
  formatDuration
};
