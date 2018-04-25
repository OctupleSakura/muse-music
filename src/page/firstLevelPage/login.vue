<template>
  <div class="login">
    <router-link class="back_content" to="/" tag="div">
      <mu-icon value="arrow_back" color="white" :size="26"></mu-icon> 
    </router-link>
     <div class="login_window" :class="{window_top:istop}">
         <div class="login_title">用户登录</div>
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
        snackbar: false,
        message: '登录成功',
        istop: false,
        disabled: false
     }
   },
   methods:{
     async login(){
        const res = await api.user.login(this.username,this.password);
        if(res.data==1){
          this.message='登录成功';
          this.showSnackbar();   
          this.disabled = true;
          if (this.windowtime) clearTimeout(this.windowtime);
          this.windowtime = setTimeout(() => {this.$router.push({path:'/'})}, 1000);           
        }
        else{
          this.message='用户名或密码错误';
          this.showSnackbar();
        }
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
  .login{
    width:100%;
    height:100%;
    background:url(../../assets/login_background.jpg);
    background-size:100% 100%;
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
</style>
