

class AuthManager {

  


  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }


}

const authManager = new AuthManager();

export default authManager;
