<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart">
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    name: '',
    created () {
      console.log(this.food)
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (e) {
        if (!e._constructed){
          return
        } // 阻止pc端触发两次
        if (!this.food.count){
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
      },
      decreaseCart (e) {
        if (!e._constructed){
          return;
        } // 阻止pc端触发两次
        if (this.food.count > 0) {
          this.food.count --;
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .cartcontrol
    font-size 0
    .move-enter-active
      transition all .3s ease
    .move-enter
      transform translate3D(24px,0,0)
      opacity 0
    .cart-decrease
      display inline-block
      padding: 6px
      padding: 6px
      display inline-block
      line-height 24px
      color rgb(0, 160, 220)
      font-size 24px
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      color rgb(147,153,159)
      font-size 10px
    .cart-add
      padding: 6px
      display inline-block
      line-height 24px
      color rgb(0, 160, 220)
      font-size 24px
</style>
