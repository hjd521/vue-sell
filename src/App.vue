<template>
  <div id="app">
    <div class="header">
      <v-header></v-header>
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
  import vHeader from './components/header/header.vue';
  export default {
    components: {
      vHeader
    },
    name: 'app'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*vue-loader会自动处理display：flex的兼容问题*/
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align: center

</style>
