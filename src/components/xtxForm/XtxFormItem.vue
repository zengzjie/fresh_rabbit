<template>
  <view
    class="x-form-item"
    :class="{
      'x-border-bottom': elBorderBottom,
      'x-form-item__border-bottom--error': validateState === 'error' && showError('border-bottom')
    }"
  >
    <view class="x-form-item__body" :style="{ flexDirection: elLabelPosition === 'left' ? 'row' : 'column' }">
      <view
        class="x-form-item--left"
        :style="{
          width: xLabelWidth,
          flex: `0 0 ${xLabelWidth}`,
          mraginBottom: elLabelPosition === 'left' ? 0 : '10rpx'
        }"
      >
        <view v-if="required || leftIcon || label" class="x-form-item--left__content">
          <view v-if="required" class="x-form-item--left__content--required">*</view>
          <view v-if="leftIcon" class="x-form-item--left__content__icon">
            <uni-icons
              :type="leftIcon"
              :size="leftIconStyle.size ? leftIconStyle.size : 20"
              :color="leftIconStyle.color"
            />
          </view>
          <!-- label的 justify-content 位置 -->
          <view
            class="x-form-item--left__content__label"
            :style="[
              elLabelStyle,
              {
                'justify-content':
                  elLabelPosition === 'left' ? 'flex-start' : elLabelAlign === 'center' ? 'center' : 'flex-end'
              }
            ]"
          >
            {{ label }}
          </view>
        </view>
      </view>
      <view class="x-form-item--right x-flex">
        <view class="x-form-item--right__content">
          <view class="x-form-item--right__content__slot">
            <slot></slot>
          </view>
          <view v-if="slots.right || rightIcon" class="x-form-item--right__content__icon x-flex">
            <uni-icons
              :type="rightIcon"
              :size="rightIconStyle.size ? rightIconStyle.size : 20"
              :color="rightIconStyle.color"
            />
            <slot name="right"></slot>
          </view>
        </view>
      </view>
    </view>
    <text
      v-if="validateState === 'error' && showError('message')"
      class="x-form-item__message"
      :style="{ paddingLeft: elLabelPosition === 'left' ? globalProperties.$u.addUnit(elLabelWidth) : 0 }"
    >
      {{ validateMessage }}
    </text>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, provide, inject, watch, computed, onMounted, onBeforeUnmount, useSlots } from 'vue';
import mitt from 'mitt';
import Schema from 'async-validator';
import { XFormProps, ParentDataProps } from './types';
import useCurrentInstance from '@/hooks/useCurrentInstance';

const props = defineProps({
  // input的标题
  label: {
    type: String,
    default: ''
  },
  // 绑定值
  prop: {
    type: String,
    default: ''
  },
  // 是否显示表单域下边框
  borderBottom: {
    type: [Boolean, String],
    default: ''
  },
  // label的位置，left-左边，top-上边
  labelPosition: {
    type: String,
    default: ''
  },
  // label的宽度，单位rpx
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  // lable的样式，对象形式
  labelStyle: {
    type: Object,
    default: () => ({})
  },
  // lable字体的对齐方式
  labelAlign: {
    type: String,
    default: ''
  },
  // 右侧图标
  rightIcon: {
    type: String,
    default: ''
  },
  // 左侧图标
  leftIcon: {
    type: String,
    default: ''
  },
  // 右侧图标样式
  rightIconStyle: {
    type: Object,
    default: () => ({})
  },
  // 左侧图标样式
  leftIconStyle: {
    type: Object,
    default: () => ({})
  },
  // 是否必填
  required: {
    type: Boolean,
    default: false
  }
});

const xForm = inject('xForm') as XFormProps;
const emitter = mitt();
// 获取插槽
const slots = useSlots();
const { globalProperties } = useCurrentInstance();

