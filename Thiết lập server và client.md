# Thiết lập server

## Environment 
 Tạo file `.env` ở thư mục Server. File `.env`  setup Server bao gồm

- MONGODB_URI = `Đường dẫn tới MongoDB`
- JWT_SECRET = `tạo 1 key JWT bất kì`
- PORT = `8800` hoặc bất kì cổng nào
- NODE_ENV = `development`




## Thiết lập MongoDB:

1. Thiết lập MONGODB theo các bước như sau:
    -  Vào web của MONGODB
        -  [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

    - Tạo tài khoản
    - Đăng nhập vào MongoDB Atlas account.
    - Tạo 1 Cluster mới
    - Chọn vùng lưu trữ
    - Thiết lập các cài đặt về Cluster
    - Tạo Cluster
    - Đợi Cluster được triển khai
    - Tạo Database User
    - Thiết lập IP Whitelist
    - Kết nối với Cluster
    - Kết nối với Web
    - Test kết nối

2. Tạo 1 database mới và cấu hình file `.env` với đường dẫn của MONGODB. 

## Các bước để chạy server

1. Mở dự án.
2. Chuyển sang folder server `cd server`.
3. Chạy `npm i` hoặc `npm install` để tải các gói cài đặt.
4. Chay `npm start` để thiết lập server.

Nếu thiết lập đúng, terminal sẽ xuất hiện dòng chữ `Database Connected`.



# Thiết lập phía người dùng

## Environment 
 Tạo file `.env` ở thư mục người dùng. File `.env` bao gồm:

- VITE_APP_BASE_URL = `http://localhost:8800` #Lưu ý: Thay đổi cổng 8800 tuỳ theo cổng port được tạo bởi Vite.
- VITE_APP_FIREBASE_API_KEY = `Firebase api key`

## Các bước chạy phần thiết lập người dùng

1. Chuyển tới thư mục client `cd client`.
2. Chạy `npm i` hoặc `npm install` để tải các gói cài đặt
3. Chạy `npm start` để dùng web trên localhost `http://localhost:3157`.
4. Mở [http://localhost:3157](http://localhost:3157) để xem web chạy trên localhost.
