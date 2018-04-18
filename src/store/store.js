import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPlay:false,//是否在播放状态
    duration:0,//音乐总时长
    currentDuration:0,//当前播放到什么时间
    playState:0,//是否全屏播放
    indexPage:"1",//当前主页为第几页,
    songmid:"",//当前播放的音乐id
    songUrl:"",//当前音乐url
    albumUrl:"",//专辑图片url
    songName:"",//音乐名
    songerName:"",//歌手名
    changeState:0//如果为1的话表示为手动改变音乐情况
  },
  mutations: {
    setSongId (state,payload) {
       state.songmid = payload.songmid;
       state.songUrl = 'http://dl.stream.qqmusic.qq.com/C400'+payload.songmid+'.m4a?guid='+payload.guid+'&vkey='+payload.vkey+'&uin=0&fromtag=38';
      },
    setAlbumUrl(state,albumId){
      state.albumUrl = 'https://y.gtimg.cn/music/photo_new/T002R150x150M000'+albumId+'.jpg?max_age=2592000';
    },
    setSongName(state,songName){
      state.songName = songName;
    },
    setSongerName(state,songerName){
      state.songerName = songerName;
    },
    playControl(state,play){
       state.currentPlay = play;
    },
    setDuration(state,time){
      state.duration = time;
    },
    setCurrentDuration(state,time){
      state.currentDuration = time;
    },
    setChangeState(state,number){
      state.changeState = number;
    }
  }
})