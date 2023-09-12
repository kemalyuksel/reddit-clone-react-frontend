import axios from 'axios';
import authService from '../services/AuthService';

const baseURL = 'http://localhost:8080/api/v1/subreddits';

class SubredditService {
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

  async get(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }



  async getAllPostbySubredditName(subredditName) {
    const endpoint = `/r/${subredditName}/posts`;
    return this.get(endpoint);
  }

  async subscribeToSubreddit(subredditName) {
    const endpoint = `/${subredditName}/subscribe`;
    return this.post(endpoint);
  }

  async unsubscribeToSubreddit(subredditName) {
    const endpoint = `/${subredditName}/unsubscribe`;
    return this.post(endpoint);
  }

  async getAllSubreddits() {
    const endpoint = `/getNames`;
    return this.get(endpoint);
  }

  async isUserSubscribed(subredditName) {
    const endpoint = `/${subredditName}/isUserSubscribe`;
    return this.get(endpoint);
  }

  async createSubreddit(subredditData) {
    return this.post('/create', subredditData);
  }

  async getByName(subredditName){
    const endpoint = `/r/${subredditName}`;
    return this.get(endpoint);
  }

  async updateSubreddit(id, subredditData) {
    const endpoint = `/update/${id}`;
    return this.put(endpoint, subredditData);
  }


}

const subredditService = new SubredditService();

export default subredditService;
