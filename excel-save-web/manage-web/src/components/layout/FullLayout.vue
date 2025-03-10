<template>
  <a-card style="height:100%" :bodyStyle="{ height: 100 + '%', padding: 0, overflowX: 'hidden' }">
    <div class="showExit" v-if="fullscreen && fullflag">
      <transition mode="out-in">
        <h2 v-if="fullscreen" :class="$route.name === 'modelTopo' ? 'whiteFont' : ''">按esc退出全屏</h2>
      </transition>
    </div>
    <slot />
  </a-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      fullscreen: 'getFullscreen',
      fullflag: 'getFullflag'
    })
  }
}
</script>
<style scoped>
.showExit {
  position: absolute;
  width: 100%;
  z-index: 10000;
  margin-top: 48px;
}
.showExit > h2 {
  width: 150px;
  margin: 0 auto;
  text-align: center;
  border-radius: 75px;
  background: rgba(65, 55, 55, 0.65);
}
.whiteFont {
  color: #fff;
}
</style>
