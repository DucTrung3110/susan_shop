import API from './api.js';
import API_CONFIG from './config.js';
import Auth from './auth.js';
import Cart from './cart.js';
import { formatCurrency, showToast } from './utils.js';

class HomePage {
    constructor() {
        this.products = [];
        this.categories = [];
        this.filteredProducts = [];
        this.init();
    }

    async init() {
        this.updateAuthUI();
        Cart.updateCartBadge();
        await this.loadCategories();
        await this.loadProducts();
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

    async loadCategories() {
        try {
            this.categories = await API.get(API_CONFIG.ENDPOINTS.categories);
            this.renderCategoryFilter();
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    renderCategoryFilter() {
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.innerHTML = '<option value="">Tất cả danh mục</option>';
        this.categories.forEach(category => {
            categoryFilter.innerHTML += `<option value="${category.id}">${category.name}</option>`;
        });
    }

    async loadProducts() {
        try {
            this.products = await API.get(API_CONFIG.ENDPOINTS.products);
            await this.loadProductVariants();
            this.filteredProducts = [...this.products];
            this.renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
            document.getElementById('productGrid').innerHTML = 
                '<p style="text-align: center; color: red;">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>';
        }
    }

    async loadProductVariants() {
        try {
            const variants = await API.get(API_CONFIG.ENDPOINTS.productVariants);
            this.products = this.products.map(product => ({
                ...product,
                variants: variants.filter(v => v.product_id === product.id) || []
            }));
        } catch (error) {
            console.error('Error loading variants:', error);
            this.products = this.products.map(product => ({
                ...product,
                variants: []
            }));
        }
    }

    renderProducts() {
        const grid = document.getElementById('productGrid');
        
        if (this.filteredProducts.length === 0) {
            grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Không tìm thấy sản phẩm nào</p>';
            return;
        }

        grid.innerHTML = this.filteredProducts.map(product => {
            const minPrice = product.variants.length > 0 
                ? Math.min(...product.variants.map(v => v.price))
                : 0;
            const hasStock = product.variants.some(v => v.quantity > 0);
            const defaultVariant = product.variants.find(v => v.quantity > 0) || product.variants[0];
            
            return `
                <div class="product-card" data-id="${product.id}">
                    <img src="${product.image || 'images/placeholder.svg'}" 
                         alt="${product.name}" 
                         class="product-image"
                         onerror="this.src='images/placeholder.svg'">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">Từ ${formatCurrency(minPrice)}</p>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn view-product-btn" data-id="${product.id}" style="flex: 1;">
                                Xem chi tiết
                            </button>
                            <button class="btn ${!hasStock ? 'btn-disabled' : ''}" 
                                    data-id="${product.id}" 
                                    data-variant-id="${defaultVariant?.id || ''}"
                                    ${!hasStock ? 'disabled' : ''}
                                    style="flex: 1;"
                                    onclick="window.addToCartFromHome('${product.id}', '${defaultVariant?.id || ''}')">
                                ${hasStock ? '🛒 Thêm' : 'Hết hàng'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.view-product-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    }

    setupEventListeners() {
        const minSlider = document.getElementById('minPriceSlider');
        const maxSlider = document.getElementById('maxPriceSlider');
        const priceDisplay = document.getElementById('priceRangeDisplay');

        const updatePriceDisplay = () => {
            const min = parseInt(minSlider.value);
            const max = parseInt(maxSlider.value);
            
            if (min > max) {
                minSlider.value = max;
            }
            
            priceDisplay.textContent = `${formatCurrency(parseInt(minSlider.value))} - ${formatCurrency(parseInt(maxSlider.value))}`;
        };

        minSlider.addEventListener('input', updatePriceDisplay);
        maxSlider.addEventListener('input', updatePriceDisplay);
        
        document.getElementById('applyFilter').addEventListener('click', () => this.applyFilters());
        document.getElementById('resetFilter').addEventListener('click', () => this.resetFilters());
    }

    applyFilters() {
        const categoryId = document.getElementById('categoryFilter').value;
        const minPrice = parseInt(document.getElementById('minPriceSlider').value);
        const maxPrice = parseInt(document.getElementById('maxPriceSlider').value);

        this.filteredProducts = this.products.filter(product => {
            const matchCategory = !categoryId || product.cate_id === categoryId;
            const productMinPrice = product.variants.length > 0 
                ? Math.min(...product.variants.map(v => v.price))
                : 0;
            const matchPrice = productMinPrice >= minPrice && productMinPrice <= maxPrice;
            
            return matchCategory && matchPrice;
        });

        this.renderProducts();
    }

    resetFilters() {
        document.getElementById('categoryFilter').value = '';
        document.getElementById('minPriceSlider').value = '0';
        document.getElementById('maxPriceSlider').value = '10000000';
        document.getElementById('priceRangeDisplay').textContent = '0đ - 10,000,000đ';
        this.filteredProducts = [...this.products];
        this.renderProducts();
    }
}

// Hàm global để thêm vào giỏ hàng từ trang chủ
window.addToCartFromHome = (productId, variantId) => {
    const homePage = window.homePageInstance;
    if (!homePage) return;
    
    const product = homePage.products.find(p => p.id === productId);
    const variant = product?.variants.find(v => v.id === variantId);
    
    if (product && variant && variant.quantity > 0) {
        const result = Cart.addItem(product, variant, 1);
        showToast(result.message, result.success ? 'success' : 'error');
    } else {
        showToast('Sản phẩm đã hết hàng', 'error');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.homePageInstance = new HomePage();
});
