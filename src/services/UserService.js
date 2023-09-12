import axios from 'axios';
import authService from '../services/AuthService';

const baseURL = 'http://localhost:8080/api/v1/users';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: baseURL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const headers = authService.getAuthHeaders(); // Auth headers'ları al
        return { ...config, headers }; // Mevcut config'e headers'ları ekle
      },
      (error) => Promise.reject(error)
    );
  }

  async post(endpoint, data = {}) {
    try {
      const response = await this.api.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async get(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint, data = {}) {
    try {
      const response = await this.api.put(endpoint, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserProfileInfo(userName) {
    const endpoint = `/${userName}`;
    return this.get(endpoint);
  }

  async getUserPosts(userName) {
    const endpoint = `/${userName}/posts`;
    return this.get(endpoint);
  }

  async getUserOwnedSubs(userName) {
    const endpoint = `/${userName}/ownedSubs`;
    return this.get(endpoint);
  }

  async updateUserProfile(userName, userData) {
    const endpoint = `/${userName}`;
    return this.put(endpoint, userData);
  }


}

const userService = new UserService();

export default userService;
