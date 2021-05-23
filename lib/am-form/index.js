"use strict";

exports.__esModule = true;
exports.default = void 0;

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
var _default2 = {
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
      var _this = this;

      // 传入的是单个属性
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
      var _this2 = this;

      // 重置单个表单域
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
};
exports.default = _default2;