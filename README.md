# Next.js 用户管理系统

一个现代化的用户管理界面，使用 Next.js 14 和 Supabase 构建。

## 功能特性

- ✅ 从 Supabase 云数据库查询用户数据
- ✅ 实时搜索和过滤用户
- ✅ 添加新用户到数据库
- ✅ 响应式设计，支持移动端
- ✅ 现代化 UI，带有流畅动画效果
- ✅ 深色主题，数据中心美学

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **数据库**: Supabase
- **样式**: CSS Modules
- **字体**: Outfit (标题) + JetBrains Mono (数据)

## 快速开始

### 1. 安装依赖

```bash
cd nextjs-users
npm install
```

### 2. 配置环境变量

环境变量已经在 `.env.local` 文件中配置好了：

```
NEXT_PUBLIC_SUPABASE_URL=https://pnygcclrlhlputgyvbxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
nextjs-users/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页（重定向到 /users）
│   └── users/
│       ├── page.tsx        # 用户列表页面
│       └── users.module.css # 页面样式
├── lib/
│   └── supabase.ts         # Supabase 客户端配置
├── styles/
│   └── globals.css         # 全局样式
├── .env.local              # 环境变量
├── next.config.js          # Next.js 配置
├── package.json            # 项目依赖
└── tsconfig.json           # TypeScript 配置
```

## 使用说明

### 查看用户列表

打开应用后，会自动显示数据库中的所有用户。

### 搜索用户

在左侧搜索框中输入用户名或邮箱进行实时搜索。

### 添加新用户

1. 点击左侧的"添加新用户"按钮
2. 在弹出的表单中填写用户信息：
   - 用户名
   - 邮箱
   - 密码
3. 点击"创建用户"按钮
4. 新用户会立即显示在列表中

## 设计特点

### 视觉风格

- **深色主题**: 深海军蓝背景 (#0a0e1a)
- **强调色**: 电光青 (#00d9ff) 和琥珀黄 (#ffb800)
- **网格背景**: 微妙的网格纹理增加科技感
- **渐变效果**: 标题和按钮使用渐变色

### 交互动画

- 页面加载时的淡入动画
- 表格行的交错显示效果
- 悬停时的平滑过渡
- 模态框的缩放动画

### 响应式设计

- 桌面端：侧边栏 + 主内容区域的双栏布局
- 平板端：单栏布局，侧边栏移到下方
- 移动端：优化的触摸交互和字体大小

## 数据库要求

确保 Supabase 中的 `user` 表包含以下字段：

- `id` (int, primary key)
- `username` (text)
- `email` (text)
- `password` (text)
- `created_at` (timestamp)

## 构建生产版本

```bash
npm run build
npm start
```

## 注意事项

- 确保 Supabase 项目的 RLS (Row Level Security) 策略允许匿名访问
- 生产环境中应该使用更安全的认证方式
- 密码应该在存储前进行哈希处理

## License

MIT
