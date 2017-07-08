<template>
  <div id="app">
    <div class="header">
      <v-header></v-header>
    </div>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">
      I am content
    </div>
  </div>
</template>

<script>
  import vHeader from './components/header/header.vue'
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
