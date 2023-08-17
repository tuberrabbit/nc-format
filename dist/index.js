/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Formatter)
});

;// CONCATENATED MODULE: external "pangu"
const external_pangu_namespaceObject = require("pangu");
var external_pangu_default = /*#__PURE__*/__webpack_require__.n(external_pangu_namespaceObject);
;// CONCATENATED MODULE: ./src/index.js

var IOS_NUMBER_REG = /\b(ios)(\d+)\b/i;
var NO_SPACE_REG = /\s([/·])\s/ig;
class Formatter {
  constructor() {}
  formatText(text) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
    text = external_pangu_default().spacing(text, options);

    // 中文后跟全角冒号
    text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]\s*):/g, '$1：');

    // 时间格式化 12:12
    text = text.replace(/(\d+)\s*[:|：]\s*(\d{2,})/g, '$1:$2');

    /** A + 轮 --> A+ 轮 */
    var regex = /\s*(A|B|C|D|E|F|G)\s*\+\s*轮/g;
    text = text.replace(regex, ' $1+ 轮');

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
module.exports = __webpack_exports__;
/******/ })()
;