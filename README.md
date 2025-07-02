# JWordCards - 轻量级日语单词学习工具

一个跨平台（macOS/Windows/Linux）桌面应用，以悬浮卡片形式展示日语单词，支持学习/复习功能，提供简洁优雅的用户体验。

## 功能特性

### 🎴 核心交互

- **悬浮卡片**: 固定位置显示（默认右下角，可拖动）
- **翻转效果**: 点击卡片查看中文释义和例句
- **快捷导航**: 左右箭头按钮或键盘方向键翻页
- **窗口调整**: 支持自由调整窗口大小，完美响应式布局

### 🔊 学习功能

- **语音朗读**: 支持日语单词发音（Web Speech API）
- **收藏系统**: 收藏重要单词，支持收藏模式学习
- **学习模式**: 全部单词 / 仅收藏单词
- **进度记忆**: 自动保存学习进度和当前位置

### 🎨 界面设计

- **主题切换**: 浅色/深色模式，完美适配系统主题
- **响应式设计**: 支持多种窗口尺寸，自适应布局
- **流畅动画**: 3D 翻转和淡入淡出效果
- **日文字体**: 使用 Noto Sans JP 优化显示
- **现代UI**: 圆角设计，透明背景，视觉效果精致

### 💾 数据管理

- **本地存储**: 收藏数据和学习进度持久化
- **内置词库**: 9999+基础日语单词
- **窗口记忆**: 自动保存窗口位置和大小
- **设置同步**: 主题、模式等设置自动保存

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

#### 🚀 一键全平台打包

```bash
# 构建所有平台安装包（推荐）
npm run dist:all
```

#### 📦 单平台打包

```bash
# macOS 安装包 (.dmg)
npm run dist:mac

# Windows 安装包 (.exe + portable)
npm run dist:win

# Linux 安装包 (.AppImage, .deb, .rpm)
npm run dist:linux

# 当前平台安装包
npm run dist
```

#### 📁 输出文件

打包完成后，安装包将生成在 `dist/` 目录下：

- **macOS**: 
  - Intel: `JWordCards-1.0.0.dmg`
  - Apple Silicon: `JWordCards-1.0.0-arm64.dmg`
- **Windows**: 
  - 安装版: `JWordCards Setup 1.0.0.exe`
  - 便携版: `JWordCards 1.0.0.exe`
- **Linux**: 
  - AppImage: `JWordCards-1.0.0.AppImage` ✅
  - Debian/Ubuntu: `jwordcards_1.0.0_amd64.deb` (需要额外配置)
  - RedHat/CentOS: `jwordcards-1.0.0.x86_64.rpm` (需要额外配置)

> **注意**: Linux 的 deb 和 rpm 包需要额外的系统配置才能正常构建，但 AppImage 格式可以在所有 Linux 发行版上运行。

## 🚀 部署和发布

### 系统要求

- **macOS**: 10.14+ (支持 Intel 和 Apple Silicon)
- **Windows**: Windows 10+ (64位)
- **Linux**: Ubuntu 18.04+, CentOS 7+, 或其他现代发行版

### 安装说明

#### macOS
1. 下载 `.dmg` 文件
2. 双击打开，将应用拖拽到 Applications 文件夹
3. 首次运行可能需要在「系统偏好设置 > 安全性与隐私」中允许

#### Windows
1. **安装版**: 下载 `JWordCards Setup 1.0.0.exe`，双击安装
2. **便携版**: 下载 `JWordCards 1.0.0.exe`，直接运行无需安装

#### Linux
1. **AppImage** (推荐): 
   ```bash
   chmod +x JWordCards-1.0.0.AppImage
   ./JWordCards-1.0.0.AppImage
   ```
2. **Debian/Ubuntu**: `sudo dpkg -i jwordcards_1.0.0_amd64.deb` (如果可用)
3. **RedHat/CentOS**: `sudo rpm -i jwordcards-1.0.0.x86_64.rpm` (如果可用)

### 构建环境

推荐在以下环境中进行跨平台构建：

- **Node.js**: 18.x 或更高版本
- **npm**: 9.x 或更高版本
- **操作系统**: macOS（推荐，可构建所有平台）

> **注意**: 在 macOS 上可以构建所有平台的安装包，Windows 和 Linux 上只能构建对应平台的安装包。

### 打包状态

✅ **已完成**:
- macOS (Intel + Apple Silicon) - DMG 安装包
- Windows (安装版 + 便携版) - EXE 文件
- Linux AppImage - 通用可执行文件

⚠️ **部分支持**:
- Linux deb/rpm 包需要额外的构建环境配置

### 使用建议

- **macOS 用户**: 下载对应架构的 DMG 文件
- **Windows 用户**: 推荐使用安装版，便携版适合临时使用
- **Linux 用户**: 推荐使用 AppImage，兼容性最好

## 使用说明

### 基本操作

- **翻页**: 点击左右箭头按钮或使用键盘 ← → 键
- **翻转卡片**: 点击卡片中央查看释义
- **语音朗读**: 点击喇叭图标朗读当前单词
- **收藏**: 点击心形图标收藏/取消收藏单词
- **窗口调整**: 拖拽窗口边缘调整大小，支持 280×180 到 800×600 范围

### 模式切换

- **主题**: 点击右上角太阳/月亮图标切换浅色/深色模式
- **收藏模式**: 点击左上角数字显示区域切换全部/收藏单词显示

### 窗口管理

- **拖动**: 点击卡片区域拖动窗口到任意位置
- **调整大小**: 拖拽窗口边缘自由调整尺寸
- **自动保存**: 窗口位置和大小会自动保存，重启后恢复
- **响应式**: 界面元素会根据窗口大小自动调整

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
