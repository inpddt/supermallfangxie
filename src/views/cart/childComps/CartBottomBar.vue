<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算：({{checkLength}})</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll(){
      if(this.cartList.length!==0){
        return !this.cartList.find(item=>!item.checked)
      }
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item=>item.checked=false)
      }else{
        this.cartList.forEach(item=>item.checked=true)
      }
    },
    calcClick(){
      if(this.checkLength===0){
        this.$toast.show("请选择购买的商品",2000)
      }
    }
  }
};
</script>

<style>
.bottom-bar {
  display: flex;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  background-color: #ccc;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 80px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.totalPrice {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>