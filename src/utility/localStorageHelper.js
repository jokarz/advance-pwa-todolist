export const getData = () => {
    const res = window.localStorage.getItem('data')
    return res ? JSON.parse(res) : []
}

export const setData = data => {
    window.localStorage.setItem('data', JSON.stringify(data))
}