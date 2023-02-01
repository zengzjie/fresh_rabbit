<template>
  <!-- 这是一个用户指引蒙层例子 -->
  <view v-if="show" class="user-guide">
    <view id="visual-view" class="visual-view">
      <view class="tip">{{ currentTip.tip }}</view>
    </view>

    <view class="btn-list">
      <button class="btn" @click="close">知道了</button>
      <button v-if="!isEnd" class="btn next" @click="moveView">下一步</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onUpdated, computed } from 'vue';

interface IProps {
  /** 是否显示 */
  show: boolean;
  /** 提示信息列表 */
  list: TipItem[];
}

interface TipItem {
  /** 操作区域位置坐标及大小 */
  width: number;
  height: number;
  top: number;
  left: number;
  /** 操作提示内容 */
  tip: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:show']);
const step = ref(0);
const isEnd = computed(() => step.value === props.list.length - 1);

let isFirstUpdate = false;
onUpdated(() => {
  if (!isFirstUpdate) {
    // 初始化第一个提示
    currentTip.value = props.list[0];
    isFirstUpdate = true;
  }
});

// 关闭提示
function close() {
  emit('update:show', false);
}

const { proxy }: any = getCurrentInstance();
// 给个初始值，否则template中渲染对象报错
const currentTip = ref<TipItem>({
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  tip: ''
});

// 切换下一个
function moveView() {
  const preTip = currentTip.value;
  step.value += 1;
  currentTip.value = props.list[step.value];
  const nextTip = currentTip.value;
  proxy.$scope.animate(
    '#visual-view',
    [
      {
        top: `${preTip.top}px`,
        left: `${preTip.left}px`,
        width: `${preTip.width}px`,
        height: `${preTip.height}px`
      },
      {
        top: `${nextTip.top}px`,
        left: `${nextTip.left}px`,
        width: `${nextTip.width}px`,
        height: `${nextTip.height}px`
      }
    ],
    300, // 动画过渡时间
    () => {
      // 调用 animate API 后会在节点上新增一些样式属性覆盖掉原有的对应样式，在动画结束后需要清除增加的属性
      proxy.$scope.clearAnimation();
    }
  );
}
</script>

<style lang="scss">
.user-guide {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  .visual-view {
    position: absolute;
    width: 200rpx;
    height: 100rpx;
    background: transparent;
    border-radius: 10px;
    box-shadow: 0 0 0 1999px rgba(0, 0, 0, 0.55);
    z-index: 10;
    .tip {
      position: absolute;
      z-index: 11;
      bottom: -30px;
      color: $gray-1;
    }
  }

  .guide-btn {
    position: absolute;
    z-index: 11;
    bottom: 200px;
  }
}
.btn-list {
  position: fixed;
  bottom: 100px;
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 11;
  .btn {
    margin: 0;
    &.next {
      color: #5080ff;
      margin-left: 10px;
    }
  }
}
</style>

<!-- 页面中使用示例
<template>
    <view id="tip-one" >点击区域一</view>
    <view id="tip-two" >点击区域二</view>
    <view id="tip-three" >点击区域三</view>

    <UserGuide v-model:show="showGuide" :list="guideList" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import UserGuide from '@/components/user-guide.vue'

  interface TipItem {
    /** 操作区域位置坐标及大小 */
    width: number
    height: number
    top: number
    left: number
    /** 操作提示内容 */
    tip: string
  }

  const showGuide = ref(true)
  const guideList = ref<TipItem[]>([])

  // 假设我们页面中需要提示三个操作区域，提示内容如下：
  const guideTips = ['点击这里赚积分', '点击这里得礼品', '点击分享赚...']
  
  // 获取点击区域在页面中的坐标信息
  const query = uni.createSelectorQuery()
  query.select('#tip-one').boundingClientRect()
  query.select('#tip-two').boundingClientRect()
  query.select('#tip-three').boundingClientRect()
  query.exec((res) => {
    guideList.value = res.map((item: TipItem, index: number) => {
      item.tip = guideTips[index]
      return item
    })
  })
</script> 
-->
