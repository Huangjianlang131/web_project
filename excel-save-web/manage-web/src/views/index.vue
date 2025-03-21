<template>
  <div>
    <webHeader></webHeader>
    <!-- <excelView></excelView> -->
  </div>
</template>

<script>
import webHeader from './header/index.vue'
import excelView from "./excelView"

export default {
  components:{
    excelView,
    webHeader,
  }

}
</script>

<style scoped>

</style>