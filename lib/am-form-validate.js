(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("am-form-validate", [], factory);
	else if(typeof exports === 'object')
		exports["am-form-validate"] = factory();
	else
		root["am-form-validate"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(0);
            var content = __webpack_require__(3);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".am-formItem[data-v-dbd73d24]{margin-bottom:25px}label[data-v-dbd73d24]{font-size:14px;display:inline-block;margin-bottom:5px}.am-label-inline[data-v-dbd73d24]{margin-bottom:0}.am-formItem-inline>label[data-v-dbd73d24]{text-align:right}.am-label-required[data-v-dbd73d24]::before{content:'*';color:#f5222d;margin-right:4px}.am-input-slot[data-v-dbd73d24]{-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative}.am-input-slot>p[data-v-dbd73d24]{color:#f5222d;font-size:14px;line-height:1.5;position:absolute;bottom:-24px;margin:0}.am-formItem-inline[data-v-dbd73d24]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.slide-fade-enter-active[data-v-dbd73d24],.slide-fade-leave-active[data-v-dbd73d24]{-webkit-transition:all .4s ease-out;transition:all .4s ease-out}.slide-fade-enter[data-v-dbd73d24],.slide-fade-leave-to[data-v-dbd73d24]{-webkit-transform:translateY(-10px);transform:translateY(-10px);opacity:0}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(0);
            var content = __webpack_require__(5);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".am-input>input{width:100%;border:1px solid #d9d9d9;border-radius:4px;-webkit-transition:all .3s cubic-bezier(.645,.045,.355,1);transition:all .3s cubic-bezier(.645,.045,.355,1);outline:0;height:32px;margin:0;box-sizing:border-box;padding:0 11px}.am-input>.am-input-error{border-color:#f5222d}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* binding */ install; });
__webpack_require__.d(__webpack_exports__, "version", function() { return /* binding */ version; });
__webpack_require__.d(__webpack_exports__, "AmForm", function() { return /* reexport */ am_form; });
__webpack_require__.d(__webpack_exports__, "AmFormItem", function() { return /* reexport */ am_form_item; });
__webpack_require__.d(__webpack_exports__, "AmInput", function() { return /* reexport */ am_input; });

// CONCATENATED MODULE: ./es/am-form/index.js
/* eslint-disable */

/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "am-form"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* harmony default export */ var am_form = ({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: 'am-form',
  props: {
    model: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    rules: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    errorShow: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: [Number, String],
      default: 'auto'
    },
    labelAlign: {
      type: String,
      default: 'right'
    }
  },
  provide: function provide() {
    return {
      form: this
    };
  },
  data: function data() {
    return {
      fields: []
    };
  },
  methods: {
    addFields: function addFields(field) {
      this.fields.push(field);
    },
    removeFields: function removeFields(field) {
      var index = this.fields.findIndex(function (item) {
        return item.prop === field.prop;
      });
      this.fields.splice(index, 1);
    },
    // 重置表单域
    resetFields: function resetFields() {
      this.fields.forEach(function (field) {
        field.resetField();
      });
    },
    // 表单一次性校验
    validate: function validate(cb) {
      var valid = true;
      var errors = [];
      this.fields.forEach(function (field) {
        field.validate('', function (error) {
          if (error.message) {
            errors.push(error);
            valid = false;
          }
        });
      });

      if (errors.length === 0) {
        this.$emit('submit');
      }

      cb(valid, errors); //校验回调错误信息
    },
    // 单个或部分表单域校验
    validateField: function validateField(props, callback) {
      var _this = this; // 传入的是单个属性


      if (typeof props === 'string') {
        var field = this.fields.find(function (field) {
          return field.prop === props;
        });
        field.validate('', function (error) {
          if (callback) callback(error); // 返回单个表单域错误信息
        });
      } // 传入的是属性数组


      if (props instanceof Array) {
        var errors = [];
        props.forEach(function (prop) {
          _this.fields.forEach(function (field) {
            if (field.prop === prop) {
              field.validate('', function (error) {
                errors.push(error);
              });
            }
          });
        });
        if (callback) callback(errors); // 返回错误信息数组
      }
    },
    // 重置单个或部分表单域
    clearValidate: function clearValidate(props) {
      var _this2 = this; // 重置单个表单域


      if (typeof props === 'string') {
        var field = this.fields.find(function (item) {
          return item.prop === props;
        });
        field.resetField();
      } // 重置部分表单域


      if (props instanceof Array) {
        props.forEach(function (prop) {
          _this2.fields.forEach(function (field) {
            if (field.prop === prop) {
              field.resetField();
            }
          });
        });
      }
    }
  }
});
// EXTERNAL MODULE: ./es/am-form-item/index-sfc.css
var index_sfc = __webpack_require__(2);

// CONCATENATED MODULE: ./es/am-form-item/index.js
/* eslint-disable */

/* eslint-disable vue/no-deprecated-destroyed-lifecycle */


var am_form_item_vue_render_ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "am-formItem",
    class: {
      'am-formItem-inline': _vm.$parent.inline
    }
  }, [_vm.label ? _c('label', {
    class: {
      'am-label-required': _vm.required,
      'am-label-inline': _vm.$parent.inline
    },
    style: {
      width: Number.isNaN(Number(this.labelWidth || _vm.$parent.labelWidth)) ? this.labelWidth || _vm.$parent.labelWidth : (this.labelWidth || _vm.$parent.labelWidth) + 'px',
      textAlign: _vm.labelAlign || _vm.$parent.labelAlign
    }
  }, [_vm._v(_vm._s(_vm.label) + "\n  ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "am-input-slot"
  }, [_vm._t("default"), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide-fade"
    }
  }, [_vm.message.trim().length !== 0 && _vm.$parent.errorShow ? _c('p', [_vm._v("\n        " + _vm._s(_vm.message) + "\n      ")]) : _vm._e()])], 2)]);
};

