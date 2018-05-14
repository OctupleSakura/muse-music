<template>
    <div class="myMessage" :style="{width:currentWidth+'px'}">
      <div class="header_content">
        <div class="img_content" v-if="isLogin">
           <div class="header_img"></div>
           <p>{{this.$store.state.username}}</p>
        </div>
        <div class="login_content" v-if="!isLogin">
          <router-link to="/login">
             <mu-raised-button label="登录 / 注册" class="demo-raised-button" primary/>
          </router-link>
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
             <mu-list-item title="退出登录" @click="open" v-if="isLogin">
               <mu-icon slot="left" value="exit_to_app"/>
             </mu-list-item>
         </mu-list>
      </div>
        <mu-dialog :open="dialog" title="exit" @click="close">
          确定要退出登录吗？
          <mu-flat-button slot="actions" @click="close" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="exit" label="确定"/>
        </mu-dialog>
    </div>
</template>
<script>
  import api from '../../api/api';
  import {mapMutations} from 'vuex';
  export default {
    name:'myMessage',
    data(){
      return{
        currentWidth:0,
        isLog:this.isLogin,
        dialog:false
      }
    },
    props:{
      isLogin:{
        type:false,
        default:false
      }
    },
    mounted(){
      this.currentWidth = document.body.clientWidth; 
    },
    methods:{
      ...mapMutations([
        'setUserId',
        'setUserName'
      ]),
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      async exit(){
        let exit = await api.user.exit();
        if(exit == 1){
          this.setUserId('');
          this.setUserName('');
          this.$emit('changeState',false);
          this.dialog = false
        }
        else{
          console.log('exit error');
          this.dialog = false
        }
      }
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
    background:url(../../assets/background.jpg);
    background-size:100% 100%;
    display: flex;
    align-items: center;
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
    .login_content{
      line-height:12rem;
      width:100%;
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

