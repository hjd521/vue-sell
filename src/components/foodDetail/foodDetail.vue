<template>
    <div class="food-detail-wrapper"></div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        showWrapper: false
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showWrapper = true;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .food-detail-wrapper
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background-color: #fff
</style>
