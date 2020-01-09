

import subjectRequest from "../utils/request"

/* 获取用户信息 */
export function info() {
    return subjectRequest({
        url: "/info",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,

    })
}



/* 退出 */
export function logout() {
    return subjectRequest({
        url: "/logout",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,

    })
} 