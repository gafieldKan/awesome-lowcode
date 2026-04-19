# Awesome Lowcode - 低代码平台

一个基于 React + Vite + Ant Design 的低代码开发平台。

## 功能特性

- 拖拽式页面构建
- 丰富的组件库（输入框、按钮、表格、卡片等）
- 组件属性编辑
- 组件树管理
- JSON Schema 导出
- 本地持久化存储
- 数据模型设计器
- 自动表单生成
- CRUD 操作钩子
- 工作流编排

## 技术栈

- **构建工具**: Vite 8
- **框架**: React 19
- **UI 库**: Ant Design 6
- **状态管理**: Zustand
- **路由**: React Router 7

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
awesome-lowcode/
├── src/                    # 应用入口
│   ├── main.jsx           # React 入口
│   ├── App.jsx            # 主应用组件
│   └── index.css          # 全局样式
├── lowcode/
│   ├── components/        # 组件库
│   │   ├── DragDropEditor # 拖拽编辑器
│   │   │   ├── index.jsx
│   │   │   ├── ComponentPalette.jsx
│   │   │   ├── Canvas.jsx
│   │   │   ├── DraggableComponent.jsx
│   │   │   ├── PropertiesPanel.jsx
│   │   │   └── ComponentTree.jsx
│   │   ├── ModelDesigner  # 模型设计器
│   │   │   ├── index.jsx
│   │   │   ├── SchemaEditor.jsx
│   │   │   └── AutoFormGenerator.jsx
│   │   ├── WorkflowDesigner # 工作流设计器
│   │   │   ├── index.jsx
│   │   │   └── styles.css
│   │   └── DataSourceConfig # 数据源配置
│   ├── store/             # 状态管理
│   │   ├── editorStore.js # 编辑器状态
│   │   ├── modelStore.js  # 模型状态
│   │   └── workflowStore.js # 工作流状态
│   ├── server/            # 服务端代码
│   │   ├── models.js      # 数据模型定义
│   │   └── crudWithHooks.js # CRUD 操作
│   └── utils/             # 工具函数
│       └── schemaGenerator.js
└── package.json
```

## 功能模块

### 1. DragDropEditor (拖拽编辑器)
- **ComponentPalette**: 组件面板，提供可拖拽的组件列表
- **Canvas**: 画布区域，用于放置组件
- **PropertiesPanel**: 属性面板，编辑选中组件的属性
- **ComponentTree**: 组件树，展示页面组件结构

### 2. ModelDesigner (模型设计器)
- **SchemaEditor**: 数据模型设计，添加/编辑/删除字段
- **AutoFormGenerator**: 根据模型自动生成表单
- **useCRUD Hook**: React 风格的 CRUD 操作钩子

### 3. WorkflowDesigner (工作流设计器)
- **触发器**: 手动、定时、Webhook、数据变更等触发方式
- **操作**: 创建/更新/删除数据、发送邮件、HTTP 请求、执行脚本等
- **可视化编排**: 直观的工作流编辑和执行

### 4. CRUD Operations (CRUD 操作)
- 支持 before/after 钩子
- 支持过滤、排序、分页
- 支持时间戳自动管理

## 页面路径

- **首页**: `/` - 平台介绍
- **表单设计器**: `/editor` - 拖拽式页面构建
- **模型设计器**: `/models` - 数据模型和表单生成
- **工作流**: `/workflow` - 工作流编排

## 开发进度

- [x] 项目基础架构搭建
- [x] 拖拽编辑器核心功能
- [x] 组件属性编辑
- [x] 状态管理和持久化
- [x] 模型设计器
- [x] 自动表单生成
- [x] CRUD API 集成
- [x] 工作流设计器
- [ ] 数据源绑定
- [ ] 表达式编辑器

## License

ISC
