# Hướng dẫn cài đặt Susan Shop

## Giới thiệu

Website bán hàng Susan Shop được xây dựng bằng vanilla JavaScript (ES6+) không sử dụng framework. Dự án bao gồm:
- Giao diện Member: Xem, lọc sản phẩm, giỏ hàng, thanh toán
- Giao diện Admin: Quản lý CRUD danh mục, sản phẩm, khách hàng, đơn hàng
- Thống kê: Dashboard với doanh thu, tồn kho, sản phẩm đã bán

## Bước 1: Chạy dự án với Mock Data (Test nhanh)

Dự án đã được cấu hình sẵn với Mock API để test ngay lập tức:

1. Mở file `scripts/config.js`
2. Đảm bảo `USE_MOCK_API: true`
3. Khởi động server (đã được thiết lập sẵn)
4. Truy cập website

**Tài khoản test:**
- Admin: `admin@susan.com` / `admin123`
- Customer: `customer@test.com` / `123456`

## Bước 2: Thiết lập MockAPI.io (Production)

### 2.1. Tạo tài khoản MockAPI

1. Truy cập https://mockapi.io/
2. Đăng ký tài khoản miễn phí
3. Tạo project mới (ví dụ: "susan-shop")

### 2.2. Tạo các Resource

Tạo 6 resources với schema sau:

#### 1. categories
```json
{
  "id": "1",
  "name": "Áo thun",
  "parent_id": null
}
```

#### 2. products
```json
{
  "id": "1",
  "name": "Áo thun Basic",
  "cate_id": "1",
  "detail": "Áo thun cotton 100%",
  "image": "https://via.placeholder.com/300"
}
```

#### 3. product-variants
```json
{
  "id": "1",
  "product_id": "1",
  "variant_name": "Size M - Đen",
  "price": 200000,
  "quantity": 50,
  "image": "https://via.placeholder.com/300"
}
```

#### 4. orders
```json
{
  "id": "1",
  "user_id": "1",
  "created_date": "2025-10-03T10:00:00Z",
  "status": "pending",
  "customer_name": "Nguyễn Văn A",
  "customer_email": "test@example.com",
  "customer_phone": "0123456789",
  "customer_address": "123 ABC Street",
  "total": 200000
}
```

#### 5. order-details
```json
{
  "id": "1",
  "order_id": "1",
  "product_id": "1",
  "variant_id": "1",
  "quantity": 1,
  "unit_price": 200000
}
```

#### 6. users
```json
{
  "id": "1",
  "name": "Admin",
  "email": "admin@susan.com",
  "phone": "0123456789",
  "address": "123 Admin Street",
  "password": "admin123",
  "role": "admin"
}
```

**LƯU Ý:** Tạo ít nhất 1 user với role "admin" và 1-2 users với role "customer"

### 2.3. Cấu hình API Endpoint

1. Copy URL API từ MockAPI (dạng: `https://YOUR_PROJECT_ID.mockapi.io/api`)
2. Mở file `scripts/config.js`
3. Thay đổi:
   ```javascript
   const API_CONFIG = {
       USE_MOCK_API: false,  // Đổi thành false
       BASE_URL: 'https://YOUR_PROJECT_ID.mockapi.io/api',  // Paste URL của bạn
       ...
   };
   ```
4. Lưu file và reload lại website

## Bước 3: Kiểm tra chức năng

### Member Features
- ✅ Xem danh sách sản phẩm
- ✅ Lọc theo danh mục, khoảng giá
- ✅ Xem chi tiết sản phẩm
- ✅ Thêm vào giỏ hàng (LocalStorage)
- ✅ Đăng ký / Đăng nhập
- ✅ Thanh toán
- ✅ Màn hình cảm ơn

### Admin Features
- ✅ Dashboard thống kê
- ✅ CRUD Danh mục
- ✅ CRUD Sản phẩm
- ✅ Xem khách hàng
- ✅ Quản lý đơn hàng (cập nhật trạng thái)

## Công nghệ sử dụng

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **ES6+ Features:** 
  - Async/Await
  - Modules (import/export)
  - Arrow Functions
  - Destructuring
  - Spread Operator
  - Template Literals
- **API:** Fetch API
- **Storage:** LocalStorage (giỏ hàng, session)
- **Backend:** MockAPI.io (REST API)

## Cấu trúc thư mục

```
susan-shop/
├── index.html              # Trang chủ
├── login.html              # Đăng nhập
├── register.html           # Đăng ký
├── product-detail.html     # Chi tiết sản phẩm
├── cart.html               # Giỏ hàng
├── checkout.html           # Thanh toán
├── thank-you.html          # Cảm ơn
├── admin/                  # Trang quản trị
│   ├── index.html          # Dashboard
│   ├── categories.html     # Quản lý danh mục
│   ├── products.html       # Quản lý sản phẩm
│   ├── customers.html      # Quản lý khách hàng
│   └── orders.html         # Quản lý đơn hàng
├── styles/                 # CSS
│   ├── main.css            # CSS chính
│   └── admin.css           # CSS admin
├── scripts/                # JavaScript
│   ├── config.js           # Cấu hình API
│   ├── api.js              # API service
│   ├── auth.js             # Xác thực
│   ├── cart.js             # Giỏ hàng
│   ├── utils.js            # Tiện ích
│   ├── mock-data.js        # Mock data (test)
│   └── admin/              # JS admin
└── images/                 # Hình ảnh
```

## Lưu ý bảo mật

⚠️ **CHỈ DÙNG CHO MỤC ĐÍCH HỌC TẬP**

Dự án này là assignment học tập, không phù hợp cho production vì:
- Password không được mã hóa
- Không có HTTPS enforcement
- Không có rate limiting
- Không có input sanitization đầy đủ

Để sử dụng thực tế, cần:
1. Hash password (bcrypt, argon2)
2. Sử dụng JWT token thay vì lưu user info
3. Implement server-side validation
4. Thêm CSRF protection
5. Sử dụng HTTPS

## Troubleshooting

### Lỗi: Cannot GET /...
- Đảm bảo server đang chạy
- Kiểm tra đường dẫn file

### Lỗi: API Error
- Kiểm tra `USE_MOCK_API` trong config.js
- Nếu dùng MockAPI, kiểm tra URL đúng chưa
- Mở Console để xem chi tiết lỗi

### Giỏ hàng bị mất
- Kiểm tra LocalStorage không bị disable
- Không dùng chế độ Incognito

### Không đăng nhập được Admin
- Đảm bảo có user với `role: "admin"` trong database
- Email/password phải khớp chính xác
