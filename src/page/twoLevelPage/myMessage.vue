<template>
    <div class="myMessage" :style="{width:currentWidth+'px'}">3</div>
</template>
<script>
  export default {
    name:'myMessage',
    data(){
      return{
        currentWidth:0,
      }
    },
    mounted(){
      this.currentWidth = document.body.clientWidth; 
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/public';
  .myMessage{
   width:100%;
   height:100%;
  } 
</style>

