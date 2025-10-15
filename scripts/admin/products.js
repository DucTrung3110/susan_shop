import API from '../api.js';
import API_CONFIG from '../config.js';
import Auth from '../auth.js';
import { showToast } from '../utils.js';

class ProductManager {
    constructor() {
        this.products = [];
        this.categories = [];
        this.variants = [];
        this.init();
    }

    async init() {
        if (!Auth.isLoggedIn() || !Auth.isAdmin()) {
            window.location.href = '../login.html';
            return;
        }

        this.setupEventListeners();
        await this.loadData();
    }

    setupEventListeners() {
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });

        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.openModal();
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('productForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveProduct();
        });

        // Xử lý upload ảnh
        document.getElementById('productImageFile').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Kiểm tra loại file
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showToast('Vui lòng chọn file ảnh hợp lệ (JPG, PNG, WEBP)', 'error');
            event.target.value = '';
            return;
        }

        // Kiểm tra kích thước file (2MB = 2 * 1024 * 1024 bytes)
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            showToast('Kích thước ảnh không được vượt quá 2MB', 'error');
            event.target.value = '';
            return;
        }

        // Đọc file và chuyển thành base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            document.getElementById('productImage').value = base64Image;
            
            // Hiển thị preview
            const preview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            previewImg.src = base64Image;
            preview.style.display = 'block';
            
            showToast('Ảnh đã được tải lên', 'success');
        };
        reader.onerror = () => {
            showToast('Lỗi khi đọc file ảnh', 'error');
        };
        reader.readAsDataURL(file);
    }

    async loadData() {
        try {
            [this.products, this.categories, this.variants] = await Promise.all([
                API.get(API_CONFIG.ENDPOINTS.products),
                API.get(API_CONFIG.ENDPOINTS.categories),
                API.get(API_CONFIG.ENDPOINTS.productVariants)
            ]);
            this.render();
            this.updateCategorySelect();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    render() {
        const tbody = document.getElementById('productList');
        if (this.products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Chưa có sản phẩm nào</td></tr>';
            return;
        }

        tbody.innerHTML = this.products.map(product => {
            const category = this.categories.find(c => c.id === product.cate_id);
            const variantCount = this.variants.filter(v => v.product_id === product.id).length;
            
            return `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${category ? category.name : '-'}</td>
                    <td>${variantCount}</td>
                    <td class="action-buttons">
                        <button class="btn btn-small edit-btn" data-id="${product.id}">Sửa</button>
                        <button class="btn btn-small btn-danger delete-btn" data-id="${product.id}">Xóa</button>
                    </td>
                </tr>
            `;
        }).join('');

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.editProduct(btn.dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteProduct(btn.dataset.id));
        });
    }

    updateCategorySelect() {
        const select = document.getElementById('productCategory');
        select.innerHTML = this.categories.map(cat => 
            `<option value="${cat.id}">${cat.name}</option>`
        ).join('');
    }

    openModal(product = null) {
        const modal = document.getElementById('productModal');
        const title = document.getElementById('modalTitle');
        const preview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        
        if (product) {
            title.textContent = 'Sửa sản phẩm';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.cate_id;
            document.getElementById('productDetail').value = product.detail || '';
            document.getElementById('productImage').value = product.image || '';
            
            // Hiển thị preview nếu có ảnh
            if (product.image) {
                previewImg.src = product.image;
                preview.style.display = 'block';
            } else {
                preview.style.display = 'none';
            }
        } else {
            title.textContent = 'Thêm sản phẩm';
            document.getElementById('productForm').reset();
            preview.style.display = 'none';
        }

        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('productModal').classList.remove('active');
    }

    async saveProduct() {
        const id = document.getElementById('productId').value;
        const data = {
            name: document.getElementById('productName').value,
            cate_id: document.getElementById('productCategory').value,
            detail: document.getElementById('productDetail').value,
            image: document.getElementById('productImage').value
        };

        try {
            if (id) {
                await API.put(API_CONFIG.ENDPOINTS.products, id, data);
                showToast('Cập nhật sản phẩm thành công', 'success');
            } else {
                await API.post(API_CONFIG.ENDPOINTS.products, data);
                showToast('Thêm sản phẩm thành công', 'success');
            }
            this.closeModal();
            await this.loadData();
        } catch (error) {
            showToast('Có lỗi xảy ra', 'error');
        }
    }

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            this.openModal(product);
        }
    }

    async deleteProduct(id) {
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

        try {
            await API.delete(API_CONFIG.ENDPOINTS.products, id);
            showToast('Xóa sản phẩm thành công', 'success');
            await this.loadData();
        } catch (error) {
            showToast('Có lỗi xảy ra', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductManager();
});
