import axios from 'axios';
import qs from 'qs';
import base64 from 'js-base64';

const Base64 = base64.Base64;

const api = {
  music: {
    vkey: async (songmid, guid) => {
      let format = 'jsonp';
      const apiUrl = `http://octuplesakura.cn:1341/proxy/key?format=${format}&songmid=${songmid}&guid=${guid}`;
      let res = await axios.get(apiUrl);
      return JSON.parse(res.data.split('(')[1].split(')')[0]);
    },
    search: async (key, length) => {
      //由于后台转发请求,因此要对中文参数进行编码
      let enkey = encodeURI(encodeURI(key));
      const apiUrl = `http://octuplesakura.cn:1341/proxy/search?key=${enkey}&length=${length}`;
      return axios.get(apiUrl);
    },
    index: async () => {
      const apiUrl = `http://octuplesakura.cn:1341/proxy/index`;
      return axios.get(apiUrl);
    },
    lyric: async (that, id) => {
      const url = `https://api.darlin.me/music/lyric/${id}`;
      const res = await that.$jsonp(url);
      return Base64.decode(res.lyric);
    },
  },
  user: {
    login: async (username, password) => {
      const int = axios.create({
        withCredentials: true, // 允许携带cookie
      });
      const apiUrl = `http://octuplesakura.cn:1339/user/login`;
      let params = { username: username, password: password };
      const res = await int.post(apiUrl, params);
      return res;
    },
    sign: async () => {
      const int = axios.create({
        withCredentials: true, // 允许携带cookie
      });
      const apiUrl = `http://octuplesakura.cn:1339/user/sign`;
      const res = await int.post(apiUrl);
      return res.data;
    },
    register: async (username, password) => {
      const int = axios.create({
        withCredentials: true, // 允许携带cookie
      });
      const apiUrl = `http://octuplesakura.cn:1339/user/register`;
      let params = { username: username, password: password };
      const res = await int.post(apiUrl, params);
      return res.data;
    },
    exit: async () => {
      const int = axios.create({
        withCredentials: true, // 允许携带cookie
      });
      const apiUrl = `http://octuplesakura.cn:1339/user/exit`;
      const res = await int.post(apiUrl);
      return res.data;
    },
  },
  songSheet: {
    //查找用户歌单
    userSongSheet: async params => {
      let userid = params.userid;
      let operation = params.operation;
      const apiUrl = `http://octuplesakura.cn:1338/song/likeData?userid=${userid}&operation=${operation}`;
      const res = await axios.get(apiUrl, params);
      return res.data;
    },
    //查找用户是否喜欢了某一首歌
    userSong: async params => {
      let userid = params.userid;
      let songid = params.songid;
      const apiUrl = `http://octuplesakura.cn:1338/song/likeData?userid=${userid}&songid=${songid}&operation=${1}`;
      const res = await axios.get(apiUrl, params);
      return res.data;
    },
    //添加喜欢的音乐
    insertSong: async params => {
      const apiUrl = `http://octuplesakura.cn:1338/song/like`;
      params['operation'] = 0;
      const int = axios.create({
        withCredentials: true, // 允许携带cookie
      });
      const res = await int.post(apiUrl, params);
      return res;
    },
    //取消添加
    cancelSong: async params => {
      const apiUrl = `http://octuplesakura.cn:1338/song/like`;
      params['operation'] = 1;
      const int = axios.create({
        withCredentials: true, // 允许携带cookie
      });
      const res = await int.post(apiUrl, params);
      return res;
    },
  },
};
export default api;
