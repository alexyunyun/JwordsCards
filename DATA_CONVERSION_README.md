# 日语单词数据转换说明

## 项目概述

JWordsCard 是一个跨平台的日语单词学习桌面应用，支持悬浮卡片形式展示单词，包含翻转效果、语音朗读、收藏系统等功能。

## 数据结构转换

### 原始数据结构

原始数据位于以下目录：
- `/src/data/n1/` - N1级别词汇（10个文件）
- `/src/data/n2/` - N2级别词汇（10个文件）
- `/src/data/n3/` - N3级别词汇（10个文件）
- `/src/data/n5n4/` - N4N5级别词汇（10个文件）

每个原始数据文件包含以下结构：
```json
{
  "wordThemeName": "N4N5词汇 第一天",
  "wordName": "約束",
  "wordId": 39593,
  "optionDtos": [{
    "wordOptionId": 84969,
    "wordOptionDesc": "约定，商定",
    "isRight": 1,
    "wordId": 39593
  }],
  "wordDesc": "（やくそく）⓪【名·他动3】约定，商定",
  "correctDesc": "约定，商定",
  "isRight": null,
  "count": 200,
  "pronunciationUrl": null,
  "phoneticSymbol": null,
  "picUrl": null,
  "wordPronun": null,
  "wordPhonetic": null
}
```

### 转换后的数据结构

转换后的数据统一存储在 `/src/data/words.json` 中，结构如下：
```json
{
  "id": "n5n4_39593",
  "word": "約束",
  "pronunciation": {
    "romaji": "yakusoku",
    "katakana": "ヤクソク"
  },
  "meaning": "约定，商定",
  "example": "",
  "bookmarked": false,
  "level": "N5N4",
  "category": "N4N5词汇 第一天",
  "partOfSpeech": "名·他动3",
  "accent": "⓪",
  "originalId": 39593
}
```

## 数据结构对比

### 原始数据结构
```json
{
  "wordThemeName": "N2词汇 第一天",
  "wordName": "躊躇う",
  "wordId": 57936,
  "optionDtos": [{
    "wordOptionId": 115595,
    "wordOptionDesc": "踌躇；犹豫",
    "isRight": 1,
    "wordId": 57936
  }],
  "wordDesc": "（ためらう）③【自他动1】踌躇；犹豫",
  "correctDesc": "踌躇；犹豫"
}
```

**注意**: `wordDesc` 中括号内的内容（如 `ためらう`）是平假名读音，不是片假名。

### 转换后数据结构
```json
{
  "id": "n2_57936",
  "word": "躊躇う",
  "pronunciation": {
    "romaji": "tamerau",
    "katakana": "ためらう"
  },
  "meaning": "踌躇；犹豫",
  "example": "",
  "bookmarked": false,
  "level": "N2",
  "category": "N2词汇 第一天",
  "partOfSpeech": "自他动1",
  "accent": "③",
  "originalId": 57936
}
```

**重要修正**: `pronunciation.katakana` 字段现在存储的是平假名读音，而不是片假名。这是因为原始数据中提供的是平假名读音，应用程序不需要片假名形式。

## 数据转换功能

### 1. 罗马音生成

使用自定义的平假名到罗马音转换算法，支持：
- 基本平假名转换
- 促音（っ）处理
- 拗音（きゃ、しゅ等）处理
- 片假名外来语转换

### 2. 片假名生成

- 从平假名自动转换为片假名
- 对于外来语单词，直接使用原片假名

### 3. 词性和音调提取

从 `wordDesc` 字段中提取：
- 平假名读音（括号内）
- 音调标记（⓪①②③④⑤⑥⑦⑧⑨）
- 词性信息（【】内）

### 4. 数据统计

转换完成后的数据统计：
- 总词汇数：9,499个
- N1级别：约2,500个
- N2级别：约2,500个
- N3级别：约2,000个
- N4N5级别：约2,500个

## 转换脚本使用

### 运行转换脚本

```bash
node scripts/convertWordData.js
```

### 脚本功能

1. **数据读取**：读取所有级别目录下的JSON文件
2. **格式转换**：将原始格式转换为应用所需格式
3. **罗马音生成**：为每个单词生成对应的罗马音
4. **数据合并**：将所有级别的数据合并到单一文件
5. **输出保存**：保存到 `src/data/words.json`

## 技术特点

### 1. 智能读音处理

- **平假名单词**：从 `wordDesc` 提取平假名，转换为罗马音和片假名
- **片假名外来语**：直接从单词本身转换罗马音
- **汉字单词**：从 `wordDesc` 提取平假名读音进行转换

### 2. 数据完整性

- 保留原始数据的所有重要信息
- 添加新的罗马音和片假名字段
- 维护原始ID用于数据追溯

### 3. 错误处理

- 处理缺失读音的情况
- 识别并正确处理外来语
- 保持数据一致性

## 应用集成

转换后的数据完全兼容现有的应用架构：

- **类型定义**：符合 `src/renderer/src/types/index.ts` 中的 `Word` 接口
- **数据加载**：通过 `useWordBank` hook 加载和管理
- **UI显示**：支持卡片翻转、语音朗读等功能
- **收藏系统**：支持单词收藏和收藏模式学习

## 开发和维护

### 添加新词汇

1. 将新的JSON文件放入对应级别目录
2. 运行转换脚本重新生成 `words.json`
3. 重启应用加载新数据

### 修改转换逻辑

编辑 `scripts/convertWordData.js` 中的转换函数：
- `parseWordDesc()` - 解析词汇描述
- `hiraganaToRomaji()` - 平假名转罗马音
- `katakanaToRomaji()` - 片假名转罗马音
- `convertWordData()` - 主转换逻辑

### 数据验证

转换完成后可以检查：
- 总词汇数量是否正确
- 罗马音生成是否准确
- 数据格式是否符合预期

## 总结

通过这个数据转换系统，我们成功将分散在多个文件中的原始词汇数据整合为统一格式，并为每个单词生成了完整的读音信息。这为日语学习应用提供了丰富、准确的词汇数据基础。