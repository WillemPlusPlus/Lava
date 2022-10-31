export const bound = (n, min = 0, max = 1) => {
    let top = n > max ? max : n;
    return top < min ? min : top;
};
export const norm = (n, from = { min: 0, max: 255 }, to = { min: 0, max: 1 }) => {
    const norm = (n - from.min) / (from.max - from.min);
    const result = norm * (to.max - to.min) + to.min;
    console.log(result);
    return norm;
};
//# sourceMappingURL=utils.js.map