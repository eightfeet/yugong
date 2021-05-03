/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
const METHODS_WITHOUT_BODY = ['GET', 'DELETE', 'OPTIONS', 'HEAD'];
const METHODS_WITH_BODY = ['POST', 'PUT', 'PATCH'];

export function pick<T>(obj: T, props: Array<keyof T>): Partial<T> {
  const ret: Partial<T> = {};

  props.forEach((prop) => {
    if (obj[prop] !== undefined) {
      ret[prop] = obj[prop];
    }
  });

  return ret;
}

export function isAbsoluteUrl(url: string) {
  return /^[a-z][a-z0-9+.-]*:/.test(url);
}

export function methodWithBody(method: string) {
  return METHODS_WITH_BODY.some((m) => m === method);
}

export function methodWithoutBody(method: string) {
  return METHODS_WITHOUT_BODY.some((m) => m === method);
}

export class TimeoutError extends Error {}
