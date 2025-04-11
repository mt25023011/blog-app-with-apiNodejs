# Blog Web Backend API

## Giới thiệu
Backend API cho dự án Blog Web, được xây dựng với Node.js và Express.js. API này cung cấp các endpoint để quản lý bài viết, người dùng và các tính năng khác của blog.

## Công nghệ sử dụng
- Node.js
- Express.js
- Sequelize (ORM)
- MySQL/PostgreSQL
- JWT Authentication
- Babel

## Cấu trúc thư mục
```
blog_webBackendapi/
├── src/                    # Source code
├── .env                    # Environment variables
├── .env.example           # Example environment variables
├── .sequelizerc           # Sequelize configuration
├── .babelrc              # Babel configuration
├── package.json          # Project dependencies
└── package-lock.json     # Locked dependencies
```

## Yêu cầu hệ thống
- Node.js (v14 trở lên)
- MySQL/PostgreSQL
- npm hoặc yarn

## Cài đặt

1. Clone repository:
```bash
git clone [repository-url]
cd blog_webBackendapi
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cấu hình môi trường:
- Copy file `.env.example` thành `.env`
- Cập nhật các biến môi trường trong file `.env`:
  - Database configuration
  - JWT secret
  - Port
  - Các cấu hình khác

4. Khởi tạo database:
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

5. Chạy server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Đăng ký người dùng mới
- POST /api/auth/login - Đăng nhập
- POST /api/auth/logout - Đăng xuất

### Users
- GET /api/users - Lấy danh sách người dùng
- GET /api/users/:id - Lấy thông tin người dùng
- PUT /api/users/:id - Cập nhật thông tin người dùng
- DELETE /api/users/:id - Xóa người dùng

### Posts
- GET /api/posts - Lấy danh sách bài viết
- GET /api/posts/:id - Lấy chi tiết bài viết
- POST /api/posts - Tạo bài viết mới
- PUT /api/posts/:id - Cập nhật bài viết
- DELETE /api/posts/:id - Xóa bài viết

## Development

### Scripts
- `npm run dev`: Chạy server ở chế độ development với hot-reload
- `npm start`: Chạy server ở chế độ production
- `npm run lint`: Kiểm tra code style
- `npm run test`: Chạy tests

### Database Migrations
```bash
# Tạo migration mới
npx sequelize-cli migration:create --name migration-name

# Chạy migrations
npx sequelize-cli db:migrate

# Hoàn tác migration
npx sequelize-cli db:migrate:undo
```

## Bảo mật
- Sử dụng JWT cho authentication
- Mã hóa mật khẩu với bcrypt
- CORS được cấu hình
- Rate limiting được áp dụng
- Input validation

## Đóng góp
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## Giấy phép
[Thông tin về giấy phép sẽ được cập nhật] 