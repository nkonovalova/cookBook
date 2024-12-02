const generateID = (prefix?: string) => {
    let time = new Date().getTime();
    return `${prefix}_${time}`;
}
export { generateID };