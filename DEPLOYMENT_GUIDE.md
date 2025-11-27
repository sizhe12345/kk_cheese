# KK Cheese 项目部署指南

## 🚀 推荐部署方案：GitHub + Vercel

### 为什么选择这个组合？
- ✅ **完全免费** - GitHub 和 Vercel 都提供免费套餐
- ✅ **自动部署** - 推送代码自动触发部署
- ✅ **全球 CDN** - Vercel 提供全球加速
- ✅ **HTTPS 支持** - 自动 SSL 证书
- ✅ **零配置** - 专为 React/Vite 优化

## 📋 部署步骤

### 第一步：准备 GitHub 仓库

1. **创建 GitHub 账户**（如果还没有）
   - 访问 [github.com](https://github.com)
   - 注册免费账户

2. **创建新仓库**
   ```bash
   # 仓库名建议：kkcheese-website
   # 设置为 Public（免费用户）
   # 不要初始化 README、.gitignore 或 LICENSE
   ```

3. **初始化本地 Git 仓库**
   ```bash
   # 在项目根目录执行
   git init
   git add .
   git commit -m "Initial commit: KK Cheese website"
   ```

4. **连接远程仓库并推送**
   ```bash
   # 替换 YOUR_USERNAME 为您的 GitHub 用户名
   git remote add origin https://github.com/YOUR_USERNAME/kkcheese-website.git
   git branch -M main
   git push -u origin main
   ```

### 第二步：设置 Vercel 部署

1. **创建 Vercel 账户**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账户登录（推荐）

2. **导入项目**
   - 点击 "New Project"
   - 选择您的 `kkcheese-website` 仓库
   - 点击 "Import"

3. **配置项目**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **部署**
   - 点击 "Deploy"
   - 等待构建完成（通常 1-2 分钟）

### 第三步：获取部署链接

部署成功后，您将获得：
- **生产链接**: `https://kkcheese-website.vercel.app`
- **预览链接**: 每次推送都会生成新的预览链接

## 🔧 项目配置文件

### vercel.json（已存在）
```json
{
    "buildCommand": "npm run build",
    "outputDirectory": "dist", 
    "framework": "vite",
    "rewrites": [{
        "source": "/(.*)",
        "destination": "/index.html"
    }]
}
```

### package.json 脚本（已存在）
```json
{
  "scripts": {
    "dev": "vite --host --port 3000",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## 🎯 自动部署流程

设置完成后，每次您：
1. 修改代码
2. 提交到 GitHub：`git push`
3. Vercel 自动检测变更并重新部署
4. 几分钟后新版本上线

## 🌐 自定义域名（可选）

如果您有自己的域名：
1. 在 Vercel 项目设置中添加域名
2. 在域名提供商处设置 DNS 记录
3. Vercel 自动配置 SSL 证书

## 📱 移动端优化

项目已包含：
- ✅ 响应式设计
- ✅ 移动端优化
- ✅ PWA 支持（favicon 等）
- ✅ 快速加载

## 🔍 部署后检查清单

- [ ] 网站能正常访问
- [ ] 所有页面路由正常工作
- [ ] 图片和视频正常加载
- [ ] 购物车功能正常
- [ ] WhatsApp 订单功能正常
- [ ] 移动端显示正常

## 🆘 常见问题

### 1. 路由 404 错误
确保 `vercel.json` 中有 rewrites 配置（已包含）

### 2. 图片不显示
检查图片路径是否以 `/` 开头（已正确配置）

### 3. 视频无法播放
确保视频文件已上传到 GitHub（已包含）

### 4. 构建失败
检查 `package.json` 中的依赖版本（已测试）

## 📞 技术支持

如果遇到问题：
1. 检查 Vercel 部署日志
2. 查看浏览器控制台错误
3. 确认所有文件已推送到 GitHub

---

**准备好开始部署了吗？让我知道您需要帮助的步骤！**
