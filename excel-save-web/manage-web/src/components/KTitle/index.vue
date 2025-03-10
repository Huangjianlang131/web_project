<template>
  <div>
    <div class="group">
      <div :style="{'background-color': iconColor}" class="icon">
      </div>
      <div class="title" :style="{color: textColor}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: () => {
        return '#C50405'
      }
    },
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    textColor: {
      type: String,
      default: () => {
        return '#C50405'
      }
    }
  }
}
</script>

<style scoped>
.group{
  display: flex;
  font-size: 19px;
  font-weight: 600;
  align-items: center;
}
.icon{
  width: 3px;
  height: 18px;
  margin-right: 8px;
  border-radius: 3px;
}
.title{
  font-size: 18px;
  color: #C50405;
  font-weight: 700;
}
</style>