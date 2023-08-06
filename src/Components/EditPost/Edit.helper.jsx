export const getWordsCount = (content) => {
    let len = content.split(" ").length;
    // 265 is the average reading speed of an adult, taken from medium.com
    return Math.round(len / 265);
};
