# 📚 JWordCards 用户手册

> 轻量级日语单词学习工具 - 完整使用指南

## 🎯 软件简介

JWordCards 是一个跨平台桌面应用，以悬浮卡片形式展示日语单词，支持语音朗读、收藏系统和学习进度记忆，提供简洁优雅的学习体验。

### ✨ 核心特性
- 🎴 **悬浮卡片**: 固定位置显示，支持拖动和调整大小
- 📖 **一体化显示**: 同时展示日语单词、发音、中文释义和例句
- 🔊 **语音朗读**: 日语单词发音支持
- ❤️ **收藏系统**: 重要单词收藏和专项学习
- 🌙 **主题切换**: 浅色/深色模式
- 💾 **进度记忆**: 自动保存学习位置和设置

---

## 🖥️ 系统兼容性检查

### 第一步：确认您的操作系统

#### <img src="docs/icons/windows-icon.svg" width="20" height="20" style="vertical-align: middle;"> Windows 用户

**快速检查方法：**
1. 按 `Win + I` 打开设置
2. 点击「系统」→「关于」
3. 查看 Windows 版本和系统类型

| 要求 | 说明 |
|------|------|
| 版本 | Windows 10 (1903+) 或 Windows 11 |
| 架构 | 64位 (x64) |
| 状态 | <img src="docs/icons/check-icon.svg" width="16" height="16"> 完全支持 |

**推荐安装包：**
- 🎯 **安装版**：`JWordCards Setup 1.0.0.exe` (推荐)
- 📦 **便携版**：`JWordCards 1.0.0.exe` (无需安装)

#### <img src="docs/icons/macos-icon.svg" width="20" height="20" style="vertical-align: middle;"> macOS 用户

**快速检查方法：**
1. 点击左上角 🍎 苹果菜单
2. 选择「关于本机」
3. 查看 macOS 版本和处理器信息

| 处理器类型 | 推荐安装包 | 状态 |
|-----------|-----------|------|
| Intel (i3/i5/i7/i9) | `JWordCards-1.0.0.dmg` | <img src="docs/icons/check-icon.svg" width="16" height="16"> |
| Apple Silicon (M1/M2/M3) | `JWordCards-1.0.0-arm64.dmg` | <img src="docs/icons/check-icon.svg" width="16" height="16"> |

**最低要求：** macOS 10.14 (Mojave) 或更高版本

---

## 📥 安装指南

### <img src="docs/icons/windows-icon.svg" width="20" height="20" style="vertical-align: middle;"> Windows 安装

#### 方式一：安装版 (推荐)
1. 下载 `JWordCards Setup 1.0.0.exe`
2. 双击运行安装程序
3. 按照向导完成安装
4. 从开始菜单或桌面快捷方式启动

#### 方式二：便携版
1. 下载 `JWordCards 1.0.0.exe`
2. 放置到任意文件夹
3. 双击直接运行，无需安装

### <img src="docs/icons/macos-icon.svg" width="20" height="20" style="vertical-align: middle;"> macOS 安装

1. 下载对应架构的 `.dmg` 文件
2. 双击打开 DMG 文件
3. 将 JWordCards 拖拽到 Applications 文件夹
4. 从启动台或应用程序文件夹启动

**首次运行提示：**
- 如遇安全警告，前往「系统偏好设置」→「安全性与隐私」→「通用」
- 点击「仍要打开」允许应用运行

### 🔍 快速系统检测脚本

#### Windows PowerShell
```powershell
# 系统信息检测脚本
$osInfo = Get-WmiObject -Class Win32_OperatingSystem
$computerInfo = Get-WmiObject -Class Win32_ComputerSystem

Write-Host "=== JWordCards 系统兼容性检测 ===" -ForegroundColor Green
Write-Host "操作系统: $($osInfo.Caption)" -ForegroundColor Yellow
Write-Host "版本: $($osInfo.Version)" -ForegroundColor Yellow
Write-Host "架构: $($osInfo.OSArchitecture)" -ForegroundColor Yellow
Write-Host "总内存: $([math]::Round($computerInfo.TotalPhysicalMemory/1GB, 2)) GB" -ForegroundColor Yellow

# 兼容性检查
if ($osInfo.Version -ge "10.0") {
    Write-Host "✅ 系统兼容" -ForegroundColor Green
    Write-Host "推荐下载: JWordCards Setup 1.0.0.exe" -ForegroundColor Cyan
} else {
    Write-Host "❌ 系统版本过低，需要 Windows 10 或更高版本" -ForegroundColor Red
}
```

