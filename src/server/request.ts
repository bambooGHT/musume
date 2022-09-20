import axios from 'axios';
const request = axios.create({
  baseURL: 'http://43.138.26.158:3002/',
  // baseURL: 'api',
  timeout: 6000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
});
request.interceptors.request.use((config) => {
  // if (localStorage.getItem('cookie') && config.method === "get") {
  //   let local = localStorage.getItem('cookie'),
  //     cookie = encodeURIComponent(local!);
  //   if (config.params) {
  //     config.params = Object.assign(config.params, { timestamp: new Date().getTime(), cookie });
  //   } else {
  //     config.params = { timestamp: new Date().getTime(), cookie };
  //   }
  //   return config;
  // }

  // if (config.method === "post") {
  //   config.params = { timestamp: new Date().getTime() };
  // }
  return config;
}, error => {
  console.warn(error.data);
});
request.interceptors.response.use((response) => {
  return response.data;
}, error => {
  // console.warn(error.message);
  return error.response.data;
});

export default request;