import isPlainObject from 'lodash/isPlainObject';

function forEachObject(obj: { [x: string]: any; }, fn: { call: (arg0: any, arg1: any, arg2: string, arg3: any, arg4: string) => void; }, path: any) {
    for (const key in obj) {
        const deepPath = path ? `${path}.${key}` : key;

        // Note that we always use obj[key] because it might be mutated by forEach
        fn.call(obj, obj[key], key, obj, deepPath);

        deepForEach(obj[key], fn, deepPath);
    }
}

function forEachArray(array: any[], fn: { call: (arg0: any, arg1: any, arg2: any, arg3: any, arg4: string) => void; }, path: any) {
    array.forEach((value: any, index: string | number, arr: { [x: string]: any; }) => {
        const deepPath = `${path}[${index}]`;

        fn.call(arr, value, index, arr, deepPath);

        // Note that we use arr[index] because it might be mutated by forEach
        deepForEach(arr[index], fn, deepPath);
    });
}

function deepForEach(value: any, fn: any, path?: string) {
    path = path || '';

    if (Array.isArray(value)) {
        forEachArray(value, fn, path);
    } else if (isPlainObject(value)) {
        forEachObject(value, fn, path);
    }
}

export default deepForEach;