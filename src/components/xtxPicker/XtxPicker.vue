<template>
  <view class="x-picker">
    <picker
      class="x-picker__picker"
      :mode="(mode as PickerMode)"
      :value="(defaultValue as PickerValue)"
      :disabled="disabled"
      :start="mode === 'date' || mode === 'time' ? start : ''"
      :end="mode === 'date' || mode === 'time' ? end : ''"
      :fields="mode === 'date' ? fields : ''"
      :custom-item="mode === 'region' ? customItem : ''"
      :selector-type="mode === 'selector' ? selectorType : ''"
      @change="handleChange"
      @cancel="handleCancel"
      @columnchange="handleColumnChange"
    >
      <view v-if="fullLocation" class="x-picker__picker__text">{{ fullLocation }}</view>
      <view v-else class="x-picker__picker__placeholder">{{ placeholder }}</view>
    </picker>
    <view class="x-picker__right-icon x-flex">
      <view v-if="isShowClear" class="x-picker__right-icon__clear x-picker__right-icon__item">
        <uni-icons type="clear" size="15" color="#c0c4cc" @click="onClear"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { PickerMode, DateFields, DefaultValues } from './types';
import { XFormItemProps } from '../xtxForm/types';
import { PickerValue } from '@uni-helper/uni-app-types';
import { ref, inject, computed, watch } from 'vue';

interface PickerProps {
  modelValue: DefaultValues;
  mode: PickerMode;
  disabled?: boolean;
  start?: string;
  end?: string;
  fields?: DateFields;
  customItem?: string;
  range?: any;
  rangeKey?: string;
  selectorType?: string;
  placeholder?: string;
  presentationText: string;
  clearable?: boolean; // 缺少默认值
}

const emit = defineEmits(['update:modelValue', 'change', 'coumnchange', 'cancel']);

const xFormItem = inject('xFormItem') as XFormItemProps;

const props = withDefaults(defineProps<PickerProps>(), {
  start: '',
  end: '',
  fields: 'day',
  customItem: '',
  range: [],
  rangeKey: '',
  selectorType: 'auto',
  placeholder: '请选择',
  clearable: true
});

const defaultValue = ref(props.modelValue);
// 是否显示清除按钮
const isShowClear = ref<boolean | undefined>(false);
// 用于用户界面展示的完整地址
const fullLocation = ref<string | undefined>(props.presentationText);

// Picker改变时触发
const handleChange = (event: any) => {
  fullLocation.value = event.detail.value.join('');
  emit('update:modelValue', event.detail.code);
  emit('change', event.detail);
  setTimeout(() => {
    // 将当前的值发送到 u-form-item 进行校验
    xFormItem.formItemEmitter.emit('on-form-change', event.detail.code);
  }, 40);
};

// Picker取消时触发
const handleCancel = (event: any) => {
  emit('cancel');
};

// Picker列改变时触发
const handleColumnChange = (event: any) => {
  emit('coumnchange', {
    column: event.detail.column,
    value: event.detail.value
  });
};

// 清除按钮点击事件
const onClear = () => {
  const type = Object.prototype.toString.call(props.modelValue).slice(8, 14);
  switch (type) {
    case 'String':
      emit('update:modelValue', '');
      setTimeout(() => {
        // 将当前的值发送到 u-form-item 进行校验
        xFormItem.formItemEmitter.emit('on-form-change', '');
      }, 40);
      break;
    case 'Number':
      emit('update:modelValue', 0);
      setTimeout(() => {
        // 将当前的值发送到 u-form-item 进行校验
        xFormItem.formItemEmitter.emit('on-form-change', 0);
      }, 40);
      break;
    default:
      emit('update:modelValue', []);
      setTimeout(() => {
        // 将当前的值发送到 u-form-item 进行校验
        xFormItem.formItemEmitter.emit('on-form-change', []);
      }, 40);
      break;
  }
  fullLocation.value = '';
};

// 👀 监听 modelValue 的变化, 回显picker的 value 选项位置, 用于清除按钮的显示隐藏
watch(
  () => props.modelValue,
  (val) => {
    defaultValue.value = val;
    isShowClear.value = props.clearable && ((val as unknown as string) != '' || !!val);
  },
  {
    deep: true,
    immediate: true
  }
);

// 👀 监听 presentationText 的变化, 回显 picker 选择后的中文项
watch(
  () => props.presentationText,
  (val) => {
    fullLocation.value = val;
  }
);
</script>

<style lang="scss">
:host {
  flex: 1;
}
</style>

<style lang="scss" scoped>
.x-picker {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  &__picker {
    font-size: 28rpx;
    color: $x-main-color;
    flex: 1;
    &__text {
      color: $x-main-color;
    }
    &__placeholder {
      color: $x-tips-color;
    }
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
