const fs = require('fs');
const path = require('path');
const kuromoji = require('kuromoji');

// 初始化kuromoji分词器
let tokenizer = null;

// 初始化分词器
function initTokenizer() {
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict' }).build((err, _tokenizer) => {
      if (err) {
        reject(err);
      } else {
        tokenizer = _tokenizer;
        resolve(tokenizer);
      }
    });
  });
}

// 将平假名转换为罗马音
function hiraganaToRomaji(hiragana) {
  const hiraganaToRomajiMap = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'ゐ': 'wi', 'ゑ': 'we', 'を': 'wo', 'ん': 'n',
    'ー': '', 'っ': '', 'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo',
    'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o'
  };

  let romaji = '';
  let i = 0;
  
  while (i < hiragana.length) {
    const char = hiragana[i];
    const nextChar = hiragana[i + 1];
    
    // 处理小つ（促音）
    if (char === 'っ' && nextChar) {
      const nextRomaji = hiraganaToRomajiMap[nextChar];
      if (nextRomaji && nextRomaji[0]) {
        romaji += nextRomaji[0]; // 添加下一个音的第一个字母
      }
      i++;
      continue;
    }
    
    // 处理拗音（きゃ、しゅ等）
    if (nextChar && (nextChar === 'ゃ' || nextChar === 'ゅ' || nextChar === 'ょ')) {
      const baseRomaji = hiraganaToRomajiMap[char];
      const yoonRomaji = hiraganaToRomajiMap[nextChar];
      if (baseRomaji && yoonRomaji) {
        romaji += baseRomaji.slice(0, -1) + yoonRomaji;
        i += 2;
        continue;
      }
    }
    
    const romajiChar = hiraganaToRomajiMap[char];
    if (romajiChar !== undefined) {
      romaji += romajiChar;
    } else {
      romaji += char; // 保留非平假名字符
    }
    i++;
  }
  
  return romaji;
}

// 从wordDesc中提取信息
function parseWordDesc(wordDesc) {
  // 提取平假名读音（括号内的内容）
  const hiraganaMatch = wordDesc.match(/（([^）]+)）/);
  let hiragana = hiraganaMatch ? hiraganaMatch[1] : '';
  
  // 检查括号内是否为平假名，如果不是则为空
  if (hiragana && !/^[あ-んー]+$/.test(hiragana)) {
    hiragana = '';
  }
  
  // 提取音调标记
  const accentMatch = wordDesc.match(/[⓪①②③④⑤⑥⑦⑧⑨]/);
  const accent = accentMatch ? accentMatch[0] : '';
  
  // 提取词性（方括号内的内容）
  const partOfSpeechMatch = wordDesc.match(/【([^】]+)】/);
  const partOfSpeech = partOfSpeechMatch ? partOfSpeechMatch[1] : '';
  
  return {
    hiragana,
    accent,
    partOfSpeech
  };
}

// 将平假名转换为片假名
function hiraganaToKatakana(hiragana) {
  return hiragana.replace(/[ぁ-ゖ]/g, (match) => {
    const code = match.charCodeAt(0);
    return String.fromCharCode(code + 0x60);
  });
}

// 检查是否为片假名
function isKatakana(str) {
  return /^[ァ-ヶー]+$/.test(str);
}

// 片假名转换为罗马音（简化版）
function katakanaToRomaji(katakana) {
  const katakanaToRomajiMap = {
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヰ': 'wi', 'ヱ': 'we', 'ヲ': 'wo', 'ン': 'n',
    'ー': '', 'ッ': '', 'ャ': 'ya', 'ュ': 'yu', 'ョ': 'yo',
    'ァ': 'a', 'ィ': 'i', 'ゥ': 'u', 'ェ': 'e', 'ォ': 'o'
  };

  let romaji = '';
  let i = 0;
  
  while (i < katakana.length) {
    const char = katakana[i];
    const nextChar = katakana[i + 1];
    
    // 处理小ッ（促音）
    if (char === 'ッ' && nextChar) {
      const nextRomaji = katakanaToRomajiMap[nextChar];
      if (nextRomaji && nextRomaji[0]) {
        romaji += nextRomaji[0];
      }
      i++;
      continue;
    }
    
    // 处理拗音
    if (nextChar && (nextChar === 'ャ' || nextChar === 'ュ' || nextChar === 'ョ')) {
      const baseRomaji = katakanaToRomajiMap[char];
      const yoonRomaji = katakanaToRomajiMap[nextChar];
      if (baseRomaji && yoonRomaji) {
        romaji += baseRomaji.slice(0, -1) + yoonRomaji;
        i += 2;
        continue;
      }
    }
    
    const romajiChar = katakanaToRomajiMap[char];
    if (romajiChar !== undefined) {
      romaji += romajiChar;
    } else {
      romaji += char;
    }
    i++;
  }
  
  return romaji;
}

