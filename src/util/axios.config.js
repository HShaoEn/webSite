// �e���d�I��
import axios from 'axios';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // �C���ШD���e�]�n�����token
    const token = localStorage.getItem("token")
    // Bearer�O�q�{�W�w
    // �Q�Φbheaders�W�[�W�ݩ�
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
    // �T�����\���a��
    // ���otoken �]�m�x�s
    console.log("response headers:",response.headers)
    const { authorization } = response.headers
    // �p�Gauthorization�O�s�b�N�s�줺�s
    authorization&& localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //�Ѻc�Xstatus
    const { status } = error.response
    if (status === 401) {
        localStorage.removeItem("token")
        window.location.href = "#/login"
    }
    return Promise.reject(error);
});