#### macOS Terminal
```bash
#!/bin/bash
# 系统信息检测脚本

echo "=== JWordCards 系统兼容性检测 ==="
echo "操作系统: $(sw_vers -productName)"
echo "版本: $(sw_vers -productVersion)"
echo "架构: $(uname -m)"
echo "总内存: $(sysctl -n hw.memsize | awk '{print $1/1024/1024/1024 " GB"}')"

# 兼容性检查
version=$(sw_vers -productVersion | cut -d. -f1,2)
if (( $(echo "$version >= 10.15" | bc -l) )); then
    echo "✅ 系统兼容"
    if [[ $(uname -m) == "arm64" ]]; then
        echo "推荐下载: JWordCards-1.0.0-arm64.dmg (Apple Silicon)"
    else
        echo "推荐下载: JWordCards-1.0.0.dmg (Intel)"
    fi
else
    echo "❌ 系统版本过低，需要 macOS 10.15 或更高版本"
fi
```

---

## 🎮 使用指南

### 界面布局

```
┌─────────────────────────────────┐
│  [1/9999] 📚              🌙    │  ← 进度指示器 & 主题切换
├─────────────────────────────────┤
│                                 │
│         こんにちは              │  ← 日语单词
│        (konnichiwa)             │  ← 罗马音
│         コンニチハ              │  ← 片假名
│                                 │
│          你好                   │  ← 中文释义
│                                 │
│     こんにちは、田中です。      │  ← 例句
│                                 │
├─────────────────────────────────┤
│      ◀  🔊  ❤️  📚  ▶         │  ← 控制按钮
└─────────────────────────────────┘
```

### 基本操作



#### 📖 单词导航
- **左右箭头按钮**: 上一个/下一个单词
- **快捷键**: `←` `→` 方向键
- **进度显示**: 左上角显示当前位置 (如: 1/9999)

#### 🔊 语音朗读
- **点击喇叭图标** 朗读当前日语单词
- 支持标准日语发音
- 需要网络连接 (使用 Web Speech API)

#### ❤️ 收藏功能
- **点击心形图标** 收藏/取消收藏单词
- **收藏模式**: 点击底部控制栏的书签图标切换
  - 「全部模式」: 显示所有单词
  - 「收藏模式」: 仅显示收藏的单词
- **收藏数量**: 书签图标上显示收藏单词总数

### 界面定制

#### 🌙 主题切换
- **点击右上角月亮/太阳图标** 切换主题
- **浅色模式**: 白色背景，适合白天使用
- **深色模式**: 深色背景，适合夜间使用
- 设置会自动保存

#### 📐 窗口调整
- **拖动窗口**: 点击卡片区域拖动到任意位置
- **调整大小**: 拖拽窗口边缘改变尺寸
- **尺寸范围**: 280×180 到 800×600 像素
- **响应式布局**: 界面元素自动适配窗口大小
- **位置记忆**: 重启后恢复上次的位置和大小

### 快捷键一览

| 快捷键 | 功能 |
|--------|------|
| `←` / `→` | 上一个/下一个单词 |
| `Space` | 下一个单词 |
| `B` | 收藏/取消收藏当前单词 |
| `M` | 切换收藏模式 |
| `T` | 切换主题模式 |

### 学习建议

#### 📚 学习模式
1. **浏览模式**: 快速浏览所有单词，建立整体印象
2. **精读模式**: 仔细学习每个单词，使用语音朗读
3. **复习模式**: 切换到收藏模式，重点复习收藏的单词
4. **测试模式**: 看日语猜中文，或看中文猜日语

#### 🎯 使用技巧
- **合理使用收藏**: 将难记或重要的单词加入收藏
- **语音学习**: 多听发音，培养语感
- **定期复习**: 利用收藏功能进行针对性复习
- **调整窗口**: 根据使用场景调整合适的窗口大小

---

## 🔧 常见问题

### 安装相关

**Q: macOS 提示"无法打开，因为它来自身份不明的开发者"？**
A: 前往「系统偏好设置」→「安全性与隐私」→「通用」，点击「仍要打开」。

**Q: Windows 提示 SmartScreen 警告？**
A: 点击"更多信息"，然后选择"仍要运行"。这是正常的安全提示。



### 功能相关

**Q: 语音朗读没有声音？**
A: 检查网络连接和系统音量设置，语音功能需要网络支持。

**Q: 收藏的单词丢失了？**
A: 收藏数据保存在本地，重装系统或删除应用数据会导致丢失。

**Q: 如何重置学习进度？**
A: 目前需要重新安装应用，未来版本将添加重置功能。

### 性能相关

**Q: 应用启动缓慢？**
A: 首次启动会加载单词库，后续启动会更快。

**Q: 窗口拖动不流畅？**
A: 尝试关闭其他占用资源的应用，或重启 JWordCards。

---

## 📞 技术支持

如果您遇到其他问题或有改进建议，请通过以下方式联系：

- 📧 **问题反馈**: 通过项目 Issues 页面提交
- 💡 **功能建议**: 欢迎提出新功能想法
- 🤝 **参与贡献**: 欢迎提交 Pull Request

---

## 📄 版本信息

- **当前版本**: 1.0.0
- **更新日期**: 2025年7月
- **许可证**: MIT License
- **技术栈**: Electron + React + Vite

---

*感谢使用 JWordCards，祝您日语学习愉快！* 🎌