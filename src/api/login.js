import subjectRequest from "../utils/request"

//登陆
export function login(data) {
    return subjectRequest({
        url: "/login",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        data,
    })
}


export function sendsms(data) {
    return subjectRequest({
        url: "/sendsms",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        data,
    })
}



export function register(data) {
    return subjectRequest({
        url: "/register",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        data,
    })
}