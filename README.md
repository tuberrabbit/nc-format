# nc-format

用于格式化中英文以及中文数字之间的空格，包括一些特殊的标点符号。

来源自无码科技 Readhub 项目早期字符串排版规则，可用于客户端显示的字符串排版，或者服务端的字符串处理。

### 示例代码

```javascript
import Formatter from 'dist/index.js';
const formatter = new Formatter();
formatter.formatText('中文123english');
formatter.formatText('a b', {
  thinsp: true, // 支持添加的空格以 &thinsp; 字符表示
});
```
