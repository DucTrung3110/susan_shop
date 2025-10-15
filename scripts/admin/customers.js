import API from '../api.js';
import API_CONFIG from '../config.js';
import Auth from '../auth.js';

class CustomerManager {
    constructor() {
        this.customers = [];
        this.init();
    }

    async init() {
        if (!Auth.isLoggedIn() || !Auth.isAdmin()) {
            window.location.href = '../login.html';
            return;
        }

        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });

        await this.loadCustomers();
    }

    async loadCustomers() {
        try {
            const users = await API.get(API_CONFIG.ENDPOINTS.users);
            this.customers = users.filter(u => u.role !== 'admin');
            this.render();
        } catch (error) {
            console.error('Error loading customers:', error);
        }
    }

    render() {
        const tbody = document.getElementById('customerList');
        if (this.customers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Chưa có khách hàng nào</td></tr>';
            return;
        }

        tbody.innerHTML = this.customers.map(customer => `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone || '-'}</td>
                <td>${customer.address || '-'}</td>
            </tr>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CustomerManager();
});
