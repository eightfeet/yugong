
/**
 * clear Empty Element Of Object
 * @param params anyObject
 * @returns 
 */
const clearEmptyOfObject = (params: {[keys: string]: any}) => {
    let handleObj = {...params};
    Object.keys(params).forEach(key => {
        let element = params[key];
        if (typeof element !== 'number' && (!element || !element?.length) ) {
          delete handleObj[key]
        };
    })
    return handleObj;
}

export default clearEmptyOfObject;