<template>
  <div class="head">
    <div class="content-wrapper">
      <div class="avatar">
        <img width='64' height='64' :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" v-text="seller.name"></span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon"></span>
          <span class="text" v-text="seller.supports[0].description"></span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object,
      }
    },
    name: ''
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    color: #fff
    background: #210
    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        font-size: 14px
      .content
        display: inline-block
        font-size: 14px
        margin-left: 16px

</style>
