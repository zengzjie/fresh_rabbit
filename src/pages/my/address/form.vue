<template>
  <view class="viewport">
    <view class="card">
      <!-- left-icon="person" -->
      <XtxForm ref="formRef" :model="form" :rules="rules" label-position="top">
        <XtxFormItem key="receiver" label="姓名" prop="receiver" :required="true">
          <XtxInput v-model="form.receiver" placeholder="请填写收货人姓名" />
        </XtxFormItem>
        <XtxFormItem
          key="contact"
          label="手机号码"
          prop="contact"
          :required="true"
          :label-width="190"
          left-icon="phone"
        >
          <XtxInput v-model="form.contact" placeholder="请填写收货人手机号码" />
        </XtxFormItem>
        <XtxFormItem
          key="region"
          label="收获城市"
          prop="region"
          :required="true"
          :label-width="190"
          left-icon="location"
        >
          <XtxPicker
            v-model="form.region"
            mode="region"
            placeholder="请选择收货人所在城市"
            :presentation-text="form.regionAddress"
            @change="handleRegionChange"
          />
        </XtxFormItem>
        <XtxFormItem key="address" label="详细地址" prop="address" :required="true" :label-width="190" left-icon="home">
          <XtxInput v-model="form.address" placeholder="请填写街道、楼牌号信息" />
        </XtxFormItem>
        <XtxFormItem key="isDefault" label="设置默认地址" :label-width="230" left-icon="notification">
          <template #right>
            <switch
              :checked="form.isDefault === 1"
              color="#27ba9b"
              style="transform: scale(0.7)"
              @change="isDefaultChange"
            />
          </template>
        </XtxFormItem>
      </XtxForm>
    </view>
    <button class="button" @tap="submitFrom">{{ props.id ? '保存' : '确定' }}</button>
    <!-- <button class="button" style="margin-top: 10px" @tap="reset">{{ '重置' }}</button> -->
  </view>
</template>

<script lang="ts" setup>
import { getMemberAddressById, postMemberAddress, putMemberAddress } from '@/services/address';
import { PostMemberAddressData } from '@/types/address';
import { Rules } from '@/utils/validate';
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive } from 'vue';
import XtxForm from '@/components/xtxForm/XtxForm.vue';
import XtxFormItem from '@/components/xtxForm/XtxFormItem.vue';
import XtxInput from '@/components/xtxInput/XtxInput.vue';
import XtxPicker from '@/components/xtxPicker/XtxPicker.vue';

// 接收 url 上的参数
const props = defineProps<{
  id: string;
}>();

const form = reactive({
  receiver: '', // 收货人姓名
  contact: '', // 收货人电话
  region: [], // 省市区编码
  regionAddress: '', // 省市区地址
  address: '', // 详细地址
  isDefault: 0, // 默认收货地址
  provinceCode: '', // 省编码
  cityCode: '', // 市编码
  countyCode: '' // 区编码
} as PostMemberAddressData);

const formRef = ref();

const rules: Rules = reactive({
  receiver: [{ required: true, message: '请填写收货人姓名', trigger: ['blur', 'change'] }],
  contact: [
    { required: true, message: '请填写收货人电话', trigger: ['blur', 'change'] },
    // 由于小程序等的限制, 不能传递正则表达式, 需要通过字符串方式传递
    { pattern: '^1[3-9]\\d{9}$', message: '请填写正确的手机号码', trigger: 'change' }
  ],
  region: [{ type: 'array', required: true, message: '请选择省市区', trigger: ['blur', 'change'] }],
  address: [{ required: true, message: '请填写详细地址', trigger: ['blur', 'change'] }]
});

// 设置导航标题
onLoad(() => {
  uni.setNavigationBarTitle({
    title: props.id ? '编辑地址' : '新增地址'
  });
});

onLoad(async () => {
  if (props.id) {
    const res = await getMemberAddressById(props.id);
    // 初始更新用于界面展示的 省 市 区 (无需添加到表单字段中，仅用于用户界面展示)
    form.regionAddress = res.fullLocation as string;
    form.region = [res.provinceCode, res.cityCode, res.countyCode];
    delete res.fullLocation;
    // 地址合并到表单中，用于点保存时，提交给后端用的
    Object.assign(form, res);
  }
});

// 省市区选择
const handleRegionChange = ({ code, postcode, value }: { code: string[]; postcode: string; value: string[] }) => {
  console.log(code, postcode, value, 'code, postcode, value');
  form.regionAddress = value.join('');
  // 收集省市区编码
  const [provinceCode, cityCode, countyCode] = code;
  Object.assign(form, {
    provinceCode,
    cityCode,
    countyCode,
    postalCode: postcode // 邮政编码
  });
};

// 设置默认地址
const isDefaultChange = (e: any) => {
  form.isDefault = e.detail.value ? 1 : 0;
};

// 重置
const reset = () => {
  formRef.value.resetFields();
  form.regionAddress = '';
};

// 保存
const submitFrom = () => {
  // 先校验表单
  formRef.value.validate(async (valid: boolean) => {
    console.log(form, 'form');
    if (valid) {
      if (props.id) {
        // 如果有 id 调用：修改地址请求
        await putMemberAddress(props.id, form);
        uni.showToast({
          title: '修改成功',
          icon: 'success',
          success: () =>
            setTimeout(() => {
              uni.navigateBack();
            }, 500)
        });
      } else {
        // 没有 id 调用：添加地址请求
        await postMemberAddress(form);
        uni.showToast({
          title: '添加成功',
          icon: 'success',
          success: () =>
            setTimeout(() => {
              uni.navigateBack();
            }, 500)
        });
      }
    }
  });
};
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx;

  .card {
    padding: 0 20rpx;
  }

  .button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: $gray-1;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: $green-4-1;
  }
}
</style>
