# Susan Shop - Website Bán Hàng Thời Trang

## Giới thiệu

Susan Shop là website bán hàng thời trang được xây dựng hoàn toàn bằng **vanilla JavaScript (ES6+)**, không sử dụng framework hay thư viện frontend. Dự án đáp ứng đầy đủ yêu cầu assignment môn Lập trình JavaScript nâng cao.

## Tính năng nổi bật

### Phần Member (Khách hàng)

✅ **Xem và tìm kiếm sản phẩm**
- Hiển thị danh sách sản phẩm với hình ảnh, tên, giá
- Xem chi tiết sản phẩm với các phiên bản (size, màu sắc)
- Lọc sản phẩm theo danh mục
- Lọc sản phẩm theo khoảng giá (min-max)

✅ **Xác thực người dùng**
- Đăng ký tài khoản mới
- Đăng nhập vào hệ thống
- Lưu phiên đăng nhập với LocalStorage

✅ **Giỏ hàng và thanh toán**
- Thêm sản phẩm vào giỏ hàng (lưu trong LocalStorage)
- Cập nhật số lượng, xóa sản phẩm
- Xem tổng giá trị đơn hàng
- Tiến hành thanh toán với thông tin giao hàng
- Màn hình cảm ơn sau khi đặt hàng thành công

### Phần Admin (Quản trị)

✅ **Dashboard thống kê**
- Tổng số sản phẩm đã bán
- Tổng doanh thu
- Số lượng hàng tồn kho
- Số đơn hàng mới

✅ **Quản lý danh mục**
- Thêm, sửa, xóa danh mục sản phẩm
- Hỗ trợ danh mục cha-con (parent_id)

✅ **Quản lý sản phẩm**
- CRUD đầy đủ cho sản phẩm
- Liên kết với danh mục
- Quản lý hình ảnh và mô tả

✅ **Quản lý khách hàng**
- Xem danh sách khách hàng đã đăng ký
- Hiển thị thông tin liên hệ

✅ **Quản lý đơn hàng**
- Xem danh sách đơn hàng
- Cập nhật trạng thái đơn hàng (Chờ xử lý / Hoàn thành / Đã hủy)
- Xóa đơn hàng

## Công nghệ sử dụng

### Frontend
- **HTML5**: Cấu trúc trang web semantic
- **CSS3**: Styling với CSS Variables, Flexbox, Grid Layout
- **Vanilla JavaScript (ES6+)**: Không sử dụng framework

### JavaScript ES6+ Features
- ✅ **Modules**: Import/Export để tổ chức code modular
- ✅ **Async/Await**: Xử lý bất đồng bộ cho API calls
- ✅ **Arrow Functions**: Cú pháp ngắn gọn cho functions
- ✅ **Destructuring**: Trích xuất dữ liệu từ objects/arrays
- ✅ **Spread Operator**: Copy và merge objects/arrays
- ✅ **Template Literals**: String interpolation với backticks
- ✅ **Classes**: OOP với ES6 classes
- ✅ **Promises**: Xử lý async với Promise chains

### API & Backend
- **Fetch API**: Gọi REST API
- **MockAPI.io**: REST API backend (có thể thay thế)
- **Mock Data System**: Dữ liệu mẫu tích hợp sẵn để test

### Storage
- **LocalStorage**: Lưu giỏ hàng và session người dùng

### Thư viện
- **http-server**: Development server để serve static files

## Cấu trúc thư mục

```
susan-shop/
├── index.html              # Trang chủ
├── login.html              # Đăng nhập
├── register.html           # Đăng ký
├── product-detail.html     # Chi tiết sản phẩm
├── cart.html               # Giỏ hàng
├── checkout.html           # Thanh toán
├── thank-you.html          # Màn hình cảm ơn
│
├── admin/                  # Trang quản trị
│   ├── index.html          # Dashboard
│   ├── categories.html     # Quản lý danh mục
│   ├── products.html       # Quản lý sản phẩm
│   ├── customers.html      # Quản lý khách hàng
│   └── orders.html         # Quản lý đơn hàng
│
├── styles/                 # CSS files
│   ├── main.css            # CSS chính
│   └── admin.css           # CSS admin
│
├── scripts/                # JavaScript files
│   ├── config.js           # Cấu hình API
│   ├── api.js              # API service layer
│   ├── auth.js             # Authentication
│   ├── cart.js             # Shopping cart logic
│   ├── utils.js            # Utility functions
│   ├── mock-data.js        # Mock data cho test
│   ├── home.js             # Trang chủ controller
│   ├── product-detail.js   # Chi tiết SP controller
│   ├── cart-page.js        # Giỏ hàng controller
│   ├── checkout.js         # Thanh toán controller
│   └── admin/              # Admin controllers
│       ├── dashboard.js
│       ├── categories.js
│       ├── products.js
│       ├── customers.js
│       └── orders.js
│
├── images/                 # Hình ảnh
│   └── placeholder.svg     # Placeholder image
│
├── API_SETUP.md           # Hướng dẫn setup MockAPI
├── SETUP.md               # Hướng dẫn cài đặt chi tiết
└── README.md              # File này
```

