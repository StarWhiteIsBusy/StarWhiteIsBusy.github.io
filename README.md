# StarWhite Portfolio ✦

我的个人 GitHub 主页，展示开源作品和 Nyxuri 社区贡献。

## 🚀 部署到 GitHub Pages

### 方式一：直接部署（最简单）

1. 在 GitHub 上创建仓库 `StarWhiteIsBusy.github.io`（或任意名称）
2. 将本目录下的所有文件推送到 `main` 分支
3. 进入仓库 **Settings → Pages**
4. Source 选择 **Deploy from a branch** → `main` → `/ (root)`
5. 点击 Save，等待几分钟即可通过 `https://starwhiteisbusy.github.io` 访问

### 方式二：使用 Git 命令

```bash
cd starwhite-portfolio
git init
git add .
git commit -m "🚀 Initial portfolio site"
git branch -M main
git remote add origin https://github.com/StarWhiteIsBusy/StarWhiteIsBusy.github.io.git
git push -u origin main
```

## 📁 文件结构

```
starwhite-portfolio/
├── index.html    # 主页面
├── style.css     # 样式（含深色/浅色主题）
├── script.js     # 交互逻辑（主题切换、滚动动画、粒子背景）
└── README.md     # 本文件
```

## ✨ 特性

- **零依赖** — 纯原生 HTML/CSS/JS，无需构建步骤
- **深色/浅色模式** — 自动跟随系统偏好，支持手动切换，偏好存储在 localStorage
- **响应式设计** — 完美适配桌面、平板和手机
- **滚动动画** — 使用 IntersectionObserver 实现高性能渐入效果
- **粒子背景** — Canvas 星空粒子，根据主题自动调色
- **导航高亮** — 滚动时自动高亮当前区域的导航链接
- **代码窗口** — 仿终端风格的语法高亮代码预览

## 🎨 自定义

编辑 `style.css` 顶部的 CSS 变量即可修改配色：

```css
:root {
  --accent: #a78bfa;  /* 修改主题色 */
}
```
