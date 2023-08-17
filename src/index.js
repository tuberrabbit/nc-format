import pangu from 'pangu';

const IOS_NUMBER_REG = /\b(ios)(\d+)\b/i;
const NO_SPACE_REG = /\s([/·])\s/ig;
export default class Formatter {
  constructor() {
  }

  formatText(text, options = {}) {
    text = text.trim();
    if (!text) {
      return text;
    }
    return this._formatFragment(text, options);
  }

  _formatFragment(text, options) {

    // 移除【】中的内容
    text = text.replace(/【[^【】]+】/ig, '');

    // "" “” 替换为
    text = text.replace(/[“”]([^“”]+)[“”]/g, '「$1」');
    text = text.replace(/"([^"]+)"/g, '「$1」');

    // ％ 替换为 %
    text = text.replace(/％/g, '%');

    //『』替换为 「」
    text = text.replace(/『([^』]+)』/g, '「$1」');

    // 以「」开头，直接去掉符号
    text = text.replace(/^「([^」]+)」/, '$1');

    // • 替换为 ·
    text = text.replace(/•/g, '·');

    // pangu 排版
    text = pangu.spacing(text, options);

    // 中文后跟全角冒号
    text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]\s*):/g, '$1：');

    // 时间格式化 12:12
    text = text.replace(/(\d+)\s*[:|：]\s*(\d{2,})/g, '$1:$2');

    /** A + 轮 --> A+ 轮 */
    const regex = /\s*(A|B|C|D|E|F|G)\s*\+\s*轮/g;
    text = text.replace(regex, ' $1+ 轮')

    /** 加号+专有名词 */
    text = text.replace(/News \+/g, 'News+');
    text = text.replace(/TV \+/g, 'TV+');

    /** 移除·左右空格 */
    text = text.replace(/\s*·\s*/g, '·');

    // ios14 -> ios 14
    text = text.replace(IOS_NUMBER_REG, '$1 $2');

    // 移除空格
    text = text.replace(NO_SPACE_REG, '$1');

    return text;
  }

}
