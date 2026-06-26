# 二手车出口外贸网站 — Shandong Jiefang Used Car Export

面向海外车商的 B2B 二手车出口展示平台。支持中英文双语切换。

🌐 在线预览：http://localhost:3000（本地运行后）

## 技术栈

- **框架：** Next.js 14 (App Router) + TypeScript
- **样式：** Tailwind CSS 3
- **数据：** JSON 文件驱动
- **多语言：** 自定义 React Context（中/英）

## 快速启动

```bash
# 1. 确保 Node.js 版本 ≥ 18
nvm use 24.12.0

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问
# http://localhost:3000
```

## 页面结构

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Banner 轮播 + 三大优势 + 历史成交价 + CTA |
| `/cars` | 特价车源列表 | 卡片网格 + 筛选排序 |
| `/cars/[slug]` | 车辆详情 | 图片画廊 + 参数表 + 车况 + 询盘 |
| `/about` | 关于我们 | 公司介绍 + 5步服务流程 + 企业资质 |
| `/contact` | 联系我们 | 联系方式 + 在线留言表单 |
| `/history` | 历史成交价参考 | 年份Tab + 价格表格 |
| `/auth/login` | 登录 | 邮箱密码登录（前端版） |
| `/auth/register` | 注册 | 经销商账户注册（前端版） |
| `/dashboard` | 会员中心 | 收藏 + 询盘记录 |

## 项目结构

```
src/
├── app/              # 页面路由（Next.js App Router）
│   ├── layout.tsx    # 根布局（Provider + Google Fonts）
│   ├── page.tsx      # 首页
│   ├── globals.css   # 全局样式
│   ├── cars/         # 车辆列表 + 详情
│   ├── about/        # 公司介绍
│   ├── contact/      # 联系我们
│   ├── history/      # 历史价格
│   ├── auth/         # 登录/注册
│   └── dashboard/    # 会员中心
├── components/       # 11个可复用 UI 组件
├── context/          # 多语言 Context（LanguageProvider + useLang）
├── lib/              # 数据工具库（cars.ts）
├── data/             # JSON 数据文件
│   ├── cars.json     # 车辆数据
│   └── history-prices.json  # 历史价格数据
└── messages/         # 预留翻译文件（暂未使用）
```

## 数据维护

### 添加新车
编辑 `src/data/cars.json`，复制一条记录，修改字段后保存即可（自动热更新）。

### 修改文字
编辑 `src/context/LanguageContext.tsx`，在 `en` 和 `zh` 两个对象中同步修改。

### 添加新页面
在 `src/app/` 下新建文件夹和 `page.tsx`，在 LanguageContext 中添加翻译 key。

## 联系方式

- 📧 shandongjiefang@163.com
- 📍 中国山东省泰安市东平县阿里巴巴跨境电商产业园

## License

Private — All rights reserved.
