import axios from 'axios';
import authManager from '../store/AuthManager';

const baseURL = 'http://localhost:8080/api/v1';

class AuthService {

  constructor() {
    this.api = axios.create({
      baseURL: baseURL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const headers = this.getAuthHeaders(); // Auth headers'ları al
        return { ...config, headers }; // Mevcut config'e headers'ları ekle
      },
      (error) => Promise.reject(error)
    );
  }

  getAuthHeaders() {

    const token = localStorage.getItem('token');
  
    return token ? { Authorization: "Bearer " + token } : {};
  }


  login(userData) {
    return this.api.post('/auth/authenticate', userData).then(
      response => {
        const token = response.data.token;

        authManager.setToken(token);
        return response;
      }
    );
  }

  register(userData) {
    return this.api.post('/auth/register', userData);
  }

  logout() {
    authManager.removeToken();
    return this.api.post('/auth/logout');
  }

  search(query) {
  return this.api.get(`/search?query=${query}`);
}

}

const authService = new AuthService(); // Assign instance to a variable

export default authService;


