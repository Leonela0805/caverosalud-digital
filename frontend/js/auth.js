// Módulo de autenticación
class AuthManager {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('caverosalud_currentUser')) || null;
        this.token = localStorage.getItem('caverosalud_token') || null;
    }

    async login(email, password) {
        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.currentUser = data.user;
                this.token = data.token;
                localStorage.setItem('caverosalud_currentUser', JSON.stringify(data.user));
                localStorage.setItem('caverosalud_token', data.token);
                return { success: true, user: data.user };
            } else {
                return { success: false, error: data.message };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, error: 'Error de conexión' };
        }
    }

    async register(userData) {
        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, error: 'Error de conexión' };
        }
    }

    logout() {
        this.currentUser = null;
        this.token = null;
        localStorage.removeItem('caverosalud_currentUser');
        localStorage.removeItem('caverosalud_token');
    }

    isAuthenticated() {
        return this.currentUser !== null && this.token !== null;
    }

    getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
    }
}

const authManager = new AuthManager();