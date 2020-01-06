const key = "hmtoken"


/* 存储token */
export function setToken(token) {
    window.localStorage.setItem(key, token)
}

/* 获取token */
export function getToken() {
    return window.localStorage.getItem(key)
}

/* 删除token */
export function removeToken() {
    window.localStorage.removeItem(key)
}