// 存储默认值
const initialValue = ref('');
// 错误信息
const validateMessage = ref<string>('');
// 是否校验成功
const validateState = ref<string>('');
// 错误类型
const errorType = ref<string[]>(['message']);
// form的参数, 在 computed 计算中无法获得到 parent 发生变化, 所以需要用 reactive 定义
const parentData = reactive<ParentDataProps>({
  borderBottom: true,
  labelWidth: 90,
  labelPosition: 'left',
  labelStyle: {},
  labelAlign: 'left'
});

// label宽度
const elLabelWidth = computed(() => {
  const type = Object.prototype.toString.call(props.labelWidth).slice(8, 14);
  let width: string | number = 0;
  switch (type) {
    case 'Number':
      width = props.labelWidth !== 0 ? props.labelWidth : parentData.labelWidth ? parentData.labelWidth : 90;
      break;
    case 'String':
      width = props.labelWidth !== '' ? props.labelWidth : parentData.labelWidth ? parentData.labelWidth : 90;
      break;
    default:
      break;
  }
  return width;
});

// label样式
const elLabelStyle = computed(() => {
  return Object.keys(props.labelStyle).length ? props.labelStyle : parentData.labelStyle ? parentData.labelStyle : {};
});

// label的位置, 左侧或者上方
const elLabelPosition = computed(() => {
  return props.labelPosition ? props.labelPosition : parentData.labelPosition ? parentData.labelPosition : 'left';
});

// label的对齐方式
const elLabelAlign = computed(() => {
  return props.labelAlign ? props.labelAlign : parentData.labelAlign ? parentData.labelAlign : 'left';
});

// label的下划线
const elBorderBottom = computed(() => {
  // 默认为空字符串, 如果不等于空字符串则意味着子组件设置了值, 否则就取父组件的值
  return props.borderBottom !== '' ? props.borderBottom : parentData.borderBottom ? parentData.borderBottom : true;
});

// 计算后的label宽度, 加上单位
const xLabelWidth = computed(() => {
  // 如果用户设置label为空字符串(微信小程序空字符串最终会变成字符串的'true'), 就为auto
  return elLabelPosition.value === 'left'
    ? props.label === 'true' || props.label === ''
      ? 'auto'
      : globalProperties.$u.addUnit(elLabelWidth.value)
    : '100%';
});

// 获取当前的校验规则
const getFilteredRule = (triggerType: 'blur' | 'change') => {
  const rules = xForm.rules[props.prop as string] || [];
  // 整体验证表单时，triggerType为空字符串，此时返回所有规则进行验证
  if (!triggerType) return rules;
  // 1️⃣ 历遍判断规则是否有对应的事件，比如blur，change触发等的事件
  // 2️⃣ 使用indexOf判断，是因为某些时候设置的验证规则的trigger属性可能为多个，比如['blur','change']
  // 3️⃣ 某些场景可能的判断规则，可能不存在trigger属性，故先判断是否存在此属性
  return rules.filter((res) => res.trigger && res.trigger.indexOf(triggerType) !== -1);
};

/**
 * @description: 表单校验的方法
 * @param {*} trigger 触发校验的事件 - 可以是字符串，也可以是数组 ['blur', 'change']
 * @param {*} callback
 * @return {*}
 */
const validated = (trigger: 'blur' | 'change', callback = (str?: string) => {}) => {
  const fieldValue = xForm.model[props.prop as string];
  // 🔧 blur和change是否有当前的校验规则
  const rules = getFilteredRule(trigger);
  // ❗️ 注意：判断是否有验证规则，如果没有规则，也调用回调方法，否则父组件 x-for m会因为对 count 变量的统计错误而无法进入上一层的回调
  if (!rules || rules.length === 0) {
    callback('');
    return;
  }
  const descriptor = {
    [props.prop as string]: xForm.rules[props.prop as string]
  };

  // 正在校验中
  validateState.value = 'validating';
  const validator = new Schema(descriptor);
  validator.validate({ [props.prop as string]: fieldValue }, { firstFields: true }, (errors, fields) => {
    // 更新校验状态
    validateState.value = !errors ? 'success' : 'error';
    // 更新错误信息
    validateMessage.value = errors ? (errors[0].message as string) : '';
    callback(validateMessage.value);
  });
};

