"use strict";

exports.__esModule = true;
exports.default = void 0;

require("./index-sfc.css");

/* eslint-disable */

/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
var __vue_render__ = function __vue_render__() {
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

var __vue_staticRenderFns__ = [];
var _default = {
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
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
};
exports.default = _default;