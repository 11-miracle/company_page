# TikTok 数据分析工具

这是一个基于Next.js构建的TikTok数据分析平台，提供批量查询、筛选查询和黑名单管理功能。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 功能特性

- **批量查询**: 通过输入多个用户名批量获取TikTok达人数据
- **筛选查询**: 根据GMV、品类、粉丝数等条件筛选达人
- **黑名单管理**: 添加/移除黑名单用户并记录原因
- **数据导出**: 支持将查询结果导出为Excel文件
- **模板下载**: 提供标准模板用于批量上传UID

## 技术栈

- Next.js 15
- React 19
- Tailwind CSS
- Axios
- XLSX (Excel导出)

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 生产构建
```bash
pnpm build
```

### 启动生产服务器
```bash
pnpm start
```

### 项目功能

- 批量查询API: `/api/batchQuery`
- 筛选查询API: `/api/filterQuery`
- 黑名单管理: `/app/blacklist.jsx`

### 环境变量配置

创建`.env.local`文件并添加:
```
NEXT_PUBLIC_API_KEY=your_api_key
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
