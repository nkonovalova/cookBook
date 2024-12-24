const generateID = (prefix?: string) => {
    let time = Date.now();
    return `${prefix}_${time}`;
}
export { generateID };