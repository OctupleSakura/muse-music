<template>
    <div class="myMessage" :style="{width:currentWidth+'px'}">
      <div class="header_content">
        <div class="img_content">
           <router-link class="header_img" to="/login"></router-link>
           <p>一口吃下唐僧肉</p>
        </div>
      </div>
      <div class="list">
         <mu-list>
             <mu-list-item title="我的音乐">
               <mu-icon slot="left" value="queue_music"/>
             </mu-list-item>
             <mu-list-item title="个人信息">
               <mu-icon slot="left" value="account_box"/>
             </mu-list-item>
         </mu-list>
      </div>
    </div>
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
   overflow:auto;
   background:#fff;
  } 
  .header_content{
    width:100%;
    height:12rem;
    box-sizing:border-box;
    padding-top:1rem;
    background:url(../../assets/background.jpg);
    background-size:100% 100%;
    .img_content{
       width:100%;
       text-align:center;
       .header_img{
         width:6rem;
         height:6rem;
         background:url(../../assets/head_img.jpg);
         background-size:100% 100%;
         border-radius:50%;
         display: inline-block;
       }
       p{
         color:#fff;
         margin-top:1rem;
       }
    }
  }
  .list{
    width:100%;
    font-size:12px;
    text-align:left;
    .mu-list{
      padding:0;
      .mu-item.show-left{
        padding-left:55px;
      }
    }
  }
</style>

