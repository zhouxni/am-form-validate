"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.install = install;
exports.default = exports.version = void 0;

var _amForm = _interopRequireDefault(require("./am-form"));

exports.AmForm = _amForm.default;

var _amFormItem = _interopRequireDefault(require("./am-form-item"));

exports.AmFormItem = _amFormItem.default;

var _amInput = _interopRequireDefault(require("./am-input"));

exports.AmInput = _amInput.default;
var version = '2.1.6';
exports.version = version;

function install(Vue) {
  var components = [_amForm.default, _amFormItem.default, _amInput.default];
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

var _default = {
  install: install,
  version: version
};
exports.default = _default;