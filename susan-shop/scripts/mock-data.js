
// Initialize data from localStorage or use defaults
const initializeData = () => {
    const savedUsers = localStorage.getItem('mockUsers');
    const savedOrders = localStorage.getItem('mockOrders');
    const savedOrderDetails = localStorage.getItem('mockOrderDetails');
    const savedProducts = localStorage.getItem('mockProducts');
    const savedProductVariants = localStorage.getItem('mockProductVariants');
    
    return {
        categories: [
            { id: '1', name: 'Áo thun', parent_id: null },
            { id: '2', name: 'Áo sơ mi', parent_id: null },
            { id: '3', name: 'Quần jeans', parent_id: null },
            { id: '4', name: 'Váy', parent_id: null }
        ],
        
        products: savedProducts ? JSON.parse(savedProducts) : [
            { id: '1', name: 'Áo thun Basic', cate_id: '1', detail: 'Áo thun cotton 100% thoáng mát', image: 'https://via.placeholder.com/300/e91e63/ffffff?text=Ao+Thun+Basic' },
            { id: '2', name: 'Áo sơ mi trắng', cate_id: '2', detail: 'Áo sơ mi công sở', image: 'https://via.placeholder.com/300/2196f3/ffffff?text=Ao+So+Mi' },
            { id: '3', name: 'Quần jeans slim fit', cate_id: '3', detail: 'Quần jeans co giãn tốt', image: 'https://via.placeholder.com/300/4caf50/ffffff?text=Quan+Jeans' },
            { id: '4', name: 'Váy maxi hoa', cate_id: '4', detail: 'Váy maxi họa tiết hoa nhẹ nhàng', image: 'https://via.placeholder.com/300/ff9800/ffffff?text=Vay+Maxi' },
            { id: '5', name: 'Áo thun Polo', cate_id: '1', detail: 'Áo thun có cổ phong cách lịch sự', image: 'https://via.placeholder.com/300/3f51b5/ffffff?text=Ao+Polo' },
            { id: '6', name: 'Áo thun Oversize', cate_id: '1', detail: 'Áo thun form rộng phong cách streetwear', image: 'https://via.placeholder.com/300/9c27b0/ffffff?text=Oversize' },
            { id: '7', name: 'Áo sơ mi kẻ', cate_id: '2', detail: 'Áo sơ mi kẻ sọc năng động', image: 'https://via.placeholder.com/300/00bcd4/ffffff?text=So+Mi+Ke' },
            { id: '8', name: 'Áo sơ mi dài tay', cate_id: '2', detail: 'Áo sơ mi dài tay phong cách Hàn Quốc', image: 'https://via.placeholder.com/300/009688/ffffff?text=So+Mi+Dai' },
            { id: '9', name: 'Quần jeans rách', cate_id: '3', detail: 'Quần jeans rách gối phong cách trẻ trung', image: 'https://via.placeholder.com/300/795548/ffffff?text=Jeans+Rach' },
            { id: '10', name: 'Quần jeans đen', cate_id: '3', detail: 'Quần jeans màu đen cơ bản', image: 'https://via.placeholder.com/300/607d8b/ffffff?text=Jeans+Den' },
            { id: '11', name: 'Váy ngắn xòe', cate_id: '4', detail: 'Váy ngắn xòe xinh xắn', image: 'https://via.placeholder.com/300/f44336/ffffff?text=Vay+Xoe' },
            { id: '12', name: 'Váy suông công sở', cate_id: '4', detail: 'Váy suông phong cách công sở thanh lịch', image: 'https://via.placeholder.com/300/673ab7/ffffff?text=Vay+Cong+So' }
        ],
        
        productVariants: savedProductVariants ? JSON.parse(savedProductVariants) : [
            { id: '1', product_id: '1', variant_name: 'Size M - Đen', price: 200000, quantity: 50, image: 'https://via.placeholder.com/300/000000/ffffff?text=Size+M' },
            { id: '2', product_id: '1', variant_name: 'Size L - Trắng', price: 210000, quantity: 30, image: 'https://via.placeholder.com/300/ffffff/000000?text=Size+L' },
            { id: '3', product_id: '2', variant_name: 'Size M - Trắng', price: 350000, quantity: 40, image: 'https://via.placeholder.com/300' },
            { id: '4', product_id: '3', variant_name: 'Size 30 - Xanh đậm', price: 450000, quantity: 25, image: 'https://via.placeholder.com/300' },
            { id: '5', product_id: '4', variant_name: 'Size S - Hoa nhí', price: 380000, quantity: 35, image: 'https://via.placeholder.com/300' },
            { id: '6', product_id: '5', variant_name: 'Size M - Xanh navy', price: 250000, quantity: 45, image: 'https://via.placeholder.com/300' },
            { id: '7', product_id: '5', variant_name: 'Size L - Đen', price: 260000, quantity: 40, image: 'https://via.placeholder.com/300' },
            { id: '8', product_id: '6', variant_name: 'Size XL - Trắng', price: 280000, quantity: 50, image: 'https://via.placeholder.com/300' },
            { id: '9', product_id: '6', variant_name: 'Size XL - Đen', price: 280000, quantity: 45, image: 'https://via.placeholder.com/300' },
            { id: '10', product_id: '7', variant_name: 'Size M - Xanh trắng', price: 320000, quantity: 35, image: 'https://via.placeholder.com/300' },
            { id: '11', product_id: '7', variant_name: 'Size L - Đỏ trắng', price: 330000, quantity: 30, image: 'https://via.placeholder.com/300' },
            { id: '12', product_id: '8', variant_name: 'Size M - Trắng', price: 380000, quantity: 25, image: 'https://via.placeholder.com/300' },
            { id: '13', product_id: '8', variant_name: 'Size L - Xanh nhạt', price: 390000, quantity: 20, image: 'https://via.placeholder.com/300' },
            { id: '14', product_id: '9', variant_name: 'Size 29 - Xanh nhạt', price: 480000, quantity: 30, image: 'https://via.placeholder.com/300' },
            { id: '15', product_id: '9', variant_name: 'Size 31 - Xanh đậm', price: 490000, quantity: 28, image: 'https://via.placeholder.com/300' },
            { id: '16', product_id: '10', variant_name: 'Size 30 - Đen', price: 470000, quantity: 40, image: 'https://via.placeholder.com/300' },
            { id: '17', product_id: '10', variant_name: 'Size 32 - Đen', price: 480000, quantity: 35, image: 'https://via.placeholder.com/300' },
            { id: '18', product_id: '11', variant_name: 'Size S - Hồng', price: 320000, quantity: 50, image: 'https://via.placeholder.com/300' },
            { id: '19', product_id: '11', variant_name: 'Size M - Vàng', price: 330000, quantity: 45, image: 'https://via.placeholder.com/300' },
            { id: '20', product_id: '12', variant_name: 'Size M - Đen', price: 420000, quantity: 30, image: 'https://via.placeholder.com/300' },
            { id: '21', product_id: '12', variant_name: 'Size L - Xám', price: 430000, quantity: 25, image: 'https://via.placeholder.com/300' }
        ],
        
        users: savedUsers ? JSON.parse(savedUsers) : [
            { id: '1', name: 'Admin', email: 'admin@susan.com', phone: '0123456789', address: '123 Admin Street', password: 'admin123', role: 'admin' },
            { id: '2', name: 'Nguyễn Văn A', email: 'customer@test.com', phone: '0987654321', address: '456 Customer Avenue', password: '123456', role: 'customer' }
        ],
        
        orders: savedOrders ? JSON.parse(savedOrders) : [],
        orderDetails: savedOrderDetails ? JSON.parse(savedOrderDetails) : []
    };
};

