// 封装本地 存储的方法 
export const setLocalStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

export const getLocalStore = (name) => {
    if (!name) return
    return window.localStorage.getItem(name)
}

export const removeLocalStore = (name) => {
    if (!name) return
    return window.localStorage.removeItem(name)
}

// 版本信息
export const _VERSION_ = '1.4.3'