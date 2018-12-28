export const localStorage = {
    save(key, value) {
        window.localStorage.setItem(key, value)
    },
    get(key, def) {
        return window.localStorage.getItem(key) || def;
    },
};

export default localStorage;