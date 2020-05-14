export const setToken = (key, value) => {
    window.localStorage.setItem(key, value);
    return null;
}

export const removeToken = (key) => {
    window.localStorage.removeItem(key);
    return null;
}
