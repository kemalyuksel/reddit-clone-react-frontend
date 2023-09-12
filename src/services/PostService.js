import axios from 'axios';
import authService from '../services/AuthService';

const baseURL = 'http://localhost:8080/api/v1/posts';

class PostService {
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

  async get(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params }, {});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint, data = {}) {
    try {
      console.log(data);
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



  async delete(endpoint, params = {}) {
    try {
      const response = await this.api.delete(endpoint, { params }, {});
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  async getAllPostbySubredditName(endpoint, params = {}) {
    const response = await this.api.get(endpoint, { params });
    return response.data;
  }


  async fetchRoot() {
    return this.get('/');
  }

  async createPost(postData) {
    return this.post('', postData);
  }

  async deletePost(endpoint,postId) {
    return this.delete(endpoint,postId);
  }
}

const postService = new PostService(); // Instance'ı bir değişkene atayalım

export default postService;
