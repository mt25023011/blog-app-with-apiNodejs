# Blog Web Project

## Giới thiệu
Đây là dự án blog web được xây dựng với công nghệ web hiện đại. Dự án bao gồm cả phần frontend (React) và backend (Node.js). Dự án cung cấp các tính năng blog cơ bản với hệ thống xác thực người dùng.

## Cấu trúc dự án
```
blog-app-with-apiNodejs/
├── blog_webBackendapi/    # Backend API (Node.js)
│   ├── src/
│   │   ├── controllers/   # Xử lý logic nghiệp vụ
│   │   ├── models/        # Định nghĩa cấu trúc dữ liệu
│   │   └── services/      # Các dịch vụ tiện ích
│   └── ...
└── blog_WevReact/         # Frontend application (React)
```

## Yêu cầu hệ thống
- Node.js (phiên bản mới nhất được khuyến nghị)
- MySQL hoặc PostgreSQL (cho cơ sở dữ liệu)
- npm hoặc yarn (quản lý gói)

## Cài đặt và Chạy dự án

### Backend
1. Di chuyển vào thư mục backend:
```bash
cd blog_webBackendapi
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cấu hình môi trường:
   - Tạo file `.env` trong thư mục backend
   - Thêm các biến môi trường cần thiết (JWT_SECRET, DATABASE_URL, etc.)

4. Chạy server:
```bash
npm start
```

### Frontend
1. Di chuyển vào thư mục frontend:
```bash
cd blog_WevReact
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng:
```bash
npm run dev
```

## Tính năng
- **Xác thực người dùng**:
  - Đăng ký tài khoản
  - Đăng nhập với JWT
  - Xác thực email và mật khẩu
- **Quản lý người dùng**:
  - Phân quyền người dùng (R2)
  - Bảo mật mật khẩu với mã hóa

## API Endpoints
- **POST /auth/register**: Đăng ký người dùng mới
- **POST /auth/login**: Đăng nhập người dùng

## Đóng góp
Mọi đóng góp đều được hoan nghênh. Vui lòng tạo issue hoặc pull request để đóng góp.

## Giấy phép
MIT License 
