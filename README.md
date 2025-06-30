# JWordCards - 轻量级日语单词学习工具

一个跨平台（macOS/Windows）桌面应用，以悬浮卡片形式展示日语单词，支持学习/复习功能，提供简洁优雅的用户体验。

## 功能特性

### 🎴 核心交互

- **悬浮卡片**: 固定位置显示（默认右下角，可拖动）
- **翻转效果**: 点击卡片查看中文释义和例句
- **快捷导航**: 左右箭头按钮或键盘方向键翻页

### 🔊 学习功能

- **语音朗读**: 支持日语单词发音（Web Speech API）
- **收藏系统**: 收藏重要单词，支持收藏模式学习
- **学习模式**: 全部单词 / 仅收藏单词

### 🎨 界面设计

- **主题切换**: 浅色/深色模式
- **磨砂玻璃**: 现代化视觉效果
- **流畅动画**: 3D 翻转和淡入淡出效果
- **日文字体**: 使用 Noto Sans JP 优化显示

### 💾 数据管理

- **本地存储**: 收藏数据和学习进度持久化
- **内置词库**: 500+基础日语单词
- **窗口记忆**: 自动保存窗口位置

## 技术栈

- **框架**: Electron + React + Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **语音**: Web Speech API
- **存储**: Electron Store

## 安装和运行

### 开发环境

1. **克隆项目**

```bash
git clone <repository-url>
cd JWordsCard
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器**

```bash
npm run dev
```

### 生产构建

1. **构建应用**

```bash
npm run build
```

2. **打包桌面应用**

```bash
npm run dist
```

## 使用说明

### 基本操作

- **翻页**: 点击左右箭头按钮或使用键盘 ← → 键
- **翻转卡片**: 点击卡片中央查看释义
- **语音朗读**: 点击喇叭图标朗读当前单词
- **收藏**: 点击心形图标收藏/取消收藏单词

### 模式切换

- **主题**: 点击右上角太阳/月亮图标切换浅色/深色模式
- **收藏模式**: 点击左上角星形图标切换全部/收藏单词显示

### 快捷键

- `←` / `→`: 上一个/下一个单词
- `Space`: 翻转卡片
- `Esc`: 退出应用（可自定义）

## 项目结构

```
/src
├── main/                 # Electron主进程
│   └── main.js          # 主进程入口
├── renderer/            # React渲染进程
│   ├── components/      # React组件
│   │   ├── Card.jsx     # 单词卡片组件
│   │   └── ThemeToggle.jsx # 主题切换组件
│   ├── hooks/           # 自定义Hooks
│   │   ├── useTTS.js    # 语音朗读Hook
│   │   ├── useWordBank.js # 单词管理Hook
│   │   └── useTheme.js  # 主题管理Hook
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # React入口
│   └── index.css        # 样式文件
└── data/
    └── words.json       # 单词库数据
```

## 数据格式

### 单词数据结构

```json
{
  "id": "unique_hash",
  "word": "こんにちは",
  "pronunciation": {
    "romaji": "konnichiwa",
    "katakana": "コンニチハ"
  },
  "meaning": "你好（日间问候）",
  "example": "こんにちは、元気ですか？",
  "bookmarked": false
}
```

## 自定义配置

### 添加新单词

编辑 `src/data/words.json` 文件，按照数据格式添加新的单词条目。

### 修改窗口大小

在 `src/main/main.js` 中修改 `createWindow` 函数的窗口尺寸参数。

### 自定义主题色彩

在 `tailwind.config.js` 中修改 `theme.extend.colors` 配置。

## 开发计划

- [ ] 支持 CSV 格式单词库导入
- [ ] 添加学习统计和进度追踪
- [ ] 支持自定义快捷键
- [ ] 添加单词搜索功能
- [ ] 支持多语言界面
- [ ] 云端同步学习数据

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

**注意**: 首次运行时，macOS 可能会提示安全警告，请在系统偏好设置 > 安全性与隐私中允许应用运行。
