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
  // ?????????????????????textarea???text???number
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
    default: '???????????????'
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
  // ???????????????????????????
  customStyle: {
    type: Object,
    default() {
      return {};
    }
  },
  // ?????? textarea ???????????? position:fixed ???????????????????????????????????? fixed ??? true
  fixed: {
    type: Boolean,
    default: false
  },
  // ????????????????????????
  focus: {
    type: Boolean,
    default: false
  },
  // ???????????????????????????????????????????????????
  passwordIcon: {
    type: Boolean,
    default: true
  },
  // input|textarea??????????????????
  border: {
    type: Boolean,
    default: false
  },
  // ????????????????????????
  borderColor: {
    type: String,
    default: '#dcdfe6'
  },
  autoHeight: {
    type: Boolean,
    default: true
  },
  // ???????????????rpx
  height: {
    type: [Number, String],
    default: ''
  },
  // ???????????????
  clearable: {
    type: Boolean,
    default: true
  },
  // ??????????????????????????????????????? px
  cursorSpacing: {
    type: [Number, String],
    default: 0
  },
  // ???????????????????????????????????????????????????selection-end????????????
  selectionStart: {
    type: [Number, String],
    default: -1
  },
  // ???????????????????????????????????????????????????selection-start????????????
  selectionEnd: {
    type: [Number, String],
    default: -1
  },
  // ?????????????????????????????????
  trim: {
    type: Boolean,
    default: true
  },
  // ?????????????????????????????????????????????????????????
  showConfirmbar: {
    type: Boolean,
    default: true
  },
  // ??????????????????????????????????????????uni-app????????????true
  adjustPosition: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'confirm', 'clear', 'click']);

const defaultValue = ref(props.modelValue);
const inputHeight = ref(70); // input?????????
const textareaHeight = ref(100); // textarea?????????
const validateState = ref(false); // ??????input????????????????????????????????????????????????????????????
const focused = ref(false); // ???????????????????????????????????????
const showPassword = ref(false); // ??????????????????

// ??????uniapp???input?????????maxlength?????????????????????????????????????????????????????????????????????????????????
const inputMaxlength = computed(() => Number(props.maxlength));
const getStyle = computed(() => {
  let style: any = {};
  // ???????????????????????????????????????type???input??????textarea??????????????????????????????
  style.minHeight = props.height
    ? props.height + 'rpx'
    : props.type == 'textarea'
    ? textareaHeight.value + 'rpx'
    : inputHeight.value + 'rpx';
  style = Object.assign(style, props.customStyle);
  return style;
});
// ????????????
const getCursorSpacing = computed(() => Number(props.cursorSpacing));
// ??????????????????
const uSelectionStart = computed(() => Number(props.selectionStart));
// ??????????????????
const uSelectionEnd = computed(() => Number(props.selectionEnd));

// ??????????????????????????????
const onFormItemError = (status: boolean) => {
  validateState.value = status;
};

// ??????u-form-item???????????????????????????????????????????????????
xFormItem.formItemEmitter.on('on-form-item-error', (status: boolean) => onFormItemError(status));

/**
 * change ??????
 * @param event
 */
const handleInput = (event: any) => {
  let value = event.detail.value;
  if (props.trim) {
    value = value.trim();
  }
  emit('update:modelValue', value);
  // ??????model??????
  defaultValue.value = value;
  // ???????????????????????????????????????xtx-form-item?????????emit('input')???????????????????????????????????????????????????
  // ???????????????xtx-form-item????????????????????????????????????????????????
  setTimeout(() => {
    // ???????????????????????? u-form-item ????????????
    xFormItem.formItemEmitter.emit('on-form-change', value);
  }, 40);
};

/**
 * blur ??????
 * @param event
 */
const handleBlur = (event: any) => {
  // ??????????????????????????????????????????????????????????????????????????????@blur??????????????????????????????????????????????????????????????????
  let value = event.detail.value;
  setTimeout(() => {
    focused.value = false;
  }, 100);
  emit('blur', value);
  setTimeout(() => {
    // ???????????????????????? u-form-item ????????????
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
