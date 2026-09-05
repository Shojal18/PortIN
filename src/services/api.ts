import {
  ForecastRequestInput,
  ForecastResultData,
  PortSpecification,
  VesselClassSpecification,
  RiskAlert,
  UserProfile,
  ComparisonScenario
} from '../types';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('freightiq_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Authentication
  async login(email: string, password: string): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    return res.json();
  },

  async getCurrentUser(): Promise<{ user: UserProfile }> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  // Ports & Vessels
  async getPorts(type?: 'origin' | 'destination'): Promise<PortSpecification[]> {
    const query = type ? `?type=${type}` : '';
    const res = await fetch(`${API_BASE}/ports${query}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch ports');
    return res.json();
  },

  async getVessels(): Promise<VesselClassSpecification[]> {
    const res = await fetch(`${API_BASE}/vessels`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch vessels');
    return res.json();
  },

  // Forecast Orchestration
  async requestForecast(input: ForecastRequestInput): Promise<ForecastResultData> {
    const res = await fetch(`${API_BASE}/forecast-request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(input)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to generate forecast');
    }
    return res.json();
  },

  async getForecastById(id: string): Promise<ForecastResultData> {
    const res = await fetch(`${API_BASE}/forecast/${id}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Forecast not found');
    return res.json();
  },

  async getHistory(): Promise<ForecastResultData[]> {
    const res = await fetch(`${API_BASE}/history`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  },

  async getForecastHistory(): Promise<ForecastResultData[]> {
    return this.getHistory();
  },

  // Alerts
  async getAlerts(severity?: string): Promise<RiskAlert[]> {
    const query = severity ? `?severity=${severity}` : '';
    const res = await fetch(`${API_BASE}/alerts${query}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  },

  async getRiskAlerts(severity?: string): Promise<RiskAlert[]> {
    return this.getAlerts(severity);
  },

  async reviewAlert(id: string): Promise<{ success: boolean; alert: RiskAlert }> {
    const res = await fetch(`${API_BASE}/alerts/${id}/review`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to review alert');
    return res.json();
  },

  // Comparisons
  async getComparisons(): Promise<ComparisonScenario[]> {
    const res = await fetch(`${API_BASE}/comparisons`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch comparisons');
    return res.json();
  },

  async createComparison(data: Partial<ComparisonScenario>): Promise<ComparisonScenario> {
    const res = await fetch(`${API_BASE}/comparisons`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create comparison');
    return res.json();
  },

  // Model Status
  async getModelStatus(): Promise<{
    status: string;
    models_ready: number;
    models_total: number;
    model_architecture: string;
    active_corridors: number;
    synthetic_disclosure: string;
  }> {
    const res = await fetch(`${API_BASE}/models/status`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch model status');
    return res.json();
  }
};
