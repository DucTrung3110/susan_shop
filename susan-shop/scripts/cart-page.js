import Auth from './auth.js';
import Cart from './cart.js';
import { formatCurrency, showToast } from './utils.js';

class CartPage {
    constructor() {
        this.init();
    }

    init() {
        this.updateAuthUI();
        this.render();
        this.setupEventListeners();
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

    render() {
        const cartItems = document.getElementById('cartItems');
        const cartSummary = document.getElementById('cartSummary');

        if (Cart.items.length === 0) {
            cartItems.innerHTML = `
                <div style="text-align: center; padding: 60px 0;">
                    <p style="font-size: 20px; color: #666;">Giỏ hàng trống</p>
                    <a href="index.html" class="btn" style="margin-top: 20px;">Tiếp tục mua sắm</a>
                </div>
            `;
            cartSummary.style.display = 'none';
            return;
        }

        cartItems.innerHTML = Cart.items.map(item => `
            <div class="cart-item" data-product-id="${item.product.id}" data-variant-id="${item.variant.id}">
                <img src="${item.variant.image || item.product.image || 'images/placeholder.svg'}" 
                     alt="${item.product.name}" 
                     class="cart-item-image"
                     onerror="this.src='images/placeholder.svg'">
                <div class="cart-item-info">
                    <h3>${item.product.name}</h3>
                    <p>${item.variant.variant_name}</p>
                    <p style="color: var(--primary-color); font-weight: bold;">${formatCurrency(item.variant.price)}</p>
                </div>
                <div class="cart-item-actions">
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           min="1" max="${item.variant.quantity}" 
                           data-product-id="${item.product.id}" 
                           data-variant-id="${item.variant.id}">
                    <button class="btn btn-danger remove-btn" 
                            data-product-id="${item.product.id}" 
                            data-variant-id="${item.variant.id}">
                        Xóa
                    </button>
                </div>
            </div>
        `).join('');

        cartSummary.style.display = 'block';
        document.getElementById('totalPrice').textContent = formatCurrency(Cart.getTotal());
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const { productId, variantId } = e.target.dataset;
                Cart.removeItem(productId, variantId);
                this.render();
                showToast('Đã xóa sản phẩm', 'success');
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const { productId, variantId } = e.target.dataset;
                const quantity = parseInt(e.target.value);
                Cart.updateQuantity(productId, variantId, quantity);
                this.render();
            }
        });

        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (!Auth.isLoggedIn()) {
                    showToast('Vui lòng đăng nhập để thanh toán', 'warning');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1000);
                } else {
                    window.location.href = 'checkout.html';
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CartPage();
});
