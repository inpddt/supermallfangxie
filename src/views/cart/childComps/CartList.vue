<template>
  <div class="cart-list">
  <scroll class="content" ref="cartScroll">
    <cart-list-item v-for="(item,index) in cartList" :key="index"
    :item-info="item">
    </cart-list-item>
  </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"
import {mapGetters} from "vuex"
export default {
  name:"CartList",
  computed:{
    ...mapGetters(["cartList"])
  },
  components:{
    Scroll,
    CartListItem
  },
  activated(){
    //原因：每次添加到购物车 scrollHeight可滚动区域发生了改变 
    this.$refs.cartScroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 133px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>