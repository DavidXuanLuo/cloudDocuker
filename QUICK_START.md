# 快速启动指南

## 一键启动（5分钟）

### 步骤 1: 克隆并安装

```bash
git clone https://github.com/DavidXuanLuo/cloudDocuker.git
cd cloudDocuker/nextjs-users
npm install
```

### 步骤 2: 配置 Supabase

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 创建新项目或选择现有项目
3. 进入 **Settings → API**
4. 复制以下信息：
   - `Project URL`
   - `service_role` secret key

### 步骤 3: 创建环境变量

在 `nextjs-users` 目录下创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的service_role密钥
```

### 步骤 4: 创建数据库表

在 Supabase SQL Editor 中执行：

```sql
CREATE TABLE IF NOT EXISTS public.user (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON public.user
  FOR ALL USING (true) WITH CHECK (true);
```

### 步骤 5: 启动应用

```bash
npm run dev
```

打开浏览器访问: http://localhost:3000

---

## 验证安装

启动成功后，你应该看到：

✅ 用户管理系统界面
✅ 左侧搜索框和统计卡片
✅ 右侧用户列表表格
✅ "添加新用户" 按钮可点击

## 测试功能

1. **查看列表**: 页面加载后自动显示所有用户
2. **搜索用户**: 在搜索框输入关键词测试过滤
3. **添加用户**: 点击按钮，填写表单，提交测试

## 遇到问题？

### 无法连接数据库
- 检查 `.env.local` 配置是否正确
- 确认使用的是 `service_role` key
- 重启开发服务器

### 表不存在
- 确认已在 Supabase 中执行建表 SQL
- 表名必须是 `user`（单数）

### 权限错误
- 确认 RLS 策略已创建
- 使用 `service_role` key 可绕过 RLS

---

## 下一步

- 📖 查看完整文档: [README.md](./README.md)
- 🎨 自定义主题颜色: `styles/globals.css`
- 🔧 修改表字段: `lib/supabase.ts`
- 🚀 部署到 Vercel: `vercel deploy`

**祝你使用愉快！** 🎉
