<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" :key="item" 
    :class="{active:index===currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}

.active{
   color: var(--color-high-text);
}

.tab-control-item span {
    padding: 5px;
  }

.active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>