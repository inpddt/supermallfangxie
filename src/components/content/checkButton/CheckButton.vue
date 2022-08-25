<template>
  <div class="check-button" :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:"CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.check-button {
  background-color: #fff;
  border-radius: 50%;
  border:1px solid #aaa;
}
.active{
  border-color: #ff5777;
  background-color: #ff5777;
}
</style>