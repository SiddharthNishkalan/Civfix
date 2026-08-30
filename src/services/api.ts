import { Issue, User, RewardItem, IssueStatus, UserRole } from '../types';

const API_BASE_URL = '/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[API] Request to ${endpoint} failed, falling back to local handlers:`, (error as Error).message);
      throw error;
    }
  }

  // --- ISSUES ---
  async getIssues(params?: { status?: string; category?: string; priority?: string; ward?: string; search?: string }): Promise<{ success: boolean; data: Issue[] }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val && val !== 'all') query.append(key, val);
      });
    }
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request<{ success: boolean; data: Issue[] }>(`/issues${queryString}`);
  }

  async getIssueById(id: string): Promise<{ success: boolean; data: Issue }> {
    return this.request<{ success: boolean; data: Issue }>(`/issues/${id}`);
  }

  async createIssue(payload: Partial<Issue>): Promise<{ success: boolean; data: Issue; message: string }> {
    return this.request<{ success: boolean; data: Issue; message: string }>('/issues', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async updateIssueStatus(
    id: string, 
    status: IssueStatus, 
    notes?: string, 
    photoAfterUrl?: string, 
    materialsUsed?: string[]
  ): Promise<{ success: boolean; data: Issue; message: string }> {
    return this.request<{ success: boolean; data: Issue; message: string }>(`/issues/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes, photoAfterUrl, materialsUsed })
    });
  }

  async upvoteIssue(id: string, userId: string = 'USR-7821'): Promise<{ success: boolean; upvoted: boolean; upvotes: number; data: Issue }> {
    return this.request<{ success: boolean; upvoted: boolean; upvotes: number; data: Issue }>(`/issues/${id}/upvote`, {
      method: 'POST',
      body: JSON.stringify({ userId })
    });
  }

  async addComment(id: string, author: string, role: string, text: string): Promise<{ success: boolean; data: Issue }> {
    return this.request<{ success: boolean; data: Issue }>(`/issues/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ author, role, text })
    });
  }

  async escalateIssue(id: string, reason: string, citizenName?: string): Promise<{ success: boolean; data: Issue; message: string }> {
    return this.request<{ success: boolean; data: Issue; message: string }>(`/issues/${id}/escalate`, {
      method: 'POST',
      body: JSON.stringify({ reason, citizenName })
    });
  }

  // --- AUTH & USERS ---
  async login(credentials: { phone?: string; otp?: string; password?: string; role?: UserRole }): Promise<{ success: boolean; user: User; token: string }> {
    return this.request<{ success: boolean; user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData: Partial<User>): Promise<{ success: boolean; user: User; token: string }> {
    return this.request<{ success: boolean; user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getUser(role: string): Promise<{ success: boolean; data: User }> {
    return this.request<{ success: boolean; data: User }>(`/auth/user/${role}`);
  }

  // --- REWARDS ---
  async getRewards(): Promise<{ success: boolean; data: RewardItem[] }> {
    return this.request<{ success: boolean; data: RewardItem[] }>('/rewards');
  }

  async redeemReward(rewardId: string, role: string = 'citizen'): Promise<{ success: boolean; voucherCode: string; reward: RewardItem; updatedPoints: number }> {
    return this.request<{ success: boolean; voucherCode: string; reward: RewardItem; updatedPoints: number }>('/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify({ rewardId, role })
    });
  }

  // --- ANALYTICS ---
  async getAnalytics(): Promise<{ success: boolean; data: any }> {
    return this.request<{ success: boolean; data: any }>('/analytics/overview');
  }

  // --- VOICE AI ---
  async parseVoice(transcript: string): Promise<{ success: boolean; data: { parsed: Partial<Issue> } }> {
    return this.request<{ success: boolean; data: { parsed: Partial<Issue> } }>('/voice/parse', {
      method: 'POST',
      body: JSON.stringify({ transcript })
    });
  }

  // --- HEALTHCHECK ---
  async checkHealth(): Promise<{ status: string; service: string; location: string }> {
    return this.request<{ status: string; service: string; location: string }>('/health');
  }
}

export const api = new ApiService();
