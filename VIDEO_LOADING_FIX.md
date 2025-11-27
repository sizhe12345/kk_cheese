# 视频加载问题修复

## 问题描述
视频文件无法加载，浏览器控制台显示错误：
```
GET http://localhost:3000/images/ads1.mp4 net::ERR_BLOCKED_BY_CLIENT
```

## 问题原因
`ERR_BLOCKED_BY_CLIENT` 错误通常由以下原因造成：

1. **广告拦截器拦截** - 文件名包含 "ads" 被浏览器扩展识别为广告内容
2. **MIME 类型问题** - 服务器未正确设置视频文件类型
3. **文件权限问题** - 文件访问权限不正确

## 解决方案

### 1. 重命名视频文件
将包含 "ads" 的文件名重命名为中性名称：

```bash
ads1.mp4 → video1.mp4
ads2.mp4 → video2.mp4  
ads3.mp4 → video3.mp4
ads4.mp4 → video4.mp4
```

### 2. 更新代码中的文件路径
在 `App.tsx` 中更新视频数据：

```typescript
// 修改前
video: "/images/ads1.mp4"

// 修改后  
video: "/images/video1.mp4"
```

## 执行的修改

### 文件重命名
```powershell
cd images
Rename-Item "ads1.mp4" "video1.mp4"
Rename-Item "ads2.mp4" "video2.mp4" 
Rename-Item "ads3.mp4" "video3.mp4"
Rename-Item "ads4.mp4" "video4.mp4"
```

### 代码更新
更新了 `App.tsx` 中视频数据数组的 `video` 属性路径。

## 预防措施

### 避免使用的文件名关键词
- ads, advertisement, banner
- popup, modal (某些情况下)
- tracking, analytics
- promo, promotion

### 推荐的文件名模式
- video1.mp4, video2.mp4
- content1.mp4, content2.mp4  
- media1.mp4, media2.mp4
- demo1.mp4, demo2.mp4

## 验证修复
1. 检查浏览器控制台是否还有 `ERR_BLOCKED_BY_CLIENT` 错误
2. 确认视频缩略图正常显示
3. 测试视频点击播放功能
4. 在不同浏览器中测试（Chrome, Firefox, Safari）

## 其他可能的解决方案
如果重命名后仍有问题：

1. **检查广告拦截器设置** - 临时禁用或添加网站到白名单
2. **验证 MIME 类型** - 确保服务器正确设置 video/mp4 类型
3. **检查文件完整性** - 确认视频文件未损坏
4. **测试其他格式** - 尝试 .webm 或 .ogg 格式