## Cơ sở dữ liệu (Database Schema)

### 1. categories
- `id`: ID danh mục
- `name`: Tên danh mục
- `parent_id`: ID danh mục cha (null nếu là root)

### 2. products
- `id`: ID sản phẩm
- `name`: Tên sản phẩm
- `cate_id`: ID danh mục
- `detail`: Mô tả chi tiết
- `image`: URL hình ảnh

### 3. product-variants
- `id`: ID biến thể
- `product_id`: ID sản phẩm
- `variant_name`: Tên biến thể (VD: "Size M - Đen")
- `price`: Giá bán
- `quantity`: Số lượng tồn kho
- `image`: URL hình ảnh (optional)

### 4. orders
- `id`: ID đơn hàng
- `user_id`: ID người đặt
- `created_date`: Ngày đặt hàng
- `status`: Trạng thái (pending/completed/cancelled)
- `customer_name`: Tên khách hàng
- `customer_email`: Email
- `customer_phone`: Số điện thoại
- `customer_address`: Địa chỉ giao hàng
- `total`: Tổng tiền

### 5. order-details
- `id`: ID chi tiết đơn
- `order_id`: ID đơn hàng
- `product_id`: ID sản phẩm
- `variant_id`: ID biến thể
- `quantity`: Số lượng
- `unit_price`: Đơn giá

### 6. users
- `id`: ID người dùng
- `name`: Họ tên
- `email`: Email (dùng để đăng nhập)
- `phone`: Số điện thoại
- `address`: Địa chỉ
- `password`: Mật khẩu
- `role`: Vai trò (admin/customer)

## Hướng dẫn cài đặt

### Bước 1: Khởi động server

Dự án đã được cấu hình workflow sẵn. Server sẽ chạy tự động trên port 5000.

### Bước 2: Sử dụng Mock API (Test nhanh)

Dự án có sẵn Mock API để test ngay:
- Mở `scripts/config.js`
- Đảm bảo `USE_MOCK_API: true`

**Tài khoản test:**
- Admin: `admin@susan.com` / `admin123`
- Customer: `customer@test.com` / `123456`

### Bước 3: Kết nối MockAPI.io (Production)

Xem hướng dẫn chi tiết trong file `API_SETUP.md` và `SETUP.md`

## Tính năng kỹ thuật

### Modular Architecture
- Code được tổ chức theo mô hình MVC
- Mỗi trang có controller riêng
- API service layer tách biệt
- Utility functions được reuse

### Responsive Design
- Layout responsive với Flexbox và Grid
- Mobile-first approach
- Breakpoints cho tablet và mobile

### User Experience
- Toast notifications cho feedback
- Loading states
- Error handling đầy đủ
- Form validation

### State Management
- LocalStorage cho persistent data
- Session management với Auth module
- Cart state synchronization

## Yêu cầu assignment đã hoàn thành

### Y1 - Thiết kế CSDL ✅
- 6 bảng: categories, products, product-variants, orders, order-details, users
- Đầy đủ fields theo yêu cầu

### Y2 - Chức năng ✅

**Member:**
- ✅ Xem danh sách sản phẩm
- ✅ Xem sản phẩm theo danh mục
- ✅ Đăng ký
- ✅ Đăng nhập
- ✅ Lọc sản phẩm theo khoảng giá
- ✅ Lọc theo danh mục
- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Thanh toán giỏ hàng
- ✅ Màn hình cảm ơn

**Admin:**
- ✅ Quản lý danh mục (CRUD)
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý khách hàng
- ✅ Quản lý đơn hàng
- ✅ Thống kê số lượng sản phẩm được đặt
- ✅ Thống kê doanh thu
- ✅ Thống kê hàng tồn

### Y3 - Tổ chức mã ✅
- ✅ File đặt đúng thư mục (images/, styles/, scripts/)
- ✅ Hình ảnh được xử lý (SVG placeholder, URL từ API)

### Y4 - Tài liệu ✅
- ✅ File README.md với tính năng nổi bật
- ✅ Thư viện sử dụng
- ✅ Hướng dẫn setup (SETUP.md, API_SETUP.md)

## Lưu ý

⚠️ **Chỉ dùng cho mục đích học tập**

Dự án này là assignment học tập, không phù hợp production vì:
- Password không được hash
- Không có HTTPS
- Thiếu input sanitization đầy đủ

## Tác giả

Dự án được xây dựng cho môn Lập trình JavaScript Nâng cao - FPT Polytechnic

## License

Educational purposes only - FPT Polytechnic Assignment
