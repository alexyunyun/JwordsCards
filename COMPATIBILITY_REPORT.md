# 📱 JWordCards 应用兼容性报告

<div align="center">

![JWordCards Logo](resources/icon.png)

**轻量级日语单词学习桌面应用**

[![Electron](https://img.shields.io/badge/Electron-28.2.0-47848F?style=for-the-badge&logo=electron)](https://electronjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📋 概述

JWordCards 是一款基于 **Electron 28.2.0** 构建的现代化日语单词学习桌面应用程序。本报告详细说明了应用在各个平台上的最低系统要求和兼容性信息，帮助用户了解设备兼容性并选择合适的安装包。

## 🛠️ 核心技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Electron** | 28.2.0 | 基于 Chromium 120 和 Node.js 18.18 |
| **React** | 18.2.0 | 现代化 UI 框架 |
| **TypeScript** | 5.3.3 | 类型安全的 JavaScript |
| **Node.js** | 18.18 | 内置于 Electron 运行时 |
| **Chromium** | 120 | 内置浏览器引擎 |

---

## 🖥️ 平台兼容性

### 🍎 macOS

<div align="center">

![macOS](https://img.shields.io/badge/macOS-10.15+-000000?style=for-the-badge&logo=apple)

</div>

#### 📋 系统要求

| 项目 | 要求 |
|------|------|
| **最低系统版本** | macOS 10.15 (Catalina) 或更高 |
| **支持架构** | Intel x64 (64位) / Apple Silicon ARM64 |
| **内存** | 4GB RAM (推荐 8GB+) |
| **存储空间** | 200MB 可用空间 |

#### 📦 安装包格式

- 🔹 **DMG 安装包** - 标准 macOS 安装格式
- 🔹 **应用程序包** (.app) - 可直接拖拽到应用程序文件夹

#### ⚠️ 重要提示

> **不再支持的版本**: macOS 10.13 (High Sierra) 和 10.14 (Mojave)  
> **安全提醒**: 应用未进行代码签名，首次运行时需要在系统偏好设置中允许

---

### 🪟 Windows

<div align="center">

![Windows](https://img.shields.io/badge/Windows-10+-0078D4?style=for-the-badge&logo=windows)

</div>

#### 📋 系统要求

| 项目 | 要求 |
|------|------|
| **最低系统版本** | Windows 10 或更高版本 |
| **支持架构** | x64 (64位) |
| **内存** | 4GB RAM (推荐 8GB+) |
| **存储空间** | 200MB 可用空间 |

#### 📦 安装包格式

- 🔹 **NSIS 安装程序** (.exe) - 推荐安装方式
- 🔹 **便携版应用** (.exe) - 免安装直接运行
- 🔹 **解压版应用** - 完整应用目录

#### ⚠️ 重要提示

> **不再支持的版本**: Windows 7、8 和 8.1  
> **安全提醒**: 应用未进行代码签名，Windows Defender 可能显示安全警告

---

### 🐧 Linux

<div align="center">

![Linux](https://img.shields.io/badge/Linux-Ubuntu_20.04+-FCC624?style=for-the-badge&logo=linux&logoColor=black)

</div>

#### 📋 系统要求

| 项目 | 要求 |
|------|------|
| **构建基础** | Ubuntu 20.04 |
| **支持架构** | ARM64 |
| **内存** | 4GB RAM (推荐 8GB+) |
| **存储空间** | 200MB 可用空间 |

#### 🔍 验证兼容的发行版

- ✅ **Ubuntu** 18.04 及更新版本
- ✅ **Fedora** 32 及更新版本  
- ✅ **Debian** 10 及更新版本

#### 📦 安装包格式

- 🔹 **AppImage** - 便携式应用，免安装运行
- 🔹 **解压版应用** - 完整应用目录

---

## 🌐 浏览器引擎兼容性

<div align="center">

![Chromium](https://img.shields.io/badge/Chromium-120-4285F4?style=for-the-badge&logo=googlechrome)

</div>

应用内置 **Chromium 120** 浏览器引擎，完整支持现代 Web 标准：

### 🎯 支持的 Web 技术

| 技术类别 | 支持版本/特性 |
|----------|---------------|
| **JavaScript** | ES2020 完整支持 |
| **CSS** | 现代 CSS 特性 (Grid, Flexbox, CSS Variables) |
| **HTML5** | 完整支持所有 HTML5 特性 |
| **WebAPI** | 现代浏览器 API (LocalStorage, IndexedDB 等) |

### 🔧 React 兼容性

**React 18.2.0** 支持所有现代浏览器引擎，包括：

- ✅ Chrome/Chromium
- ✅ Firefox  
- ✅ Safari
- ✅ Edge

**必需的 JavaScript 特性**:
- `Promise`
- `Symbol` 
- `Object.assign`

---

## 💻 硬件要求

### 🔧 最低配置

<div align="center">

| 组件 | 要求 |
|------|------|
| **处理器** | 支持 64 位的现代处理器 |
| **内存** | 4GB RAM |
| **存储** | 200MB 可用空间 |
| **显示** | 1024x768 分辨率 |

</div>

### 🚀 推荐配置

<div align="center">

| 组件 | 推荐 |
|------|------|
| **处理器** | 多核 64 位处理器 |
| **内存** | 8GB RAM 或更高 |
| **存储** | 500MB 可用空间 (SSD 推荐) |
| **显示** | 1920x1080 分辨率或更高 |

</div>

---

## 🌐 网络要求

<div align="center">

![Offline](https://img.shields.io/badge/网络要求-离线应用-success?style=for-the-badge)

</div>

- ✅ **完全离线运行** - 应用不需要网络连接
- 🔄 **仅下载时需要** - 首次下载安装包需要网络连接
- 📱 **本地数据存储** - 所有学习数据本地保存

---

## ⚠️ 已知限制

<div align="center">

| 限制项目 | 说明 | 影响 |
|----------|------|------|
| 🔐 **代码签名** | 应用未进行代码签名 | 可能触发操作系统安全警告 |
| 🔄 **自动更新** | 当前版本不支持自动更新 | 需要手动下载新版本 |
| 🌍 **多语言** | 仅支持中文和日文界面 | 暂不支持其他语言 |

</div>

---

## 📥 安装指南

### 🍎 macOS 用户

```bash
# 1. 下载 DMG 文件
# 2. 双击挂载 DMG
# 3. 拖拽应用到应用程序文件夹
# 4. 首次运行时允许应用 (系统偏好设置 > 安全性与隐私)
```

### 🪟 Windows 用户

```bash
# 推荐方式：NSIS 安装程序
# 1. 下载 "JWordCards Setup 1.0.0.exe"
# 2. 右键选择 "以管理员身份运行"
# 3. 按照安装向导完成安装

# 便携版方式
# 1. 下载 "JWordCards 1.0.0.exe"
# 2. 直接双击运行
# 3. 如遇安全警告，选择 "仍要运行"
```

### 🐧 Linux 用户

```bash
# 1. 下载 AppImage 文件
wget https://github.com/your-repo/JWordCards/releases/download/v1.0.0/JWordCards-1.0.0-arm64.AppImage

# 2. 添加执行权限
chmod +x JWordCards-1.0.0-arm64.AppImage

# 3. 运行应用
./JWordCards-1.0.0-arm64.AppImage
```

---

## 🔧 故障排除

### 常见问题解决方案

<details>
<summary><strong>🚫 应用无法启动</strong></summary>

1. **检查系统版本** - 确保满足最低系统要求
2. **检查架构匹配** - 确保下载了正确架构的安装包
3. **检查系统资源** - 确保有足够的内存和存储空间
4. **重新下载** - 安装包可能损坏，尝试重新下载

</details>

<details>
<summary><strong>⚠️ 安全警告</strong></summary>

**macOS**: 系统偏好设置 > 安全性与隐私 > 通用 > 允许应用  
**Windows**: 点击 "更多信息" > "仍要运行"  
**Linux**: 确保 AppImage 文件有执行权限

</details>

<details>
<summary><strong>🐌 应用运行缓慢</strong></summary>

1. **关闭其他应用** - 释放系统内存
2. **检查系统资源** - 确保满足推荐配置
3. **重启应用** - 清理内存缓存

</details>

---

## 📊 兼容性测试矩阵

<div align="center">

| 平台 | 版本 | 架构 | 状态 | 测试日期 |
|------|------|------|------|----------|
| macOS | 10.15+ | x64 | ✅ 通过 | 2024-01 |
| macOS | 10.15+ | ARM64 | ✅ 通过 | 2024-01 |
| Windows | 10+ | x64 | ✅ 通过 | 2024-01 |
| Linux | Ubuntu 20.04+ | ARM64 | ✅ 通过 | 2024-01 |
| Linux | Fedora 32+ | ARM64 | ✅ 通过 | 2024-01 |
| Linux | Debian 10+ | ARM64 | ✅ 通过 | 2024-01 |

</div>

---

## 📞 技术支持

如果您在使用过程中遇到任何兼容性问题，请按以下步骤操作：

1. **📋 检查系统要求** - 对照本报告确认系统兼容性
2. **🔍 查看故障排除** - 参考上方常见问题解决方案  
3. **📝 提交问题** - 在 GitHub Issues 中详细描述问题
4. **📧 联系支持** - 发送邮件至技术支持团队

---

<div align="center">

## 📄 版本信息

**报告版本**: 1.0.0  
**应用版本**: 1.0.0  
**更新日期**: 2024年1月  
**适用范围**: JWordCards 桌面应用

---

**© 2024 JWordCards Team. All rights reserved.**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/your-repo/JWordCards)
[![Issues](https://img.shields.io/badge/Issues-Report_Bug-red?style=for-the-badge&logo=github)](https://github.com/your-repo/JWordCards/issues)
[![Discussions](https://img.shields.io/badge/Discussions-Community-blue?style=for-the-badge&logo=github)](https://github.com/your-repo/JWordCards/discussions)

</div>