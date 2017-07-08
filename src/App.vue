<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/rating'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="content">
      I am content
    </div>
  </div>
</template>

<script>
  import vHeader from 'components/header/header.vue';
  import api from './fetch/api.js';
  export default {
    data() {
      return {
        seller: {}
      }
    },
    components: {
      vHeader
    },
    name: 'app',
    created(){
      api.getSeller().then((res) => {
        this.seller = res.data;
        console.log(this.seller);
      }).catch((err) => {
        console.error(err);
      });
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../src/common/stylus/mixin.styl"
  /*vue-loader会自动处理display：flex的兼容问题*/
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      /*解决一像素的问题*/
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          text-decoration: none
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color rgb(2240, 20, 20)


</style>
