# Blog Web Frontend (React)

## Tổng quan
Đây là phần frontend của Dự án Blog Web, được xây dựng bằng React và các công nghệ web hiện đại. Nó cung cấp giao diện người dùng thân thiện cho các tương tác blog và xác thực người dùng.

## Tính năng
- 📝 Tạo và quản lý bài viết blog
- 👤 Xác thực và phân quyền người dùng
- 📱 Thiết kế responsive cho mọi thiết bị
- 🎨 Giao diện người dùng hiện đại và trực quan
- 🔒 Phiên người dùng an toàn với JWT

## Công nghệ sử dụng
- React
- React Router cho điều hướng
- Axios cho các yêu cầu API
- Tailwind CSS cho giao diện
- React Query cho quản lý state
- Formik & Yup cho xử lý và xác thực form

## Yêu cầu hệ thống
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn
- Backend API đang chạy (xem README chính của dự án)

## Hướng dẫn cài đặt

### Cài đặt
1. Clone repository:
```bash
git clone [repository-url]
cd blog_WevReact
```

2. Cài đặt các dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Tạo file `.env` trong thư mục gốc và thêm các biến môi trường cần thiết:
```env
VITE_API_URL=http://localhost:3000
```

### Phát triển
Để khởi động máy chủ phát triển:
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build cho Production
Để tạo bản build cho production:
```bash
npm run build
# hoặc
yarn build
```

## Cấu trúc dự án
```
blog_WevReact/
├── src/
│   ├── components/     # Các component UI có thể tái sử dụng
│   ├── pages/         # Các component trang
│   ├── hooks/         # Custom React hooks
│   ├── services/      # Các service API
│   ├── utils/         # Các hàm tiện ích
│   ├── context/       # React context providers
│   └── assets/        # Tài nguyên tĩnh (hình ảnh, font)
├── public/            # Các file tĩnh public
└── ...
```

## Các lệnh có sẵn
- `npm run dev` - Khởi động máy chủ phát triển
- `npm run build` - Build cho production
- `npm run preview` - Xem trước bản build production
- `npm run lint` - Chạy ESLint
- `npm run test` - Chạy tests

## Đóng góp
1. Fork repository
2. Tạo nhánh tính năng mới (`git checkout -b feature/TinhNangMoi`)
3. Commit các thay đổi (`git commit -m 'Thêm một số tính năng mới'`)
4. Push lên nhánh (`git push origin feature/TinhNangMoi`)
5. Tạo Pull Request

## Giấy phép
Dự án này được cấp phép theo MIT License - xem file LICENSE để biết thêm chi tiết.

## Hỗ trợ
Để được hỗ trợ, vui lòng tạo issue trong repository hoặc liên hệ với người duy trì.
