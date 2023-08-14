export const getWordsCount = (content) => {
    let len = content?.split(" ")?.length;
    // 265 is the average reading speed of an adult, taken from medium.com
    return Math.round(len / 265);
};

export const getDataInJSON = (data, id) => {
    let bodyObj = { article: {}, id: id };
    data.forEach((value, key) =>
        key != "file" ? (bodyObj["article"][key] = value) : null
    );
    return bodyObj;
}