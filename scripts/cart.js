class Cart {
    constructor() {
        this.items = this.getCartItems();
    }

    getCartItems() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartBadge();
    }

    addItem(product, variant, quantity = 1) {
        const existingItem = this.items.find(
            item => item.product.id === product.id && item.variant.id === variant.id
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, variant, quantity });
        }

        this.saveCart();
        return { success: true, message: 'Đã thêm vào giỏ hàng' };
    }

    updateQuantity(productId, variantId, quantity) {
        const item = this.items.find(
            item => item.product.id === productId && item.variant.id === variantId
        );

        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId, variantId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    removeItem(productId, variantId) {
        this.items = this.items.filter(
            item => !(item.product.id === productId && item.variant.id === variantId)
        );
        this.saveCart();
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.variant.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }
}

export default new Cart();
