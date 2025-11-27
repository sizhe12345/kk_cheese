# 🧀 KK Cheese - Kulit Kulit E-Commerce Website

一个现代化的马来西亚薄皮零食电商网站，使用 React + TypeScript + Vite 构建。

## ✨ 特色功能

- 🎨 现代化 Memphis 风格设计
- 🛒 完整的购物车功能
- 📱 WhatsApp 直接下单集成
- ⚡ 快速响应的用户界面
- 🎭 流畅的动画效果（Framer Motion）
- 📱 完全响应式设计

## 🚀 本地运行

**前置要求：** Node.js 18+

### 步骤：

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **打开浏览器**
   访问 [http://localhost:3000](http://localhost:3000)

## 📦 构建生产版本

```bash
npm run build
npm run preview  # 预览生产版本
```

## 🌐 部署到 Vercel

详细的部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

**快速部署：**
```bash
npm install -g vercel
vercel --prod
```

## 🛠️ 技术栈

- **框架：** React 19.2 + TypeScript
- **构建工具：** Vite 6.2
- **路由：** React Router DOM 7.9
- **动画：** Framer Motion 12.23
- **图标：** Lucide React
- **样式：** Tailwind CSS (CDN)

## 📝 项目结构

```
kkcheese/
├── components/          # 可复用组件
│   └── Button.tsx      # 按钮组件
├── App.tsx             # 主应用组件
├── types.ts            # TypeScript 类型定义
├── index.tsx           # 应用入口
├── index.html          # HTML 模板
├── vite.config.ts      # Vite 配置
└── vercel.json         # Vercel 部署配置
```

## 🎨 主要页面

- **首页 (/)** - 品牌展示和产品预览
- **产品页 (/products)** - 完整产品列表
- **关于页 (/about)** - 品牌故事
- **结账页 (/checkout)** - 订单确认和 WhatsApp 下单

## 📞 联系方式

如需修改 WhatsApp 订单号码，请编辑 `App.tsx` 第 515 行。

---

**Made with ❤️ for KK Cheese**
