import API from '../api.js';
import API_CONFIG from '../config.js';
import Auth from '../auth.js';
import { showToast } from '../utils.js';

class CategoryManager {
    constructor() {
        this.categories = [];
        this.init();
    }

    async init() {
        if (!Auth.isLoggedIn() || !Auth.isAdmin()) {
            window.location.href = '../login.html';
            return;
        }

        this.setupEventListeners();
        await this.loadCategories();
    }

    setupEventListeners() {
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });

        document.getElementById('addCategoryBtn').addEventListener('click', () => {
            this.openModal();
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('categoryForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveCategory();
        });
    }

    async loadCategories() {
        try {
            this.categories = await API.get(API_CONFIG.ENDPOINTS.categories);
            this.render();
            this.updateParentSelect();
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    render() {
        const tbody = document.getElementById('categoryList');
        if (this.categories.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Chưa có danh mục nào</td></tr>';
            return;
        }

        tbody.innerHTML = this.categories.map(cat => {
            const parent = this.categories.find(c => c.id === cat.parent_id);
            return `
                <tr>
                    <td>${cat.id}</td>
                    <td>${cat.name}</td>
                    <td>${parent ? parent.name : '-'}</td>
                    <td class="action-buttons">
                        <button class="btn btn-small edit-btn" data-id="${cat.id}">Sửa</button>
                        <button class="btn btn-small btn-danger delete-btn" data-id="${cat.id}">Xóa</button>
                    </td>
                </tr>
            `;
        }).join('');

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.editCategory(btn.dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteCategory(btn.dataset.id));
        });
    }

    updateParentSelect() {
        const select = document.getElementById('parentCategory');
        select.innerHTML = '<option value="">Không có</option>' +
            this.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    }

    openModal(category = null) {
        const modal = document.getElementById('categoryModal');
        const title = document.getElementById('modalTitle');
        
        if (category) {
            title.textContent = 'Sửa danh mục';
            document.getElementById('categoryId').value = category.id;
            document.getElementById('categoryName').value = category.name;
            document.getElementById('parentCategory').value = category.parent_id || '';
        } else {
            title.textContent = 'Thêm danh mục';
            document.getElementById('categoryForm').reset();
        }

        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('categoryModal').classList.remove('active');
    }

    async saveCategory() {
        const id = document.getElementById('categoryId').value;
        const data = {
            name: document.getElementById('categoryName').value,
            parent_id: document.getElementById('parentCategory').value || null
        };

        try {
            if (id) {
                await API.put(API_CONFIG.ENDPOINTS.categories, id, data);
                showToast('Cập nhật danh mục thành công', 'success');
            } else {
                await API.post(API_CONFIG.ENDPOINTS.categories, data);
                showToast('Thêm danh mục thành công', 'success');
            }
            this.closeModal();
            await this.loadCategories();
        } catch (error) {
            showToast('Có lỗi xảy ra', 'error');
        }
    }

    editCategory(id) {
        const category = this.categories.find(c => c.id === id);
        if (category) {
            this.openModal(category);
        }
    }

    async deleteCategory(id) {
        if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return;

        try {
            await API.delete(API_CONFIG.ENDPOINTS.categories, id);
            showToast('Xóa danh mục thành công', 'success');
            await this.loadCategories();
        } catch (error) {
            showToast('Có lỗi xảy ra', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CategoryManager();
});
