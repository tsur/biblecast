// Use event.key as key function input
export const isArrowUp = (key) => ['Up', 'ArrowUp'].includes(key);
export const isArrowDown = (key) => ['Down', 'ArrowDown'].includes(key);
export const isArrowRight = (key) => ['Right', 'ArrowRight'].includes(key);
export const isArrowLeft = (key) => ['Left', 'ArrowLeft'].includes(key);
export const isEscape = (key) => key === 'Escape';
export const isBackspace = (key) => key === 'Backspace';
export const isSpace = (key) => key === ' ';
export const isEnter = (key) => key === 'Enter';
export const isTab = (key) => key === 'Tab';
export const isF5 = (key) => key === 'F5';