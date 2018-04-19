import axios from "axios";

const api = {
  vkey:async(songmid,guid)=>{
    let format = 'jsonp';
    const apiUrl = '/vkey?g_tk=1278911659&hostUin=0&format='+format+'&callback=callback&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid='+songmid+'&filename=C400'+songmid+'.m4a&guid='+guid;
    let res = await axios.get(apiUrl);
    console.log(res);
    return JSON.parse(res.data.split("(")[1].split(")")[0]).data.items[0].vkey;
  },
  search:async(key,length)=>{
    const apiUrl = `/search?g_tk=289671492&uin=2211503711&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=`+key+`&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=`+30+`&p=`+length+`&remoteplace=txt.mqq.all&_=1521699185623`;
    const res = await axios.get(apiUrl);
    return res;
  },
  index:async()=>{
    const apiUrl = "/api?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1521092161716";
    const res = await axios.get(apiUrl);
    return res;
  }
}
export default api;