<template>
  <div class="login">
    <router-link class="back_content" to="/" tag="div">
      <mu-icon value="arrow_back" color="white" :size="26"></mu-icon> 
    </router-link>
     <div class="login_window">
         <div class="login_title">用户登录</div>
         <div class="login_input_content">
           <mu-text-field hintText="请输入用户名" 
                          type="number" 
                          icon="account_circle" 
                          iconClass="loginIcon" 
                          underlineClass="loginLine"
                          underlineFocusClass="loginLine"
                          hintTextClass="loginHintText"
                          fullWidth/><br/>
           <mu-text-field hintText="请输入密码" 
                          type="number" 
                          icon="settings"
                          iconClass="loginIcon"
                          underlineClass="loginLine"
                          underlineFocusClass="loginLine"
                          hintTextClass="loginHintText"
                          fullWidth/>
           <mu-raised-button label="确认登录" 
                             class="demo-raised-button" 
                             primary 
                             fullWidth/>
           <p class="forget_password">忘记密码</p>
         </div>
     </div>
  </div>
</template>
<script>
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
      bottom:20px;
      box-sizing:border-box;
      border-radius:10px;
      overflow: hidden;
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
</style>
