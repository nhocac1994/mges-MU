/**
 * API Client để kết nối với Backend C#
 * Backend chạy trên VPS với port 55777
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface Account {
  username: string;
  characterName: string;
  email: string;
  createdDate?: string;
  blockStatus: number;
  accountLevel: number;
  accountExpireDate?: string;
}

export interface Character {
  name: string;
  level: number;
  class: number;
  resetCount: number;
  masterResetCount: number;
  money: number;
  mapNumber: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UpdatePasswordRequest {
  accountId: string;
  newPassword: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ 
          message: `HTTP error! status: ${response.status}` 
        }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  /**
   * Đăng nhập
   */
  async login(username: string, password: string): Promise<ApiResponse<Account>> {
    return this.request<Account>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  /**
   * Lấy thông tin account
   */
  async getAccount(accountId: string): Promise<ApiResponse<Account>> {
    return this.request<Account>(`/api/account/${accountId}`);
  }

  /**
   * Cập nhật mật khẩu
   */
  async updatePassword(accountId: string, currentPassword: string | null, newPassword: string): Promise<ApiResponse<boolean>> {
    return this.request<boolean>('/api/account/password', {
      method: 'PUT',
      body: JSON.stringify({ accountId, currentPassword, newPassword }),
    });
  }

  /**
   * Đăng ký tài khoản
   */
  async register(data: {
    username: string;
    password: string;
    characterName: string;
    email: string;
    phone: string;
    securityQuestion: string;
    securityAnswer: string;
  }): Promise<ApiResponse<any>> {
    return this.request<any>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Cập nhật thông tin tài khoản
   */
  async updateAccount(accountId: string, updateData: any): Promise<ApiResponse<any>> {
    return this.request<any>('/api/account/update', {
      method: 'PUT',
      body: JSON.stringify({ accountId, updateData }),
    });
  }

  /**
   * Lấy danh sách characters
   */
  async getCharacters(accountId: string): Promise<ApiResponse<{ characters: Character[]; totalCharacters: number }>> {
    return this.request<{ characters: Character[]; totalCharacters: number }>(`/api/character?accountId=${accountId}`);
  }

  /**
   * Lấy dashboard data
   */
  async getDashboard(accountId: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/api/dashboard?accountId=${accountId}`);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

