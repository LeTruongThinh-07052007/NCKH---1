# Tóm tắt chi tiết quá trình xây dựng ứng dụng web

## Cài đặt và khởi tạo dự án

1. Chọn Vite làm công cụ build:
   - Vite được chọn vì khả năng hot module replacement (HMR) nhanh và hiệu quả.
   - Sử dụng template React của Vite để tự động cấu hình các settings cơ bản cho dự án React.

2. Khởi tạo dự án:
   ```
   npm create vite@latest my-project -- --template react
   cd my-project
   ```

3. Cài đặt dependencies:
   ```
   npm install
   ```
   - Quá trình này cài đặt các dependencies được định nghĩa trong package.json, bao gồm React, React DOM, và các dev dependencies cần thiết.

4. Cấu hình Tailwind CSS:
   ```
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
   - Tạo file tailwind.config.js và postcss.config.js
   - Cập nhật file CSS chính để import Tailwind

5. Cấu hình ESLint và Prettier cho code consistency:
   ```
   npm install -D eslint prettier eslint-config-prettier eslint-plugin-react
   ```
   - Tạo file .eslintrc.js và .prettierrc để định nghĩa rules

6. Khởi động development server:
   ```
   npm run dev
   ```
   - Server chạy mặc định trên http://localhost:5173

## Front-end

1. Cấu trúc thư mục:
   ```
   src/
   ├── components/
   ├── pages/
   ├── hooks/
   ├── context/
   ├── utils/
   ├── assets/
   ├── styles/
   ├── App.jsx
   └── main.jsx
   ```

2. Xây dựng components:
   - Tạo các functional components sử dụng React Hooks
   - Ví dụ về một component cơ bản:
     ```jsx
     import React from 'react';
     
     const Button = ({ text, onClick }) => {
       return (
         <button 
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           onClick={onClick}
         >
           {text}
         </button>
       );
     };
     
     export default Button;
     ```

3. State Management:
   - Sử dụng React Hooks (useState, useReducer) cho local state
   - Implement Context API cho global state nếu cần
   - Ví dụ sử dụng useState:
     ```jsx
     import React, { useState } from 'react';
     
     const Counter = () => {
       const [count, setCount] = useState(0);
       
       return (
         <div>
           <p>Count: {count}</p>
           <button onClick={() => setCount(count + 1)}>Increment</button>
         </div>
       );
     };
     ```

4. Routing:
   - Sử dụng React Router cho navigation
   ```
   npm install react-router-dom
   ```
   - Cấu hình routes trong App.jsx

5. Styling:
   - Sử dụng Tailwind CSS cho rapid UI development
   - Tạo custom components kết hợp Tailwind classes

## Back-end

1. Cấu trúc thư mục:
   ```
   server/
   ├── controllers/
   │   ├── taskController.js
   │   └── userController.js
   ├── middlewares/
   │   ├── authMiddleware.js
   │   └── errorMiddleware.js
   ├── models/
   │   ├── notification.js
   │   ├── task.js
   │   └── user.js
   ├── routes/
   │   ├── index.js
   │   ├── taskRoutes.js
   │   └── userRoutes.js
   ├── utils/
   │   └── index.js
   ├── .env
   └── index.js
   ```

2. Cài đặt dependencies:
   ```
   npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser cors morgan
   ```

3. Cấu hình server (index.js):
   ```javascript
   import express from "express";
   import dotenv from "dotenv";
   import cookieParser from "cookie-parser";
   import cors from "cors";
   import morgan from "morgan";
   import { dbConnection } from "./utils/index.js";
   import routes from "./routes/index.js";
   import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";

   dotenv.config();
   dbConnection();

   const app = express();

   app.use(cors({
     origin: ["http://localhost:3000", "http://localhost:5173"],
     methods: ["GET", "POST", "DELETE", "PUT"],
     credentials: true,
   }));

   app.use(express.json());
   app.use(cookieParser());
   app.use(morgan("dev"));

   app.use("/api", routes);

   app.use(routeNotFound);
   app.use(errorHandler);

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
   ```

4. Mongoose Models:
   - User Model (models/user.js):
     ```javascript
     const userSchema = new Schema({
       name: { type: String, required: true },
       title: { type: String, required: true },
       role: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       isAdmin: { type: Boolean, required: true, default: false },
       tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
       isActive: { type: Boolean, required: true, default: true },
     });
     ```

   - Task Model (models/task.js):
     ```javascript
     const taskSchema = new Schema({
       title: { type: String, required: true },
       date: { type: Date, default: new Date() },
       priority: { type: String, enum: ["high", "medium", "normal", "low"] },
       stage: { type: String, enum: ["todo", "in progress", "completed"] },
       activities: [{ type: String, activity: String, date: Date, by: ObjectId }],
       subTasks: [{ title: String, date: Date, tag: String }],
       assets: [String],
       team: [{ type: Schema.Types.ObjectId, ref: "User" }],
       isTrashed: { type: Boolean, default: false },
     });
     ```

5. Controllers:
   - userController.js: Xử lý đăng ký, đăng nhập, đăng xuất, cập nhật profile, và các chức năng liên quan đến người dùng.
   - taskController.js: Xử lý tạo, cập nhật, xóa, và truy vấn tasks.

6. Routes:
   - userRoutes.js: Định nghĩa các endpoints cho user operations.
   - taskRoutes.js: Định nghĩa các endpoints cho task operations.

7. Middleware:
   - authMiddleware.js: Xác thực người dùng và kiểm tra quyền admin.
   - errorMiddleware.js: Xử lý lỗi và route không tồn tại.

8. Utils:
   - dbConnection: Thiết lập kết nối MongoDB.
   - createJWT: Tạo JWT token cho authentication.

9. Environment Variables (.env):
   ```
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=8800
   ```

## Kết nối Front-end và Back-end

1. Axios Configuration:
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: 'http://localhost:8800/api',
     withCredentials: true,
   });

   export default api;
   ```

2. Sử dụng API trong React components:
   ```jsx
   import api from '../utils/api';

   const login = async (email, password) => {
     try {
       const response = await api.post('/user/login', { email, password });
       return response.data;
     } catch (error) {
       console.error('Login error:', error.response.data);
       throw error;
     }
   };
   ```

3. Xử lý Authentication:
   - Sử dụng JWT được lưu trong HTTP-only cookie.
   - Implement context hoặc Redux để quản lý trạng thái đăng nhập của user.


## Bảo mật

1. JWT Authentication:
   - Tokens được lưu trong HTTP-only cookies để tránh XSS attacks.
   - Implement refresh token strategy để tăng cường bảo mật.

2. Password Hashing:
   - Sử dụng bcrypt để hash passwords trước khi lưu vào database.

3. Input Validation:
   - Validate và sanitize tất cả user inputs ở cả front-end và back-end.

4. CORS Configuration:
   - Cấu hình CORS để chỉ cho phép các origins được chỉ định.

5. Rate Limiting:
   - Implement rate limiting để ngăn chặn brute-force attacks.

6. Error Handling:
   - Sử dụng custom error handler để tránh leak sensitive information.

