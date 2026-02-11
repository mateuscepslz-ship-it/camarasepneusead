const SESSION_KEY = 'cp_ead_session';

const auth = {
  login(email, password, remember) {
    const user = api.login(email, password);
    const expiration = this.calculateExpiration(remember);
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      userId: user.id,
      expiration
    }));
    return user;
  },

  register(payload) {
    return api.createUser(payload);
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  },

  calculateExpiration(remember) {
    const now = Date.now();
    return remember ? now + 1000 * 60 * 60 * 24 * 30 : now + 1000 * 60 * 60 * 8;
  },

  getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() > data.expiration) {
      this.logout();
      return null;
    }
    const user = api.getUsers().find(u => u.id === data.userId);
    return user || null;
  },

  requireAuth(role) {
    const user = this.getSession();
    if (!user) {
      window.location.href = 'index.html';
      return null;
    }
    if (role && user.role !== role) {
      window.location.href = user.role === 'supervisor' ? 'supervisor-dashboard.html' : 'student-dashboard.html';
      return null;
    }
    return user;
  }
};

function showMessage(el, text, isError = false) {
  el.textContent = text;
  el.className = `message ${isError ? 'error' : 'success'}`;
}

window.auth = auth;
window.showMessage = showMessage;
