/* eslint-disable */

/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
import './index-sfc.css';

var __vue_render__ = function __vue_render__() {
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

var __vue_staticRenderFns__ = [];
export default {
  _scopeId: 'data-v-dbd73d24',
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
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
};