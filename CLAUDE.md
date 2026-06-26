# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 环境要求

本项目需要 Node.js 18+。用户的机器通过 nvm 安装了 Node v14 和 v24。在工作时，请始终使用 v24 路径作为命令前缀：

```bash
export PATH="/d/dev_script/nvm/v24.12.0:$PATH"
```

或在操作前指示用户运行 `nvm use 24.12.0`。

## 命令

```bash
npm run dev          # 启动开发服务器，地址 http://localhost:3000
npm run build        # 生产环境构建
npm start            # 启动生产服务器
npm run lint         # 运行 ESLint
```

目前暂无测试。

## 架构

**框架：** Next.js 14 + App Router（文件系统路由）。所有页面都是客户端渲染（`"use client"`），因为它们依赖语言上下文。

**数据流：** `src/data/` 中的 JSON 文件 → `src/lib/cars.ts` 中的工具函数 → 页面/组件导入。

**i18n（国际化）：** 自定义 React Context（`src/context/LanguageContext.tsx`）。未使用第三方 i18n 库。每个渲染用户可见文本的组件都导入 `useLang()`，并将文本包装在 `t("key")` 中。翻译键存储在扁平的 `Record<Lang, Record<string, string>>` 对象中，包含 `en` 和 `zh` 条目。添加新键需要同时添加到两个语言对象中。

**服务端/客户端拆分：** `src/app/layout.tsx` 是服务端组件（设置元数据、加载字体）。它将子组件包装在 `LanguageProvider` → `LayoutWrapper` 中。`LayoutWrapper` 是客户端桥接组件——它调用 `useLang()` 以便 `Navbar`/`Footer` 访问翻译。`src/` 下的所有页面和组件文件都是 `"use client"`。

**样式：** Tailwind CSS 3，自定义主题色：`navy-{700,800,900}`（品牌蓝），`gold-{400,500,600}`（强调色）。`globals.css` 中的工具类：`btn-primary`、`btn-secondary`、`container-custom`、`section-padding`、`card`。字体：Montserrat（标题）+ Inter（正文），通过 Google Fonts 加载。

**数据格式（cars.json）：** 对象数组，键包括：`slug`（URL 标识符，必须唯一）、`brand`、`model`、`year`、`mileage`、`price`、`currency`、`images`（字符串数组）、`condition`（多行文本）、`specs`（对象：engine/transmission/drivetrain/fuelType/color/seats/vin）、`featured`（布尔值——控制是否在首页横幅展示）、`status`（available/sold/pending）。

## 关键模式

- **添加新页面：** 在 `src/app/` 下创建文件夹 + `page.tsx`。将翻译键添加到 `LanguageContext.tsx`。在页面中导入 `useLang`。
- **添加车辆：** 将对象追加到 `src/data/cars.json`。确保 `slug` 唯一。
- **修改文本：** 编辑 `src/context/LanguageContext.tsx` 中的翻译字典——而不是 `src/messages/` 中旧的 JSON 文件（那些已不再使用）。
- **导航栏链接：** 编辑 `src/components/Navbar.tsx` 中的 `navLinks` 数组。
用户是个网站部署的初学者，他请你以后完成任务的时候多点说明和教学性质的介绍