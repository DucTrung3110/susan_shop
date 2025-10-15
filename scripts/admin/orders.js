import API from '../api.js';
import API_CONFIG from '../config.js';
import Auth from '../auth.js';
import { formatCurrency, formatDate, showToast } from '../utils.js';

class OrderManager {
    constructor() {
        this.orders = [];
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

        await this.loadOrders();
    }

    async loadOrders() {
        try {
            this.orders = await API.get(API_CONFIG.ENDPOINTS.orders);
            this.render();
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }

    render() {
        const tbody = document.getElementById('orderList');
        if (this.orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Chưa có đơn hàng nào</td></tr>';
            return;
        }

        tbody.innerHTML = this.orders.map(order => `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customer_name || 'N/A'}</td>
                <td>${formatDate(order.created_date)}</td>
                <td>${formatCurrency(order.total || 0)}</td>
                <td>
                    <select class="status-select" data-id="${order.id}" style="padding: 5px; border-radius: 5px;">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Chờ xử lý</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Hoàn thành</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                    </select>
                </td>
                <td class="action-buttons">
                    <button class="btn btn-small btn-danger delete-btn" data-id="${order.id}">Xóa</button>
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', async (e) => {
                await this.updateOrderStatus(e.target.dataset.id, e.target.value);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteOrder(btn.dataset.id));
        });
    }

    async updateOrderStatus(id, status) {
        try {
            const order = this.orders.find(o => o.id === id);
            await API.put(API_CONFIG.ENDPOINTS.orders, id, { ...order, status });
            showToast('Cập nhật trạng thái thành công', 'success');
            await this.loadOrders();
        } catch (error) {
            showToast('Có lỗi xảy ra', 'error');
        }
    }

    async deleteOrder(id) {
        if (!confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;

        try {
            await API.delete(API_CONFIG.ENDPOINTS.orders, id);
            showToast('Xóa đơn hàng thành công', 'success');
            await this.loadOrders();
        } catch (error) {
            showToast('Có lỗi xảy ra', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new OrderManager();
});
