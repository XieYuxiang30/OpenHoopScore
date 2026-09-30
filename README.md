# OpenHoopScore 🏀

面向基层篮球赛事的开源轻量级计分与数据管理系统。

## 项目简介

OpenHoopScore 聚焦「校园比赛、业余联赛、爱好者赛事」场景，为赛事组织者、裁判、球队提供免费、易用、高效的数据管理工具。

### 核心功能

- **赛事管理**：创建/编辑赛事、赛程编排、状态管理
- **实时计分**：裁判端计分操作、观众端实时比分同步
- **数据统计**：球队/球员基础统计、赛后数据导出
- **多角色支持**：管理员、裁判、观众

## 技术栈

### 前端
- React 18 + Vite + TypeScript
- TailwindCSS
- Socket.io Client
- React Router

### 后端
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- CORS

## 本地运行

### 环境要求
- Node.js >= 18.x
- MongoDB >= 6.x

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/your-username/OpenHoopScore.git
cd OpenHoopScore
```

2. 安装后端依赖
```bash
cd backend
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，配置 MongoDB 连接字符串
```

4. 安装前端依赖
```bash
cd ../frontend
npm install
```

5. 启动 MongoDB（确保本地 MongoDB 服务正在运行）

6. 启动后端服务
```bash
cd backend
npm run dev
```

7. 启动前端开发服务器
```bash
cd frontend
npm run dev
```

8. 访问 http://localhost:3000

## 部署

### 前端（Vercel）
```bash
cd frontend
npm run build
# 部署 dist/ 目录到 Vercel
```

### 后端（Railway）
```bash
cd backend
# 连接 Railway 并部署
```

## 开源协议

本项目采用 MIT 协议。详见 [LICENSE](LICENSE) 文件。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题，请提交 Issue 或联系项目维护者。
