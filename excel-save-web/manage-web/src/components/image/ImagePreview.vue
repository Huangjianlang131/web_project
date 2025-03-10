<template>
  <!-- 过渡动画 -->
  <transition name="fade-enter-active">
    <div class="img-view" @click="close">
      <!-- 遮罩层 -->
      <div class="img-layer"></div>
      <div class="img" style="margin-top: -63em">
        <!-- 图片 -->
        <img :src="imgSrc" />
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "BigImg",
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  }, //接受图片地址
  data() {
    return {}
  },
  methods: {
    close() {
      // 发送事件
      this.$emit("close")
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
  transform: translate3D(0, 0, 0);
}
.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}

/* bigimg */
.img-view {
  /* position: inherit; */
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: zoom-out;
  z-index: 999;
  top: 0;
  left: 0;
}
/*遮罩层样式*/
.img-view .img-layer {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/*不限制图片大小，实现居中*/
.img-view .img img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10000;
  zoom: 1;
  /* margin-top: 10rem; */
}

</style>
