import axios from "axios";
import { getToken } from "../utils/token";


/* 获取用户信息 */
export function info() {
    return axios({
        url: process.env.VUE_APP_BASEURL + "/info",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers: {
            // token: window.localStorage.getItem("hmtoken")
            token: getToken(),
        
        }
    })
} 