import axios from "axios";
import { getToken } from "../utils/token"

var subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // headers: { token: getToken() }
});

// 添加请求拦截器
subjectRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
subjectRequest.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



export function subjectList(params) {
    return subjectRequest({
        url: '/subject/list',
        method: 'get',
        params
    })
}



export function subjectAdd(data) {
    return subjectRequest({
        url: '/subject/add',
        method: 'post',
        data,
    })
}

export function subjectStatus(data) {
    return subjectRequest({
        url: '/subject/status',
        method: 'post',
        data,
    })
}

export function subjectEdit(data) {
    return subjectRequest({
        url: '/subject/edit',
        method: 'post',
        data,
    })
}

export function subjectRemove(data) {
    return subjectRequest({
        url: '/subject/remove',
        method: 'post',
        data,
    })
}