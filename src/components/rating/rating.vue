<template>
  <div class="rat">
    I am rating
    <div class="grad" @click="grandparent">
      grad
      <div class="self" @click="parent" :class="{a:classes,b:color}">
        self
        <div class="child" @click.stop="self" :title="mag">
          child
          <li v-for="(item,index) in arr" v-text="arr[index]" :style="{background:colors[index]}"></li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //v-bind:style/class-array,object 动态的class和之前的不产生冲突，动态的权重比较低
  //[x,y]/{a:x,b,y}/{a:x==2?d:b}
  //computed:{
  // a:{
  //  get(){
  // console.log('get')},
  //set(){
  //
  // }
  // }
  // }
  /*
   @some(item){}如果有true返回true，否则一直找下去知道找到true，如果没找到则返回false;
   arr.some(item){
   return item.sel;
   }
   */
  export default {
    name: '',
    methods: {
      self(){
        alert('self');
      },
      parent(){
        alert('parent');
      },
      grandparent(){
        alert('grand');
      }
    },
    data(){
      return {
        mag: '随意',
        classes: 'a',
        color: 'red',
        arr: [1, 2, 3, 4, 5],
        colors: ['red', 'black', 'green', 'yellow', 'pink']
      }
    }
  }
</script>

<style>
</style>
