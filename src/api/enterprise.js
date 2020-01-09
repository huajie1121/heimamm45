import subjectRequest from "../utils/request"


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