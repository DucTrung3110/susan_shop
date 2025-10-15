
import API from './api.js';
import API_CONFIG from './config.js';
import Auth from './auth.js';
import Cart from './cart.js';
import { formatCurrency, showToast } from './utils.js';

class CheckoutPage {
    constructor() {
        this.init();
    }

    init() {
        if (!Auth.isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }

        if (Cart.items.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        this.prefillForm();
        this.renderOrderSummary();
        this.setupEventListeners();
    }

    prefillForm() {
        document.getElementById('name').value = Auth.currentUser.name || '';
        document.getElementById('email').value = Auth.currentUser.email || '';
        document.getElementById('phone').value = Auth.currentUser.phone || '';
        document.getElementById('address').value = Auth.currentUser.address || '';
    }

    renderOrderSummary() {
        const summary = document.getElementById('orderSummary');
        summary.innerHTML = `
            ${Cart.items.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <div>
                        <p><strong>${item.product.name}</strong></p>
                        <p style="font-size: 14px; color: #666;">${item.variant.variant_name} x ${item.quantity}</p>
                    </div>
                    <p>${formatCurrency(item.variant.price * item.quantity)}</p>
                </div>
            `).join('')}
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd;">
                <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold;">
                    <span>Tổng cộng:</span>
                    <span style="color: var(--primary-color);">${formatCurrency(Cart.getTotal())}</span>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.placeOrder();
        });
    }

    async placeOrder() {
        try {
            const orderData = {
                customer_id: Auth.currentUser.id,
                customer_name: document.getElementById('name').value,
                customer_email: document.getElementById('email').value,
                customer_phone: document.getElementById('phone').value,
                customer_address: document.getElementById('address').value,
                total: Cart.getTotal(),
                status: 'pending',
                created_date: new Date().toISOString()
            };

            const order = await API.post(API_CONFIG.ENDPOINTS.orders, orderData);

            for (const item of Cart.items) {
                await API.post(API_CONFIG.ENDPOINTS.orderDetails, {
                    order_id: order.id,
                    product_variant_id: item.variant.id,
                    product_name: item.product.name,
                    variant_name: item.variant.variant_name,
                    price: item.variant.price,
                    quantity: item.quantity
                });

                // Cập nhật tồn kho
                const newQuantity = item.variant.quantity - item.quantity;
                await API.put(API_CONFIG.ENDPOINTS.productVariants, item.variant.id, {
                    ...item.variant,
                    quantity: newQuantity
                });
            }

            Cart.clear();
            showToast('Đặt hàng thành công!', 'success');
            setTimeout(() => {
                window.location.href = `thank-you.html?orderId=${order.id}`;
            }, 1000);
        } catch (error) {
            console.error('Error placing order:', error);
            showToast('Đặt hàng thất bại. Vui lòng thử lại.', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CheckoutPage();
});
