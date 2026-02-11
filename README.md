# Next.js 用户管理系统

一个现代化的用户管理界面，使用 Next.js 14 和 Supabase 构建。

![User Management System](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Cloud-green?style=flat-square&logo=supabase)

## ✨ 功能特性

- ✅ 从 Supabase 云数据库实时查询用户数据
- ✅ 实时搜索和过滤用户（按姓名或邮箱）
- ✅ 添加新用户到数据库
- ✅ 响应式设计，完美支持桌面端和移动端
- ✅ 现代化深色主题 UI，流畅动画效果
- ✅ 数据中心美学设计风格

## 🛠 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **数据库**: Supabase (PostgreSQL)
- **样式**: CSS Modules
- **字体**: Outfit (标题) + JetBrains Mono (数据展示)

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- Supabase 账号和项目

### 1. 克隆仓库

```bash
git clone https://github.com/DavidXuanLuo/cloudDocuker.git
cd cloudDocuker/nextjs-users
```

### 2. 安装依赖

```bash
npm install
```

或使用 yarn:

```bash
yarn install
```

### 3. 配置环境变量

创建 `.env.local` 文件并添加你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase服务密钥
```

**获取 Supabase 配置信息：**

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 进入 Settings → API
4. 复制 `Project URL` 和 `service_role` key（用于绕过 RLS）

**⚠️ 重要提示：**
- 使用 `service_role` key 而不是 `anon` key，以确保可以正常读写数据
- 不要将 `.env.local` 文件提交到 Git（已在 .gitignore 中排除）

### 4. 配置数据库表

在 Supabase SQL Editor 中执行以下 SQL 创建 `user` 表：

```sql
-- 创建 user 表
CREATE TABLE IF NOT EXISTS public.user (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 Row Level Security
ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;

-- 创建允许所有操作的策略（开发环境）
CREATE POLICY "Allow all operations" ON public.user
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 插入测试数据（可选）
INSERT INTO public.user (name, email, address) VALUES
  ('张三', 'zhangsan@example.com', '北京市朝阳区'),
  ('李四', 'lisi@example.com', '上海市浦东新区');
```

### 5. 启动开发服务器

```bash
npm run dev
```

服务器启动后，访问 [http://localhost:3000](http://localhost:3000) 查看应用。

**如果端口 3000 被占用，Next.js 会自动使用下一个可用端口（如 3001）。**

## 📁 项目结构

```
nextjs-users/
├── app/
│   ├── layout.tsx              # 根布局组件
│   ├── page.tsx                # 首页（自动重定向到 /users）
│   └── users/
│       ├── page.tsx            # 用户列表页面主组件
│       └── users.module.css    # 用户页面样式
├── lib/
│   └── supabase.ts             # Supabase 客户端配置和类型定义
├── styles/
│   └── globals.css             # 全局样式和 CSS 变量
├── .env.local                  # 环境变量（不提交到 Git）
├── .gitignore                  # Git 忽略文件配置
├── next.config.js              # Next.js 配置
├── package.json                # 项目依赖和脚本
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 项目文档
```

## 📖 使用说明

### 查看用户列表

应用启动后会自动显示数据库中的所有用户，包括：
- ID
- 姓名
- 邮箱
- 地址
- 创建时间

### 搜索用户

在左侧搜索框中输入关键词，系统会实时过滤匹配的用户（支持按姓名或邮箱搜索）。

### 添加新用户

1. 点击左侧的 **"添加新用户"** 按钮
2. 在弹出的表单中填写用户信息：
   - **姓名**（必填）
   - **邮箱**（必填）
   - **地址**（可选）
3. 点击 **"创建用户"** 按钮
4. 新用户会立即显示在列表中

### 统计信息

左侧边栏显示实时统计：
- 总用户数
- 当前搜索结果数量

## 🎨 设计特点

### 视觉风格

- **深色主题**: 深海军蓝背景 (`#0a0e1a`)
- **强调色**: 电光青 (`#00d9ff`) 和琥珀黄 (`#ffb800`)
- **网格背景**: 微妙的网格纹理增加科技感
- **渐变效果**: 标题和按钮使用渐变色
- **等宽字体**: 数据展示使用 JetBrains Mono 字体

### 交互动画

- 页面加载时的淡入动画
- 表格行的交错显示效果（staggered animation）
- 悬停时的平滑过渡和位移效果
- 模态框的缩放动画
- 按钮的阴影和提升效果

### 响应式设计

- **桌面端** (>1024px): 侧边栏 + 主内容区域的双栏布局
- **平板端** (768px-1024px): 单栏布局，侧边栏移到下方
- **移动端** (<768px): 优化的触摸交互和字体大小

## 🗄️ 数据库结构

Supabase `user` 表字段：

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| `id` | SERIAL | 用户ID | PRIMARY KEY |
| `name` | TEXT | 用户姓名 | - |
| `email` | TEXT | 用户邮箱 | - |
| `address` | TEXT | 用户地址 | - |
| `created_at` | TIMESTAMP | 创建时间 | DEFAULT NOW() |

## 🏗️ 构建生产版本

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

构建后的文件会输出到 `.next` 目录。

## 🔒 安全注意事项

- ⚠️ 当前使用 `service_role` key 绕过 RLS，适合开发和测试
- 🔐 生产环境建议实现用户认证（Supabase Auth）
- 🛡️ 配置更严格的 RLS 策略，限制数据访问权限
- 🔑 不要在客户端代码中暴露 `service_role` key
- 📝 用户密码应该使用哈希算法（如 bcrypt）加密存储

## 🐛 常见问题

### 1. 无法连接到 Supabase

**问题**: 页面显示连接错误或 401/403 错误

**解决方案**:
- 检查 `.env.local` 文件是否正确配置
- 确认使用的是 `service_role` key 而不是 `anon` key
- 验证 Supabase 项目 URL 是否正确
- 重启开发服务器以加载新的环境变量

### 2. 表不存在错误

**问题**: 提示找不到 `user` 表

**解决方案**:
- 在 Supabase SQL Editor 中执行建表 SQL
- 确认表名是 `user`（单数）而不是 `users`
- 检查表是否在 `public` schema 中

### 3. RLS 策略阻止访问

**问题**: 查询或插入数据时返回权限错误

**解决方案**:
- 确保已启用 RLS 并创建了允许访问的策略
- 使用 `service_role` key 可以绕过 RLS 限制
- 或者在开发环境中临时禁用 RLS：
  ```sql
  ALTER TABLE public.user DISABLE ROW LEVEL SECURITY;
  ```

### 4. 端口被占用

**问题**: 3000 端口已被其他应用使用

**解决方案**:
- Next.js 会自动尝试下一个可用端口（3001, 3002...）
- 或手动指定端口：`PORT=3001 npm run dev`

## 📝 开发日志

- **2026-02-11**: 初始版本发布
  - 实现用户列表、搜索、新增功能
  - 设计现代化深色主题 UI
  - 集成 Supabase 数据库
  - 修复 RLS 权限问题

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT License

---

**开发者**: DavidXuanLuo
**仓库**: [cloudDocuker](https://github.com/DavidXuanLuo/cloudDocuker)
