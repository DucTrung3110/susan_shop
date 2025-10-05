import API from './api.js';
import API_CONFIG from './config.js';
import Auth from './auth.js';
import Cart from './cart.js';
import { formatCurrency, showToast } from './utils.js';

class ProductDetailPage {
    constructor() {
        this.product = null;
        this.variants = [];
        this.selectedVariant = null;
        this.init();
    }

    async init() {
        this.updateAuthUI();
        Cart.updateCartBadge();
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            await this.loadProduct(productId);
        } else {
            window.location.href = 'index.html';
        }
    }

    updateAuthUI() {
        const authLink = document.querySelector('.auth-link');
        const userMenu = document.querySelector('.user-menu');

        if (Auth.isLoggedIn()) {
            userMenu.innerHTML = `
                <a href="#">${Auth.currentUser.name}</a>
                ${Auth.isAdmin() ? '<a href="admin/index.html">Quản trị</a>' : ''}
                <a href="#" class="logout-btn">Đăng xuất</a>
            `;
            document.querySelector('.logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                Auth.logout();
            });
        }
    }

    async loadProduct(id) {
        try {
            this.product = await API.get(API_CONFIG.ENDPOINTS.products, id);
            const allVariants = await API.get(API_CONFIG.ENDPOINTS.productVariants);
            this.variants = allVariants.filter(v => v.product_id === id);
            this.selectedVariant = this.variants[0];
            this.render();
        } catch (error) {
            console.error('Error loading product:', error);
            document.getElementById('productDetail').innerHTML = 
                '<p style="color: red;">Không thể tải sản phẩm</p>';
        }
    }

    render() {
        const container = document.getElementById('productDetail');
        container.innerHTML = `
            <div style="flex: 1; min-width: 300px;">
                <img src="${this.product.image || 'images/placeholder.svg'}" 
                     alt="${this.product.name}" 
                     style="width: 100%; border-radius: 8px;"
                     onerror="this.src='images/placeholder.svg'">
            </div>
            <div style="flex: 1; min-width: 300px;">
                <h1>${this.product.name}</h1>
                <p style="color: #666; margin: 20px 0;">${this.product.detail || 'Không có mô tả'}</p>
                
                <div style="margin: 30px 0;">
                    <h3>Chọn phiên bản:</h3>
                    <div id="variantList" style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                        ${this.variants.map(v => `
                            <button class="variant-btn ${v.id === this.selectedVariant.id ? 'active' : ''}" 
                                    data-id="${v.id}"
                                    style="padding: 10px 20px; border: 2px solid ${v.id === this.selectedVariant.id ? 'var(--primary-color)' : '#ddd'}; 
                                           border-radius: 8px; background: ${v.id === this.selectedVariant.id ? 'var(--primary-color)' : '#fff'};
                                           color: ${v.id === this.selectedVariant.id ? '#fff' : '#333'}; cursor: pointer;">
                                ${v.variant_name}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div style="margin: 30px 0;">
                    <p style="font-size: 32px; color: var(--primary-color); font-weight: bold;">
                        ${formatCurrency(this.selectedVariant.price)}
                    </p>
                    <p style="color: ${this.selectedVariant.quantity > 0 ? 'var(--success-color)' : 'var(--danger-color)'};">
                        ${this.selectedVariant.quantity > 0 ? `Còn ${this.selectedVariant.quantity} sản phẩm` : 'Hết hàng'}
                    </p>
                </div>

                <div style="display: flex; gap: 10px; align-items: center;">
                    <input type="number" id="quantity" value="1" min="1" max="${this.selectedVariant.quantity}" 
                           style="width: 80px; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"
                           ${this.selectedVariant.quantity === 0 ? 'disabled' : ''}>
                    <button id="addToCart" class="btn" 
                            ${this.selectedVariant.quantity === 0 ? 'disabled' : ''}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;

        document.querySelectorAll('.variant-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const variantId = e.target.dataset.id;
                this.selectedVariant = this.variants.find(v => v.id === variantId);
                this.render();
            });
        });

        const addToCartBtn = document.getElementById('addToCart');
        if (addToCartBtn && this.selectedVariant.quantity > 0) {
            addToCartBtn.addEventListener('click', () => {
                const quantity = parseInt(document.getElementById('quantity').value);
                const result = Cart.addItem(this.product, this.selectedVariant, quantity);
                showToast(result.message, result.success ? 'success' : 'error');
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductDetailPage();
});
