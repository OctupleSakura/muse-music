<template>
  <div id="app">
    <transition name="up" in-out>
      <keep-alive exclude="login">
        <router-view class="child-view"/>
      </keep-alive>
    </transition>
    <audio :src="songUrl" ref="audio"></audio>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex"
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  methods:{
   ...mapMutations([
      'setCurrentDuration',
      'setDuration',
      'playControl'
    ]),
    currentTime(){
      //回调事件  用于在vuex中更新当前音乐时间
      if(this.$refs.audio.currentTime>=this.$refs.audio.duration){
         this.playControl(false);
         return;
      }
      if(this.$store.state.changeState!=1){
        this.setCurrentDuration(this.$refs.audio.currentTime);  
      }
    }
  },
  computed:{
    ...mapState([
       'songUrl',
       'currentPlay',
       'changeState',
       'currentDuration'
    ]),
  },
  watch:{
    currentPlay(val,newval){//监听currentPlay,当它改变时同时改变音乐状态
       let audio = this.$refs.audio;
       if(audio.paused){ 
          audio.play();// 播放 
        }else{
          audio.pause();// 暂停
        }
    },
    changeState(val,newval){//对手动切换状态进行监听,如果是从1变为0的话则改变音乐时间
      if(newval==1&&val==0){
        this.$refs.audio.currentTime = this.currentDuration;
      }
    },
    async songUrl(){
      await this.$nextTick()
      this.$refs.audio.ondurationchange = ()=>{
        this.setDuration(this.$refs.audio.duration);//对音乐的url进行监听，当url改变时，随之设置音乐的时间
      }
    }
  },
  mounted(){
    this.$refs.audio.addEventListener('timeupdate',this.currentTime);//监听audio的timeupdate事件，动态更新当前音乐时间
  }
}
</script>

<style lang="less">
@import 'assets/public';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
}
 body,html{
    width:100%;
    height:100%;
    margin:0;
    padding:0;
    background:#f4f4f4;
  }
  p{
    margin:0;
  }
  .up-enter-active,.up-leave-active{
    position:absolute;
    transition:0.3s all;
  }
  .up-enter,.up-leave-to{
    transform:translateY(30px);
    opacity: 0;
  }
</style>
