const API_CONFIG = {
    USE_MOCK_API: true, // ⚠️ Đổi thành false để dùng MockAPI thật
    BASE_URL: 'https://68e1f02e8943bf6bb3c539ba.mockapi.io/api', // ⚠️ THAY URL CỦA BẠN VÀO ĐÂY
    ENDPOINTS: {
        categories: '/categories',
        products: '/products',
        productVariants: '/product-variants',
        orders: '/orders',
        orderDetails: '/order-details',
        users: '/users'
    }
};

export default API_CONFIG;
