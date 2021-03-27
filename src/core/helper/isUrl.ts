/**
 * 检查是不是http-url
 * @param url 
 * @returns 
 */
const isUrl = (url: string) => {
    const reg = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
    return reg.test(url)

}
export default isUrl;