// 重置方法
const resetField = () => {
  validateState.value = 'success';
  xForm.model[props.prop as string] = initialValue.value;
};

// blur事件时进行表单校验
const onFieldBlur = () => {
  validated('blur');
};
// change事件进行表单校验
const onFieldChange = () => {
  validated('change');
};

// 监听 x-form 的errorType属性
watch(
  () => xForm.errorType,
  (nVal) => {
    errorType.value = nVal;
  }
);

const showError = (type: 'none' | 'message' | 'toast' | 'border-bottom') => {
  // 如果errorType数组中含有none，或者toast提示类型
  if (errorType.value.indexOf('none') >= 0) return false;
  else if (errorType.value.indexOf(type) >= 0) return true;
  else return false;
};

const xFormItem = reactive({
  ...toRefs(props),
  formItemEmitter: emitter,
  validated,
  resetField
});

// 🔺 通过 provide 向子组件提供数据 (vue3中微信小程序中是没有问题的) vue2中通过 this.$parent 去获取父组件的数据, 并且通过 broadcast 📢广播事件, 通知子组件去更新数据, 通过 dispatch 📢派发事件，去触发父组件的方法
provide('xFormItem', xFormItem);

// 组件挂载完成后，将自己的校验方法注册到父组件中
onMounted(() => {
  if (xForm) {
    // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
    Object.keys(parentData).forEach((key: string) => {
      parentData[key as keyof ParentDataProps] = xForm[key as keyof ParentDataProps];
    });
    // 🎯 只有 form-item 有 prop 属性才会将自己的校验方法注册到父组件中
    if (props.prop) {
      // 将本实例组件的属性跟方法添加到父组件中
      xForm.formEmitter.emit('addFileds', xFormItem);
      // 将父组件的 errorType 赋值给本实例组件的 errorType
      errorType.value = xForm.errorType;
      // 设置初始值
      initialValue.value = xForm.model[props.prop as string];
      // 🧐 FormItem监听子组件 （input，select）之类的 blur,change 事件
      emitter.on('on-form-blur', onFieldBlur);
      emitter.on('on-form-change', onFieldChange);
    }
  }
});

// 组件卸载前,取消监听
onBeforeUnmount(() => {
  if (xForm && props.prop) {
    emitter.off('on-form-blur', onFieldBlur);
    emitter.off('on-form-change', onFieldChange);
  }
});
</script>

<style lang="scss">
.x-form-item {
  display: flex;
  flex-direction: column;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: $x-main-color;
  line-height: $x-form-item-height;
  box-sizing: border-box;

  &__border-bottom--error {
    border-color: $x-type-error;
  }

  &__body {
    display: flex;
    flex-direction: row;
  }

  &--left {
    display: flex;
    align-items: center;
    flex-direction: row;
    &__content {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      flex: 1;
      padding-right: 10rpx;
      &--required {
        position: absolute;
        left: -16rpx;
        vertical-align: middle;
        padding-top: 6rpx;
        color: $x-type-error;
      }

      &__icon {
        margin-right: 8rpx;
      }

      &__label {
        display: flex;
        align-items: center;
        flex-direction: row;
      }
    }
  }

  &--right {
    flex: 1;
    &__content {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex: 1;
      &__slot {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: row;
        position: relative;
      }
      &__icon {
        margin-left: 10rpx;
        color: $x-light-color;
        font-size: 30rpx;
      }
    }

    switch {
      position: absolute;
      right: 5rpx;
      transform: scale(0.7);
    }
  }

  &__message {
    font-size: 24rpx;
    line-height: 24rpx;
    color: $x-type-error;
    margin-top: 12rpx;
  }
}

.x-border-bottom {
  border-bottom: 1rpx solid $x-border-color;
}
</style>
