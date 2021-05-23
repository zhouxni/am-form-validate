import AmForm from './am-form';
import AmFormItem from './am-form-item';
import AmInput from './am-input';
var version = '2.1.6';

function install(Vue) {
  var components = [AmForm, AmFormItem, AmInput];
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

export { install, version, AmForm, AmFormItem, AmInput };
export default {
  install: install,
  version: version
};