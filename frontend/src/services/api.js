import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.error || 'Bir hata oluştu';
      const statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          toast.error(`Geçersiz istek: ${message}`);
          break;
        case 401:
          // 401 errors are suppressed - no authentication system in demo mode
          console.warn('Authentication error (suppressed in demo mode):', message);
          break;
        case 403:
          toast.error('Bu işlem için yetkiniz yok.');
          break;
        case 404:
          // Suppress 404 errors - just log them
          console.warn('Not found:', message);
          break;
        case 429:
          toast.error('Çok fazla istek gönderdiniz. Lütfen bekleyin.');
          break;
        case 500:
          toast.error('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.');
          break;
        default:
          // Only show errors for actual problems
          if (statusCode >= 500) {
            toast.error(message);
          }
      }
    } else if (error.request) {
      toast.error('Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.');
    } else {
      toast.error('Beklenmeyen bir hata oluştu.');
    }

    return Promise.reject(error);
  }
);

// Players API
export const playersAPI = {
  getAll: () => api.get('/players'),
  getById: (id) => api.get(`/players/${id}`),
  getStats: (id) => api.get(`/players/${id}/stats`),
  create: (data) => api.post('/players', data),
  update: (id, data) => api.put(`/players/${id}`, data),
  delete: (id) => api.delete(`/players/${id}`),
  updateStats: (id, data) => api.put(`/players/${id}/stats`, data),
};

// Matches API
export const matchesAPI = {
  getAll: () => api.get('/matches'),
  getById: (id) => api.get(`/matches/${id}`),
  getPerformance: (id) => api.get(`/matches/${id}/performance`),
  getPlayers: (id) => api.get(`/matches/${id}/players`),
  create: (data) => api.post('/matches', data),
  update: (id, data) => api.put(`/matches/${id}`, data),
  delete: (id) => api.delete(`/matches/${id}`),
  addPerformance: (id, data) => api.post(`/matches/${id}/performance`, data),
  addPlayerPerformance: (id, data) => api.post(`/matches/${id}/players`, data),
  updatePlayerPerformance: (matchId, playerId, data) => api.put(`/matches/${matchId}/players/${playerId}`, data),
};

// Tactics API
export const tacticsAPI = {
  getAll: () => api.get('/tactics'),
  getById: (id) => api.get(`/tactics/${id}`),
  getByFormation: (formation) => api.get(`/tactics/formation/${formation}`),
  create: (data) => api.post('/tactics', data),
  update: (id, data) => api.put(`/tactics/${id}`, data),
  delete: (id) => api.delete(`/tactics/${id}`),
};

// Opponents API
export const opponentsAPI = {
  getAll: () => api.get('/opponents'),
  getById: (id) => api.get(`/opponents/${id}`),
  getMatches: (id) => api.get(`/opponents/${id}/matches`),
  create: (data) => api.post('/opponents', data),
  update: (id, data) => api.put(`/opponents/${id}`, data),
  delete: (id) => api.delete(`/opponents/${id}`),
};

// Training API
export const trainingAPI = {
  getAllTemplates: () => api.get('/training/templates'),
  getTemplateById: (id) => api.get(`/training/templates/${id}`),
  getTemplatesByCategory: (category) => api.get(`/training/templates/category/${category}`),
  createTemplate: (data) => api.post('/training/templates', data),
  updateTemplate: (id, data) => api.put(`/training/templates/${id}`, data),
  deleteTemplate: (id) => api.delete(`/training/templates/${id}`),
  getAllPlans: () => api.get('/training/plans'),
  getPlanById: (id) => api.get(`/training/plans/${id}`),
  createPlan: (data) => api.post('/training/plans', data),
  updatePlan: (id, data) => api.put(`/training/plans/${id}`, data),
  deletePlan: (id) => api.delete(`/training/plans/${id}`),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentMatches: (limit) => api.get(`/dashboard/recent-matches?limit=${limit || 5}`),
  getUpcomingTraining: (limit) => api.get(`/dashboard/upcoming-training?limit=${limit || 5}`),
  getTopPlayers: (limit) => api.get(`/dashboard/top-players?limit=${limit || 5}`),
  getMatchResults: () => api.get('/dashboard/match-results'),
  getPlayerPositions: () => api.get('/dashboard/player-positions'),
};

