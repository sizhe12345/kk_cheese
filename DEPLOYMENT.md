# KK Cheese - Vercel 部署指南

## 🚀 本地开发已经运行

您的项目现在应该已经在 **http://localhost:3000** 上运行了！

## 📦 部署到 Vercel

有两种方式可以将项目部署到 Vercel：

### 方法 1：通过 Vercel 网站部署（推荐 ⭐）

这是最简单的方法，适合初学者：

1. **将项目推送到 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   # 创建 GitHub 仓库后运行：
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **访问 Vercel 网站**
   - 前往 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

3. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择您的 GitHub 仓库
   - Vercel 会自动检测到这是一个 Vite 项目

4. **配置项目**（通常无需修改，Vercel 会自动配置）
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **点击 Deploy**
   - 等待几分钟，Vercel 会自动构建并部署您的网站
   - 部署完成后会得到一个 `.vercel.app` 域名

6. **每次更新代码**
   - 只需 `git push` 到 GitHub
   - Vercel 会自动重新部署

### 方法 2：使用 Vercel CLI 部署

适合高级用户或不想使用 Git 的情况：

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```
   
   首次部署时会询问几个问题：
   - Set up and deploy? → Yes
   - Which scope? → 选择您的账号
   - Link to existing project? → No
   - What's your project's name? → kkcheese（或您喜欢的名字）
   - In which directory is your code located? → ./
   
   Vercel 会自动检测配置并部署

4. **部署到生产环境**
   ```bash
   vercel --prod
   ```

## 🔧 项目文件说明

- `vercel.json` - Vercel 配置文件（已创建）
  - 配置了路由重写，确保 React Router 正常工作
  
- `vite.config.ts` - 已清理不需要的 API 配置

## ✅ 部署后验证

部署成功后，测试以下功能：
- ✅ 首页加载正常
- ✅ 产品页面显示三种口味
- ✅ 购物车功能正常
- ✅ 结账页面可以生成 WhatsApp 链接
- ✅ 路由跳转正常（/products, /about, /checkout）

## 🌐 自定义域名（可选）

在 Vercel 项目设置中：
1. 前往 Settings → Domains
2. 添加您的自定义域名
3. 按照 Vercel 的指引配置 DNS

## 📱 WhatsApp 订单号码

当前配置的 WhatsApp 号码是：**+60 17-899 3899**

如需修改，请编辑 `App.tsx` 第 515 行：
```typescript
const phoneNumber = "60178993899"; // 改为您的号码
```

## 🎨 项目特色

- 🧀 完全响应式设计
- 🎨 现代化 UI（使用 Tailwind CSS）
- 🛒 完整的购物车功能
- 📱 WhatsApp 直接下单
- ⚡ 超快加载速度（Vite）
- 🎭 流畅动画（Framer Motion）

## 需要帮助？

- Vercel 文档：https://vercel.com/docs
- 项目问题：检查浏览器控制台
- 部署问题：查看 Vercel 部署日志

---

**祝部署顺利！🎉**

