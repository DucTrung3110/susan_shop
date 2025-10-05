# Hướng dẫn thiết lập API Backend

## Bước 1: Tạo tài khoản MockAPI.io

1. Truy cập https://mockapi.io/
2. Đăng ký tài khoản miễn phí
3. Tạo một project mới

## Bước 2: Tạo các API endpoints

Tạo các resource sau trong MockAPI project của bạn:

### 1. categories
```json
{
  "id": "1",
  "name": "Áo thun",
  "parent_id": null
}
```

### 2. products
```json
{
  "id": "1",
  "name": "Áo thun basic",
  "cate_id": "1",
  "detail": "Áo thun cotton 100%",
  "image": "https://via.placeholder.com/300"
}
```

### 3. product-variants
```json
{
  "id": "1",
  "product_id": "1",
  "variant_name": "Size M - Màu Đen",
  "price": 200000,
  "quantity": 50,
  "image": "https://via.placeholder.com/300"
}
```

### 4. orders
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

### 5. order-details
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

### 6. users
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

## Bước 3: Cập nhật config

1. Mở file `scripts/config.js`
2. Thay đổi `BASE_URL` thành URL của project MockAPI của bạn
   - Ví dụ: `https://YOUR_PROJECT_ID.mockapi.io/api`
3. Lưu file

## Bước 4: Test

1. Khởi động lại server
2. Truy cập trang web và kiểm tra dữ liệu hiển thị

## Tài khoản mẫu để test

Sau khi tạo API, hãy tạo các user sau để test:

**Admin:**
- Email: admin@susan.com
- Password: admin123
- Role: admin

**Customer:**
- Email: customer@test.com
- Password: 123456
- Role: customer