var am_form_item_vue_staticRenderFns_ = [];
/* harmony default export */ var am_form_item = ({
  _scopeId: 'data-v-dbd73d24',
  render: am_form_item_vue_render_,
  staticRenderFns: am_form_item_vue_staticRenderFns_,
  name: 'am-form-item',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    requiredMsg: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: [String, Number],
      default: 0
    },
    labelAlign: {
      type: String,
      default: 'right'
    },
    autoChecked: {
      type: Boolean,
      default: false
    }
  },
  inject: ['form'],
  data: function data() {
    return {
      message: '',
      showError: false,
      autoChecked_flag: true // 判断是否对input组件重置还是值改变操作的标志，true表示值改变，false表示重置

    };
  },
  created: function created() {
    // 设置初始值
    this.initValue = this.fieldValue;
    this.$parent.addFields(this);
    this.setRules(); // 判断是否内联
  },
  destroyed: function destroyed() {
    this.$parent.removeFields(this);
  },
  computed: {
    fieldValue: function fieldValue() {
      return this.form.model[this.prop];
    }
  },
  watch: {
    message: {
      handler: function handler(val) {
        if (!this.autoChecked && this.children) {
          val ? this.children.hasError = true : this.children.hasError = false;
        }
      }
    },
    fieldValue: {
      handler: function handler() {
        // 判断如果是其它表单非input组件，自动校验。
        if (this.autoChecked && this.autoChecked_flag) {
          this.validate('');
        }
      }
    }
  },
  methods: {
    // 获取子组件实例
    getChildren: function getChildren(child) {
      this.children = child;
    },
    // 重置表单域的值
    resetField: function resetField() {
      var _this = this;

      this.form.model[this.prop] = this.initValue;
      this.message = '';

      if (this.autoChecked) {
        // 判断是否是其它非input表单组件,进行延时处理，避免自动校验
        this.autoChecked_flag = false;
        this.$nextTick(function () {
          _this.autoChecked_flag = true;
        });
      }
    },
    setRules: function setRules() {
      this.$on('blur', this.onFieldBlur);
      this.$on('change', this.onFieldChange);
    },
    getRules: function getRules() {
      return this.form.rules && this.form.rules[this.prop] ? this.form.rules[this.prop] : [];
    },
    // 过滤出符合要求的 rule 规则
    getFilteredRule: function getFilteredRule(trigger) {
      var rules = this.getRules();

      if (trigger) {
        return rules.filter(function (rule) {
          return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
        });
      } else {
        return rules;
      }
    },
    // 校验表单规则
    validate: function validate(trigger, callback) {
      var _this2 = this;

      var rules = this.getFilteredRule(trigger);
      this.message = ''; // 循环遍历规则，一旦callback有参数，就抛出错误

      var cb = function cb(error) {
        if (error) {
          throw error;
        }
      };

      try {
        // required信息校验
        if (this.required && ((typeof this.fieldValue === 'string' ? !this.fieldValue.trim() : !this.fieldValue) || this.fieldValue instanceof Array && !this.fieldValue.length)) {
          throw new Error(this.requiredMsg || this.prop + "\u4E0D\u80FD\u4E3A\u7A7A");
        } // 自定义validator检验


        rules.forEach(function (rule) {
          if (rule.validator) {
            rule.validator(_this2.fieldValue, cb);
          }
        });
      } catch (e) {
        if (e instanceof Error) {
          this.message = e.message;
        } else {
          this.message = e;
        }
      }

      var errorMessage = {
        prop: this.prop,
        valid: !this.message ? true : false,
        message: this.message
      };
      this.$parent.$emit('validate', errorMessage);
      if (callback) callback(errorMessage); // 提交表单时校验抛出错误信息
    },
    onFieldBlur: function onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange: function onFieldChange() {
      this.validate('change');
    }
  }
});
// EXTERNAL MODULE: ./es/am-input/index-sfc.css
var am_input_index_sfc = __webpack_require__(4);

// CONCATENATED MODULE: ./es/am-input/index.js
/* eslint-disable */

/* eslint-disable vue/no-deprecated-destroyed-lifecycle */


var am_input_vue_render_ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "am-input"
  }, [_c('input', {
    class: {
      'am-input-error': _vm.hasError
    },
    attrs: {
      "placeholder": _vm.placeholder,
      "type": _vm.type
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "blur": _vm.blur,
      "input": _vm.input
    }
  })]);
};

var am_input_vue_staticRenderFns_ = [];
/* harmony default export */ var am_input = ({
  render: am_input_vue_render_,
  staticRenderFns: am_input_vue_staticRenderFns_,
  name: 'am-input',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      hasError: false
    };
  },
  created: function created() {
    this.$parent.getChildren(this);
  },
  methods: {
    blur: function blur() {
      this.$parent.$emit('blur');
    },
    input: function input(e) {
      this.$emit('input', e.target.value);
      this.$parent.$emit('change');
    }
  }
});
// CONCATENATED MODULE: ./es/index.js



var version = '2.1.6';

function install(Vue) {
  var components = [am_form, am_form_item, am_input];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


/* harmony default export */ var es = __webpack_exports__["default"] = ({
  install: install,
  version: version
});

/***/ })
/******/ ]);
});