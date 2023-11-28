// 前端攔截器
import axios from 'axios';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 每次請求之前也要給後端token
    const token = localStorage.getItem("token")
    // Bearer是默認規定
    // 利用在headers上加上屬性
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Request headers:", config.headers);
    return config;
}, function (error) {
    // Do something with request error


    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 響應成功的地方
    // 取得token 設置儲存
    console.log("response headers:",response.headers)
    const { authorization } = response.headers
    // 如果authorization是存在就存到內存
    authorization&& localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //解構出status
    const { status } = error.response
    if (status === 401) {
        localStorage.removeItem("token")
        window.location.href = "#/login"
    }
    return Promise.reject(error);
});