// Tactical Analysis API
export const tacticalAnalysisAPI = {
  // Taktik sistemler
  getAllSystems: () => api.get('/tactical-analysis/systems'),
  getSystemById: (id) => api.get(`/tactical-analysis/systems/${id}`),
  getSystemPatterns: (id) => api.get(`/tactical-analysis/systems/${id}/patterns`),
  getSystemRoles: (id) => api.get(`/tactical-analysis/systems/${id}/roles`),
  compareSystems: (id1, id2) => api.get(`/tactical-analysis/systems/compare/${id1}/${id2}`),
  createSystem: (data) => api.post('/tactical-analysis/systems', data),

  // FİLTRELEME - Yeni
  getFormationCategories: () => api.get('/tactical-analysis/formations/categories'),
  getSystemsByFormation: (formation) => api.get(`/tactical-analysis/systems/by-formation/${formation}`),
  getRoleCategories: () => api.get('/tactical-analysis/roles/categories'),
  getRoleTypesByPosition: (position) => api.get(`/tactical-analysis/roles/by-position/${position}`),
  getRolesByFilter: (position, roleType) => api.get(`/tactical-analysis/roles/filter/${position}/${roleType}`),

  // Oyuncu rolleri
  getAllRoles: () => api.get('/tactical-analysis/roles'),
  getRoleById: (id) => api.get(`/tactical-analysis/roles/${id}`),
  getRolesByPosition: (position) => api.get(`/tactical-analysis/roles/position/${position}`),

  // Anti-taktikler
  getCounterTactics: (systemId) => api.get(`/tactical-analysis/counter-tactics/${systemId}`),
  getAllCounterTactics: () => api.get('/tactical-analysis/counter-tactics'),

  // Oyuncu-Rol eşleştirme
  matchPlayerToRole: (playerId, roleId) => api.post('/tactical-analysis/player-role-match', { player_id: playerId, role_id: roleId }),

  // Taktik raporları
  createReport: (data) => api.post('/tactical-analysis/reports', data),
  getMatchReports: (matchId) => api.get(`/tactical-analysis/reports/match/${matchId}`),

  // ==========================================
  // YENİ API FONKSİYONLARI - 9 TABLO
  // ==========================================

  // 1. TACTICAL CONCEPTS (31 entries)
  getConcepts: () => api.get('/tactical-analysis/concepts'),
  getConceptById: (id) => api.get(`/tactical-analysis/concepts/${id}`),
  getConceptsByCategory: (category) => api.get(`/tactical-analysis/concepts/category/${category}`),

  // 2. SYSTEM WEAKNESSES (124 entries)
  getSystemWeaknesses: (systemId) => api.get(`/tactical-analysis/systems/${systemId}/weaknesses`),
  getAllWeaknesses: () => api.get('/tactical-analysis/weaknesses'),
  getWeaknessesByType: (type) => api.get(`/tactical-analysis/weaknesses/type/${type}`),

  // 3. FORMATION TRANSITIONS (20 entries)
  getTransitions: () => api.get('/tactical-analysis/transitions'),
  getTransitionsFrom: (formation) => api.get(`/tactical-analysis/transitions/from/${formation}`),
  getTransition: (fromFormation, toFormation) => api.get(`/tactical-analysis/transitions/${fromFormation}/to/${toFormation}`),

  // 4. ROLE SYNERGIES (29 entries)
  getSynergies: () => api.get('/tactical-analysis/synergies'),
  getRoleSynergies: (roleId) => api.get(`/tactical-analysis/roles/${roleId}/synergies`),
  getSynergyBetweenRoles: (role1, role2) => api.get(`/tactical-analysis/synergies/${role1}/${role2}`),

  // 5. TACTICAL TRENDS (15 entries)
  getTrends: () => api.get('/tactical-analysis/trends'),
  getTrendById: (id) => api.get(`/tactical-analysis/trends/${id}`),
  getTrendsByCategory: (category) => api.get(`/tactical-analysis/trends/category/${category}`),
  getTrendsBySeason: (season) => api.get(`/tactical-analysis/trends/season/${season}`),

  // 6. PRESSING ZONES (30 entries)
  getPressingZones: () => api.get('/tactical-analysis/pressing-zones'),
  getPressingZoneById: (id) => api.get(`/tactical-analysis/pressing-zones/${id}`),
  getSystemPressingZones: (systemId) => api.get(`/tactical-analysis/systems/${systemId}/pressing-zones`),

  // 7. POSSESSION TACTICS (14 entries)
  getAllPossession: () => api.get('/tactical-analysis/possession'),
  getSystemPossession: (systemId) => api.get(`/tactical-analysis/systems/${systemId}/possession`),

  // 8. NON-POSSESSION TACTICS (30 entries)
  getAllNonPossession: () => api.get('/tactical-analysis/non-possession'),
  getSystemNonPossession: (systemId) => api.get(`/tactical-analysis/systems/${systemId}/non-possession`),

  // 9. TACTICAL PARTNERSHIPS (45 entries)
  getPartnerships: () => api.get('/tactical-analysis/partnerships'),
  getPartnershipById: (id) => api.get(`/tactical-analysis/partnerships/${id}`),
  getPartnershipsByType: (type) => api.get(`/tactical-analysis/partnerships/type/${type}`),
  getRolePartnerships: (roleId) => api.get(`/tactical-analysis/roles/${roleId}/partnerships`),
};

export default api;
