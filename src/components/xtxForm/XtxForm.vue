<template>
  <view class="x-form">
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
/**
 * form 表单 （目前没有提供其他的配置属性，后续可以补上）
 * @property {Object} model 表单数据对象
 * @property {Object} rules 校验规则
 */
import { reactive, provide, toRefs } from 'vue';
import { XFormItemProps } from './types';
import mitt from 'mitt';

const props = defineProps({
  // 当前form的需要验证字段的集合
  model: {
    type: Object,
    default: () => ({})
  },
  // 当前form的校验规则
  rules: {
    type: Object,
    default: () => ({})
  },
  // borrder-bottom-下边框呈现红色，none则无提示
  errorType: {
    type: Array,
    default: () => ['message', 'toast'] // message: 表单项内部提示，toast: 全局提示，none: 不提示
  },
  // 是否显示表单下划线边框
  borderBottom: {
    type: Boolean,
    default: true
  },
  // label的位置, left: 左侧，top: 上方
  labelPosition: {
    type: String,
    default: 'left'
  },
  // label的宽度
  labelWidth: {
    type: [String, Number],
    default: 90
  },
  // label的对齐方式
  labelAlign: {
    type: String,
    default: 'left'
  },
  // label的自定义样式
  labelStyle: {
    type: Object,
    default: () => ({})
  }
});

const formEmitter = mitt();

// 收集所有的表单项规则
const fields = reactive<XFormItemProps[]>([]);

// 提供表单整体校验方法validate, 调用 FormItem 的校验方法
const validate = (callback: (flag: boolean) => void) => {
  return new Promise((resolve) => {
    // 对所有的u-form-item进行校验
    let valid = true; // 默认通过
    let count = 0; // 用于标记是否检查完毕
    let errorArr: string[] = []; // 存放错误信息
    fields.map((field) => {
      field.validated('', (error) => {
        // 如果任意一个x-form-item校验不通过，就意味着整个表单不通过
        if (error) {
          valid = false;
          errorArr.push(error);
        }
        // 如果count等于 x-form-item 的长度就说明所有表单项都校验完毕了
        if (++count === fields.length) {
          resolve(valid);
          // 判断是否是 toast 类型的错误提示, 只展示 errorArr 首个错误
          if (
            props.errorType.indexOf('none') === -1 &&
            props.errorType.indexOf('toast') !== -1 &&
            errorArr.length > 0
          ) {
            uni.showToast({
              title: errorArr[0],
              icon: 'none'
            });
          }
          if (typeof callback === 'function') callback(valid);
        }
      });
    });
  });
};

// 提供表单整体重置方法resetFields, 调用 FormItem 的重置方法
const resetFields = () => {
  fields?.map((field) => {
    field.resetField();
  });
};

const xForm = reactive({
  formEmitter,
  ...toRefs(props)
});

// 通过 provide 向子组件提供数据
provide('xForm', xForm);

formEmitter.on('addFileds', (field) => {
  field && fields.push(field as XFormItemProps);
});

defineExpose({
  validate,
  resetFields
});
</script>

<style lang="scss">
@import '../../styles/style.components.scss';
</style>
