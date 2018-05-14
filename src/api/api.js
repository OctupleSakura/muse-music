import axios from "axios";
import qs from "qs";
import base64 from "js-base64";

const Base64 = base64.Base64;

const api = {
  music:{
    vkey:async(songmid,guid)=>{
      let format = 'jsonp';
      const apiUrl = `/vkey?g_tk=1278911659&hostUin=0&format=${format}&callback=callback&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=${songmid}&filename=C400${songmid}.m4a&guid=${guid}`;
      let res = await axios.get(apiUrl);
      return JSON.parse(res.data.split("(")[1].split(")")[0]);  
    },
    search:async(key,length)=>{
      const apiUrl = `/search?g_tk=289671492&uin=2211503711&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${key}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=${30}&p=${length}&remoteplace=txt.mqq.all&_=1521699185623`;
      const res = await axios.get(apiUrl);
      return res;
    },
    index:async()=>{
      const apiUrl = `/api?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1521092161716"`;
      const res = await axios.get(apiUrl);
      return res;
    },
    lyric:async(that,id)=>{
      const url = `https://api.darlin.me/music/lyric/${id}`
      const res = await that.$jsonp(url);
      return Base64.decode(res.lyric);
    }
  },
  user:{
    login:async(username,password)=>{
      const int = axios.create({
        withCredentials: true // 允许携带cookie
      })
      const apiUrl = `http://octuplesakura.cn:1339/user/login`;
      let params = {username:username,password:password};
      const res = await int.post(apiUrl,params);
      return res;
    },
    sign:async()=>{
      const int = axios.create({
        withCredentials: true // 允许携带cookie
      })
      const apiUrl = `http://octuplesakura.cn:1339/user/sign`;
      const res = await int.post(apiUrl);
      return res.data;
    },
    exit:async()=>{
      const int = axios.create({
        withCredentials: true // 允许携带cookie
      })
      const apiUrl = `http://octuplesakura.cn:1339/user/exit`;
      const res = await int.post(apiUrl);
      return res.data;
    }
  },
  songSheet:{
    //查找用户歌单
    userSongSheet:async(params) => {
      let userid = params.userid;
      let operation = params.operation;
      const apiUrl = `http://octuplesakura.cn:1338/song/likeData?userid=${userid}&operation=${operation}`;
      const res = await axios.get(apiUrl,params);
      return res.data;
    },
     //查找用户是否喜欢了某一首歌
     userSong:async(params) => {
       let userid = params.userid;
       let songid = params.songid;
      const apiUrl = `http://octuplesakura.cn:1338/song/likeData?userid=${userid}&songid=${songid}&operation=${1}`;
      const res = await axios.get(apiUrl,params);
      return res.data;
    },
    //添加喜欢的音乐
    insertSong:async(params)=>{
      const apiUrl = `http://octuplesakura.cn:1338/song/like`;
      params["operation"] = 0;
      const int = axios.create({
        withCredentials: true // 允许携带cookie
      })
      const res = await int.post(apiUrl,params);
      return res;
    },
    //取消添加
    cancelSong:async(params)=>{
      const apiUrl = `http://octuplesakura.cn:1338/song/like`;
      params["operation"] = 1;
      const int = axios.create({
        withCredentials: true // 允许携带cookie
      })
      const res = await int.post(apiUrl,params);
      return res;
    },
  }
}
export default api;