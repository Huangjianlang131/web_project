<template>
  <a-row :gutter="gutter">
    <a-col
      style="height:100%;padding-right:0;"
      :xs="24"
      :sm="24"
      :md="lsize"
      :lg="lsize"
      :xl="lsize">
      <a-card :bodyStyle="{ padding: leftpadding + 'px', height: 100 + '%' }">
        <slot name="left"></slot>
      </a-card>
    </a-col>
    <a-col
      style="height:100%"
      v-show="msize === 0"
      :xs="24"
      :sm="24"
      :md="msize"
      :lg="msize"
      :xl="msize">
      <slot name="middle"></slot>
    </a-col>
    <a-col
      style="height:100%;"
      :xs="24"
      :sm="24"
      :md="rsize"
      :lg="rsize"
      :xl="rsize">
      <a-card :bodyStyle="{ padding: rightpadding + 'px' }">
        <slot name="right"></slot>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
export default {
  props: {
    gutter: {
      type: Number,
      default: 24
    },
    lsize: {
      type: Number,
      default: 0
    },
    msize: {
      type: Number,
      default: 4
    },
    rsize: {
      type: Number,
      default: 12
    }
  },
  data () {
    return {
      leftpadding: this.$route.name === 'subAttribute' ? 0 : 10,
      rightpadding:
        this.$route.name === 'cabinetView' || this.$route.name === 'configItem' || this.$route.name === 'subAttribute' ? 0 : 10
    }
  }
}
</script>
<style scoped>
.ant-row {
  height: 100%;
}
:deep() .ant-card {
  height: 100%;
  overflow: hidden auto;
}
</style>
