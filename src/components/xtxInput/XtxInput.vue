<template>
  <view
    class="x-input"
    :class="{
      'x-input--border': border,
      'x-input--error': validateState
    }"
    :style="{
      padding: `0 ${border ? 20 : 0}rpx`,
      borderColor: borderColor,
      textAlign: inputAlign
    }"
    @tap.stop="inputClick"
  >
    <textarea
      v-if="type == 'textarea'"
      class="x-input__input x-input__textarea"
      :style="[getStyle]"
      :value="(defaultValue as string)"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :disabled="disabled"
      :maxlength="inputMaxlength"
      :fixed="fixed"
      :focus="focus"
      :autoHeight="autoHeight"
      :selection-end="uSelectionEnd"
      :selection-start="uSelectionStart"
      :cursor-spacing="getCursorSpacing"
      :show-confirm-bar="showConfirmbar"
      :adjust-position="adjustPosition"
      @input="handleInput"
      @blur="handleBlur"
      @focus="onFocus"
      @confirm="onConfirm"
    ></textarea>
    <input
      v-else
      class="x-input__input"
      :type="type == 'password' ? ('text' as _InputType) : (type as _InputType)"
      :style="[getStyle]"
      :value="(defaultValue as string)"
      :password="type == 'password' && !showPassword"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :disabled="disabled || type === 'select'"
      :maxlength="inputMaxlength"
      :focus="focus"
      :confirmType="(confirmType as _InputConfirmType)"
      :cursor-spacing="getCursorSpacing"
      :selection-end="uSelectionEnd"
      :selection-start="uSelectionStart"
      :show-confirm-bar="showConfirmbar"
      :adjust-position="adjustPosition"
      @focus="onFocus"
      @blur="handleBlur"
      @input="handleInput"
      @confirm="onConfirm"
    />
    <view class="x-input__right-icon x-flex">
      <view
        v-if="clearable && modelValue != '' && focused"
        class="x-input__right-icon__clear x-input__right-icon__item"
      >
        <uni-icons type="clear" size="15" color="#c0c4cc" @click="onClear"></uni-icons>
      </view>
      <view v-if="passwordIcon && type == 'password'" class="x-input__right-icon__clear x-input__right-icon__item">
        <uni-icons
          size="15"
          :type="!showPassword ? 'eye' : 'eye-filled'"
          color="#c0c4cc"
          @click="showPassword = !showPassword"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, computed, inject } from 'vue';
import { XFormItemProps } from '../xtxForm/types';
import { _InputConfirmType, _InputType } from './types';

const xFormItem = inject('xFormItem') as XFormItemProps;

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  // 输入框的类型，textarea，text，number
  type: {
    type: String,
    default: 'text'
  },
  inputAlign: {
    type: String,
    default: 'left'
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: [Number, String],
    default: 140
  },
  placeholderStyle: {
    type: String,
    default: 'color: #c0c4cc;'
  },
  confirmType: {
    type: String,
    default: 'done'
  },
  // 输入框的自定义样式
  customStyle: {
    type: Object,
    default() {
      return {};
    }
  },
  // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
  fixed: {
    type: Boolean,
    default: false
  },
  // 是否自动获得焦点
  focus: {
    type: Boolean,
    default: false
  },
  // 密码类型时，是否显示右侧的密码图标
  passwordIcon: {
    type: Boolean,
    default: true
  },
  // input|textarea是否显示边框
  border: {
    type: Boolean,
    default: false
  },
  // 输入框的边框颜色
  borderColor: {
    type: String,
    default: '#dcdfe6'
  },
  autoHeight: {
    type: Boolean,
    default: true
  },
  // 高度，单位rpx
  height: {
    type: [Number, String],
    default: ''
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: true
  },
  // 指定光标与键盘的距离，单位 px
  cursorSpacing: {
    type: [Number, String],
    default: 0
  },
  // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
  selectionStart: {
    type: [Number, String],
    default: -1
  },
  // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
  selectionEnd: {
    type: [Number, String],
    default: -1
  },
  // 是否自动去除两端的空格
  trim: {
    type: Boolean,
    default: true
  },
  // 是否显示键盘上方带有”完成“按钮那一栏
  showConfirmbar: {
    type: Boolean,
    default: true
  },
  // 弹出键盘时是否自动调节高度，uni-app默认值是true
  adjustPosition: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'confirm', 'clear', 'click']);

