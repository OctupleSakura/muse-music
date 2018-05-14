<template>
  <div class="login">
    <router-link class="back_content" to="/" tag="div">
      <mu-icon value="arrow_back" color="white" :size="26"></mu-icon> 
    </router-link>
    <transition-group name="slide-fade" mode="out-in">
      <div class="login_window" key="login"  :class="{window_top:istop}" v-show="isLogin">
         <div class="login_title">
           用户登录
          <div class="login_change_page" @click="isLogin=!isLogin">注册></div>
         </div>
         <div class="login_input_content">
           <mu-text-field hintText="请输入用户名" 
                          icon="account_circle" 
                          iconClass="loginIcon" 
                          underlineClass="loginLine"
                          underlineFocusClass="loginLine"
                          hintTextClass="loginHintText"
                          @focus="window_move(1)"
                          @blur="window_move(0)"
                          v-model="username"
                          fullWidth/><br/>
           <mu-text-field hintText="请输入密码" 
                          icon="settings"
                          type="password"
                          iconClass="loginIcon"
                          underlineClass="loginLine"
                          underlineFocusClass="loginLine"
                          hintTextClass="loginHintText"
                          @focus="window_move(1)"
                          @blur="window_move(0)"
                          v-model="password"
                          fullWidth/>
           <mu-raised-button label="确认登录" 
                             class="demo-raised-button" 
                             @click="login"
                             :disabled="disabled"
                             primary 
                             fullWidth/>
           <p class="forget_password">忘记密码</p>
         </div>
      </div>
      <div class="login_window register" key="register" :class="{window_top:istop}" v-show="!isLogin">
         <div class="login_title">
           用户注册
           <div class="login_change_page" @click="isLogin=!isLogin">登录></div>
         </div>
         <div class="login_input_content">
           <mu-text-field hintText="请输入用户名" 
                          icon="account_circle" 
                          iconClass="loginIcon" 
                          underlineClass="loginLine"
                          underlineFocusClass="loginLine"
                          hintTextClass="loginHintText"
                          @focus="window_move(1)"
                          @blur="window_move(0)"
                          v-model="username"
                          fullWidth/><br/>
           <mu-text-field hintText="请输入密码" 
                          icon="settings"
                          type="password"
                          iconClass="loginIcon"
                          underlineClass="loginLine"
                          underlineFocusClass="loginLine"
                          hintTextClass="loginHintText"
                          @focus="window_move(1)"
                          @blur="window_move(0)"
                          v-model="password"
                          fullWidth/>
           <mu-raised-button label="注册" 
                             class="demo-raised-button" 
                             @click="register"
                             :disabled="disabled"
                             primary 
                             fullWidth/>
         </div>
      </div>  
    </transition-group>
     <mu-snackbar v-if="snackbar" :message="message"  @actionClick="hideSnackbar" @close="hideSnackbar"/>
  </div>
</template>
<script>
 import api from '../../api/api';
 export default {
   name:'login',
   data(){
     return{
        username:'',
        password:'',
        isLogin:true,//true为登录,false为注册
        snackbar: false,
        message: '登录成功',
        istop: false,
        disabled: false
     }
   },
   methods:{
     async login(){
        this.disabled = true;
        const res = await api.user.login(this.username,this.password);
        if(res.data==1){
          this.message='登录成功';
          this.showSnackbar();     
          if (this.windowtime) clearTimeout(this.windowtime);
          this.windowtime = setTimeout(() => {this.$router.push({path:'/'})}, 1000);           
        }
        else{
          this.message='用户名或密码错误';
          this.showSnackbar();
          this.disabled = false;
        }
     },
     async register(){
        this.disabled = true;
        try {
          const register = await api.user.register(this.username,this.password);
          if(register[0].uid){
             this.message='注册成功';
             this.showSnackbar();
             setTimeout(()=>{
               this.hideSnackbar();
               this.login();
             },1000)
          }else if(register=='repeat name'){
             this.message='用户名重复';
          } 
        } catch (error) {
          this.message= error;
        }
        this.showSnackbar();
        this.disabled = false;
     },
    showSnackbar () {
      this.snackbar = true;
      if (this.snackTimer) clearTimeout(this.snackTimer);
      this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000);
    },
    hideSnackbar () {
      this.snackbar = false;
      if (this.snackTimer) clearTimeout(this.snackTimer);
    },
    window_move(num){
       this.istop= num?true:false;
    }
   }
 }
</script>
<style lang="less">
  @import '../../assets/public';
  .login{
    width:100%;
    height:100%;
    background:url(../../assets/login_background.jpg);
    background-size:100% 100%;
    .register{
      height:14rem!important;
    }
    .login_window{
      width:85%;
      height:16rem;
      background:#fff;
      position: absolute;
      margin:auto;
      left:0;
      right:0;
      top:0;
      bottom:0;
      box-sizing:border-box;
      border-radius:10px;
      overflow: hidden;
      transition:0.2s all;
      .forget_password{
        font-size:12px;
        color:#999999;
        margin-top:15px;
      }
      .mu-raised-button{
        margin-top:5px;
      }
      .login_title{
        width:100%;
        height:3rem;
        background:rgb(240,240,240);
        text-align:center;
        line-height:3rem;
        font-size:16px;
        position:relative;
        .login_change_page{
          color:@theme-color;
          font-size:12px;
          position: absolute;
          right:10px;
          top:0;
        }
      }
      .login_input_content{
        width:90%;
        margin:0 auto;
        .mu-text-field{
           width:100%;
           left:0;
        }
      }
    }
  }
  .back_content{
    text-align: left;
    padding-top: 20px;
    padding-left: 20px;
  }
  .loginIcon{
    top:7px!important;
    left:7px!important;
  }
  .loginLine{
    left:0!important;
    left:7px!important;
  }
  .loginHintText{
    left:10px;
  }
  .loginButton{
    margin-top:20px;
  }
  .window_top{
    transform:translateY(50deg);
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: opacity .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
</style>
