import API from './api.js';
import API_CONFIG from './config.js';

class Auth {
    constructor() {
        this.currentUser = this.getCurrentUser();
    }

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    async login(email, password) {
        try {
            const users = await API.get(API_CONFIG.ENDPOINTS.users);
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                delete user.password;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUser = user;
                return { success: true, user };
            }
            return { success: false, message: 'Email hoặc mật khẩu không đúng' };
        } catch (error) {
            return { success: false, message: 'Lỗi đăng nhập' };
        }
    }

    async register(userData) {
        try {
            const users = await API.get(API_CONFIG.ENDPOINTS.users);
            const existingUser = users.find(u => u.email === userData.email);
            
            if (existingUser) {
                return { success: false, message: 'Email đã được sử dụng' };
            }

            const newUser = await API.post(API_CONFIG.ENDPOINTS.users, userData);
            delete newUser.password;
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            this.currentUser = newUser;
            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, message: 'Lỗi đăng ký' };
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = '/index.html';
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }
}

export default new Auth();
