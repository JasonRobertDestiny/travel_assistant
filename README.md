# 旅行助手应用 (Travel Assistant)

一个用于管理和计划旅行行程的Web应用程序。

## 功能特点

- 查看所有旅行行程
- 创建新的旅行行程
- 简洁直观的用户界面

## 技术栈

- React.js
- React Router
- CSS3
- 模拟API服务

## 页面说明

- **页面1（首页）**：显示所有行程和"创建新的行程"按钮
- **页面2（创建行程）**：提供表单创建新的旅行行程

## 如何运行

1. 安装依赖：
   ```
   npm install
   ```

2. 启动开发服务器：
   ```
   npm start
   ```

3. 构建生产版本：
   ```
   npm run build
   ```

## 项目结构

```
travel_assistant/
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── api/              # API服务
│   ├── assets/           # 图片、SVG等资源
│   ├── components/       # 可复用组件
│   ├── pages/            # 页面组件
│   ├── styles/           # CSS样式
│   ├── App.js            # 应用主组件
│   └── index.js          # 入口文件
└── package.json          # 项目配置
```

## 后续计划

- 添加用户认证
- 集成实际后端API
- 添加行程详情页
- 提供行程分享功能
