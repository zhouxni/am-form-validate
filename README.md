**初衷：由于H5移动端框架方面(类似于vant,mint-ui等)基本很少做表单验证的相关功能，一旦遇到某个页面form中大量的字段验证，无法形成有效的规则验证化。此插件仿照ant-desgin-vue表单验证编写，相似度90%以上，主要是为了容易上手，降低团队的学习成本，拿来即用。此插件已发布npm包，分为vue2和vue3两个版本，对应am-form-validate和am-form-validate@next。**

**快速上手：**

```

yarn add am-form-validate 或 yarn add am-form-validate@next

全局使用
import Vue from 'vue'
import amFormValidate from 'am-form-validate'
Vue.use(amFormValidate)

局部使用
直接引用am-form-validate/lib三个组件，在components中注册使用

```

**API**

**Form**

|参数|说明对象|类型|默认值|
|--|--|--|--|
|model|表单数据对象|object||
|rules|表单验证规则|object||
|labelAlign|label标签文本对齐方式|'left'\|'right'|'right'|
|inline|是否行内对齐|boolean|false|
|labelWidth|label文本宽度|'px'\|'em'\|'rem'\|'auto'\|number|'auto'|
|errorShow|显示错误信息|boolean|true|

<br/>

**事件**

|事件名称|说明|回调参数|
|--|--|--|
|validate|任一表单项被校验后触发|被校验的表单项 prop 值，校验是否通过，错误消息|
|submit|数据验证成功后回调事件|Function(e:Event)|

<br/>

**方法**

|方法名|说明|参数|
|--|--|--|
|validate|对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。|Function(callback: Function(boolean, array))|
|validateField|对部分表单字段进行校验的方法，返回每个字段是否校验成功状态和相应字段及信息|Function(props: array \| string, callback: Function(errorMessage: object\|array))|
|resetFields|对整个表单进行重置，将所有字段值重置为初始值并移除校验结果||
|clearValidate|移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组。|Function(props: array \| string)|

<br/>

**Form.Item**

|参数|说明|类型|默认值|
|--|--|--|--|
|prop|表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的|string||
|label|label 标签的文本|string||
|labelAlign|标签文本对齐方式|‘left'\|’right'|'right'|
|labelWidth|标签文本宽度|‘px'\|'em'\|'rem'\|'auto'\|number|'auto'|
|required|是否必填|boolean|true|
|requiredMsg|必填的错误信息|string|属性名+‘不能为空’|
|autoChecked|对于其它非input组件必填，对值进行自动校验|boolean|false|

<br/>

**校验规则**

ant-desgin-vue使用了async-validator这个库配置校验规则。但本插件为了避免过分依赖其它库，除了required内置校验规则外，其它都需要自己写validator进行验证。在rules中配置，以下是phone字段配置实例

```

phone: [
        {
          validator: (value, callback) => {
            if (!/^1\d{10}$/.test(value)) {
              callback("请输入正确的手机号");
            }
          },
          trigger: "blur",
        },
  ]

```

每个字段可以配置多个规则，每个规则对象有validator和trigger属性，validator为规则函数，第一个参数是字段值，第二个是抛出相应错误信息的函数，参数为string或error实例(一旦捕捉到错误信息，同一字段的后面规则便不再执行)。trigger为触发条件，值为blur' | 'change' | ['change', 'blur']，默认为['change', 'blur']。由于此插件是用在移动端，基本是input组件使用这个属性。其它非input组件可以使用autoChecked进行自动实时校验，类似‘change’。或者使用validateField方法在相关事件函数中手动校验。

<br/>

**template模板(model和rules定义与ant-desgin-vue一样)**

```

<am-form
      ref="form"
      :model="formData"
      :rules="rules"
      :labelAlign="'left'"
      inline
      @submit="submit"
      @validate="validate"
    >
      <am-form-item
        required
        label="名称："
        required-msg="名字不能为空"
        prop="name"
        :labelAlign="'left'"
      >
        <am-input v-model="formData.name" />
      </am-form-item>
  </am-form>

```