const defaultValue = ref(props.modelValue);
const inputHeight = ref(70); // input的高度
const textareaHeight = ref(100); // textarea的高度
const validateState = ref(false); // 当前input的验证状态，用于错误时，边框是否改为红色
const focused = ref(false); // 当前是否处于获得焦点的状态
const showPassword = ref(false); // 是否预览密码

// 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
const inputMaxlength = computed(() => Number(props.maxlength));
const getStyle = computed(() => {
  let style: any = {};
  // 如果没有自定义高度，就根据type为input还是textarea来分配一个默认的高度
  style.minHeight = props.height
    ? props.height + 'rpx'
    : props.type == 'textarea'
    ? textareaHeight.value + 'rpx'
    : inputHeight.value + 'rpx';
  style = Object.assign(style, props.customStyle);
  return style;
});
// 光标间距
const getCursorSpacing = computed(() => Number(props.cursorSpacing));
// 光标起始位置
const uSelectionStart = computed(() => Number(props.selectionStart));
// 光标结束位置
const uSelectionEnd = computed(() => Number(props.selectionEnd));

// 修改输入框变红的状态
const onFormItemError = (status: boolean) => {
  validateState.value = status;
};

// 监听u-form-item发出的错误事件，将输入框边框变红色
xFormItem.formItemEmitter.on('on-form-item-error', (status: boolean) => onFormItemError(status));

/**
 * change 事件
 * @param event
 */
const handleInput = (event: any) => {
  let value = event.detail.value;
  if (props.trim) {
    value = value.trim();
  }
  emit('update:modelValue', value);
  // 当前model赋值
  defaultValue.value = value;
  // 过一个生命周期再发送事件给xtx-form-item，否则emit('input')更新了父组件的值，但是微信小程序上
  // 尚未更新到xtx-form-item，导致获取的值为空，从而校验混论
  setTimeout(() => {
    // 将当前的值发送到 u-form-item 进行校验
    xFormItem.formItemEmitter.emit('on-form-change', value);
  }, 40);
};

/**
 * blur 事件
 * @param event
 */
const handleBlur = (event: any) => {
  // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
  let value = event.detail.value;
  setTimeout(() => {
    focused.value = false;
  }, 100);
  emit('blur', value);
  setTimeout(() => {
    // 将当前的值发送到 u-form-item 进行校验
    xFormItem.formItemEmitter.emit('on-form-blur', value);
  }, 40);
};

const onFocus = (event: any) => {
  focused.value = true;
  emit('focus');
};

const onConfirm = (event: any) => {
  emit('confirm', event.detail.value);
};

const onClear = (event: any) => {
  emit('update:modelValue', '');
};

const inputClick = (event: any) => {
  emit('click');
};

watch(
  () => props.modelValue,
  (nVal) => {
    defaultValue.value = nVal;
  }
);
</script>

<style lang="scss">
:host {
  flex: 1;
}
</style>

<style lang="scss" scoped>
.x-input {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  &__input {
    font-size: 28rpx;
    color: $x-main-color;
    flex: 1;
  }
  &__textarea {
    width: auto;
    font-size: 28rpx;
    color: $x-main-color;
    padding: 10rpx 0;
    line-height: normal;
    flex: 1;
  }
  &--border {
    border-radius: 4px;
    border: 1px solid $x-form-item-border-color;
  }
  &--error {
    border-color: $x-type-error !important;
  }
  &__right-icon {
    &__item {
      uni-icons {
        padding: 0 10px;
      }
    }
  }
}
</style>
