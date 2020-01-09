import subjectRequest from "../utils/request"


export function enterpriseList(params) {
    return subjectRequest({
        url: '/enterprise/list',
        method: 'get',
        params
    })
}



export function enterpriseAdd(data) {
    return subjectRequest({
        url: '/enterprise/add',
        method: 'post',
        data,
    })
}

export function enterpriseStatus(data) {
    return subjectRequest({
        url: '/enterprise/status',
        method: 'post',
        data,
    })
}

export function senterpriseEdit(data) {
    return subjectRequest({
        url: '/enterprise/edit',
        method: 'post',
        data,
    })
}

export function enterpriseRemove(data) {
    return subjectRequest({
        url: '/enterprise/remove',
        method: 'post',
        data,
    })
}