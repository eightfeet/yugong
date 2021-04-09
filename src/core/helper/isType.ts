export default (
    data: any,
    type: 'String' | 'Null' | 'Array' | 'Undefined' | 'Object' | 'Number' | 'Function'
) => Object.prototype.toString.call(data) === `[object ${type}]`;
