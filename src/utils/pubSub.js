const subscriptors = {};

export const SEARCH_FOCUS = 'SEARCH_FOCUS';

export const emit = (eventName) => {
    return subscriptors[eventName] && subscriptors[eventName]();
};

export const subscribe = (eventName, fn) => {
    return subscriptors[eventName] = fn;
};