// 检查是否为平假名
function isHiragana(str) {
  return /^[あ-んー]+$/.test(str);
}

// 转换单个单词数据
function convertWordData(originalWord, index, level) {
  const { hiragana, accent, partOfSpeech } = parseWordDesc(originalWord.wordDesc);
  
  let romaji = '';
  let katakana = '';
  
  if (hiragana) {
    // 有平假名读音的情况
    romaji = hiraganaToRomaji(hiragana);
    katakana = hiragana; // 存储平假名
  } else if (isKatakana(originalWord.wordName)) {
    // 单词本身是片假名的情况（外来语）
    romaji = katakanaToRomaji(originalWord.wordName);
    katakana = originalWord.wordName; // 存储原本的片假名
  } else if (isHiragana(originalWord.wordName)) {
    // 单词本身是平假名的情况
    romaji = hiraganaToRomaji(originalWord.wordName);
    katakana = originalWord.wordName; // 存储原本的平假名
  } else {
    // 其他情况（汉字等），尝试使用kuromoji分析
    if (tokenizer) {
      const tokens = tokenizer.tokenize(originalWord.wordName);
      if (tokens.length > 0 && tokens[0].reading) {
        const reading = tokens[0].reading;
        romaji = hiraganaToRomaji(reading);
        katakana = reading;
      }
    }
  }
  
  return {
    id: `${level}_${originalWord.wordId}`,
    word: originalWord.wordName,
    pronunciation: {
      romaji: romaji,
      katakana: katakana
    },
    meaning: originalWord.correctDesc,
    example: '', // 暂时为空，因为原数据中没有例句
    bookmarked: false,
    level: level.toUpperCase(),
    category: originalWord.wordThemeName,
    partOfSpeech: partOfSpeech,
    accent: accent,
    originalId: originalWord.wordId
  };
}

// 处理单个文件
function processFile(filePath, level) {
  console.log(`Processing ${filePath}...`);
  
  const rawData = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(rawData);
  
  // 提取data数组中的单词
  const words = jsonData.data || [];
  
  return words.map((word, index) => convertWordData(word, index, level));
}

// 主函数
async function main() {
  try {
    console.log('Initializing kuromoji tokenizer...');
    await initTokenizer();
    console.log('Tokenizer initialized successfully!');
    
    const dataDir = path.join(__dirname, '../src/data');
    const outputFile = path.join(dataDir, 'words.json');
    
    let allWords = [];
    
    // 处理各个级别的数据
    const levels = ['n5n4', 'n3', 'n2', 'n1'];
    
    for (const level of levels) {
      const levelDir = path.join(dataDir, level);
      
      if (!fs.existsSync(levelDir)) {
        console.log(`Directory ${levelDir} does not exist, skipping...`);
        continue;
      }
      
      const files = fs.readdirSync(levelDir).filter(file => file.endsWith('.json'));
      
      for (const file of files) {
        const filePath = path.join(levelDir, file);
        const words = processFile(filePath, level);
        allWords = allWords.concat(words);
      }
    }
    
    console.log(`Total words processed: ${allWords.length}`);
    
    // 写入输出文件
    fs.writeFileSync(outputFile, JSON.stringify(allWords, null, 2), 'utf8');
    console.log(`Data written to ${outputFile}`);
    
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  convertWordData,
  parseWordDesc,
  hiraganaToRomaji,
  hiraganaToKatakana
};