export const MOCK_DATA = initializeData();

let orderIdCounter = MOCK_DATA.orders.length > 0 
    ? Math.max(...MOCK_DATA.orders.map(o => parseInt(o.id))) + 1 
    : 1;
let orderDetailIdCounter = MOCK_DATA.orderDetails.length > 0 
    ? Math.max(...MOCK_DATA.orderDetails.map(od => parseInt(od.id))) + 1 
    : 1;

// Helper functions to save data to localStorage
const saveUsers = () => {
    localStorage.setItem('mockUsers', JSON.stringify(MOCK_DATA.users));
};

const saveOrders = () => {
    localStorage.setItem('mockOrders', JSON.stringify(MOCK_DATA.orders));
};

const saveOrderDetails = () => {
    localStorage.setItem('mockOrderDetails', JSON.stringify(MOCK_DATA.orderDetails));
};

const saveProducts = () => {
    localStorage.setItem('mockProducts', JSON.stringify(MOCK_DATA.products));
};

const saveProductVariants = () => {
    localStorage.setItem('mockProductVariants', JSON.stringify(MOCK_DATA.productVariants));
};

export const mockAPI = {
    async get(endpoint, id = '') {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const resourceMap = {
            '/categories': 'categories',
            '/products': 'products',
            '/product-variants': 'productVariants',
            '/orders': 'orders',
            '/order-details': 'orderDetails',
            '/users': 'users'
        };
        
        const resource = resourceMap[endpoint];
        if (!resource) throw new Error('Resource not found');
        
        if (id) {
            const item = MOCK_DATA[resource].find(item => item.id === id);
            if (!item) throw new Error('Item not found');
            return item;
        }
        
        return [...MOCK_DATA[resource]];
    },
    
    async post(endpoint, data) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const resourceMap = {
            '/categories': 'categories',
            '/products': 'products',
            '/product-variants': 'productVariants',
            '/orders': 'orders',
            '/order-details': 'orderDetails',
            '/users': 'users'
        };
        
        const resource = resourceMap[endpoint];
        if (!resource) throw new Error('Resource not found');
        
        let newId;
        if (resource === 'orders') {
            newId = String(orderIdCounter++);
        } else if (resource === 'orderDetails') {
            newId = String(orderDetailIdCounter++);
        } else if (resource === 'users') {
            newId = String(MOCK_DATA.users.length + 1);
        } else {
            newId = String(MOCK_DATA[resource].length + 1);
        }
        
        const newItem = { id: newId, ...data };
        MOCK_DATA[resource].push(newItem);
        
        // Save to localStorage
        if (resource === 'users') saveUsers();
        if (resource === 'orders') saveOrders();
        if (resource === 'orderDetails') saveOrderDetails();
        if (resource === 'products') saveProducts();
        if (resource === 'productVariants') saveProductVariants();
        
        return newItem;
    },
    
    async put(endpoint, id, data) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const resourceMap = {
            '/categories': 'categories',
            '/products': 'products',
            '/product-variants': 'productVariants',
            '/orders': 'orders',
            '/order-details': 'orderDetails',
            '/users': 'users'
        };
        
        const resource = resourceMap[endpoint];
        if (!resource) throw new Error('Resource not found');
        
        const index = MOCK_DATA[resource].findIndex(item => item.id === id);
        if (index === -1) throw new Error('Item not found');
        
        MOCK_DATA[resource][index] = { ...data, id };
        
        // Save to localStorage
        if (resource === 'users') saveUsers();
        if (resource === 'orders') saveOrders();
        if (resource === 'orderDetails') saveOrderDetails();
        if (resource === 'products') saveProducts();
        if (resource === 'productVariants') saveProductVariants();
        
        return MOCK_DATA[resource][index];
    },
    
    async delete(endpoint, id) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const resourceMap = {
            '/categories': 'categories',
            '/products': 'products',
            '/product-variants': 'productVariants',
            '/orders': 'orders',
            '/order-details': 'orderDetails',
            '/users': 'users'
        };
        
        const resource = resourceMap[endpoint];
        if (!resource) throw new Error('Resource not found');
        
        const index = MOCK_DATA[resource].findIndex(item => item.id === id);
        if (index === -1) throw new Error('Item not found');
        
        const deleted = MOCK_DATA[resource][index];
        MOCK_DATA[resource].splice(index, 1);
        
        // Save to localStorage
        if (resource === 'users') saveUsers();
        if (resource === 'orders') saveOrders();
        if (resource === 'orderDetails') saveOrderDetails();
        if (resource === 'products') saveProducts();
        if (resource === 'productVariants') saveProductVariants();
        
        return deleted;
    }
};
