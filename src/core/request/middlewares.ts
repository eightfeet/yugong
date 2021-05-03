/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
/* eslint-disable no-param-reassign */
import { stringify } from 'query-string';
import { isAbsoluteUrl, methodWithBody, TimeoutError } from './utils';
import { Context, Middleware, NextFunction, KeyValuePair } from './typings';

export const baseUrl: Middleware = (context: Context, next: NextFunction) => {
  if (context.baseUrl && !isAbsoluteUrl(context.url)) {
    context.url = context.baseUrl + context.url;
  }

  return next();
};

export const params: Middleware = (context: Context, next: NextFunction) => {
  if (context.params) {
    const queryString = stringify(context.params);
    const concatSymbol = context.url.indexOf('?') > -1 ? '&' : '?';

    if (queryString) {
      context.url = context.url + concatSymbol + queryString;
    }
  }

  return next();
};

export const type: Middleware = (context: Context<{ type: 'form' | 'json' | 'raw' }>, next: NextFunction) => {
  if (methodWithBody(context.method)) {
    context.headers = context.headers || {};
    switch (context.type) {
      case 'form':
        context.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        context.body = stringify(context.body as KeyValuePair<any>);
        break;
      case 'json':
        context.headers['Content-Type'] = 'application/json;charset=utf-8';
        context.body = JSON.stringify(context.body as KeyValuePair<any>);
        break;
      case 'raw':
      default:
        break;
    }
  }

  return next();
};

export const http: Middleware<Response> = (context: Context, next: NextFunction<Response>) => {
  return next().then<Response>((response) => {
    context.response = response;
    return response.status >= 200 && response.status <= 299 ? response : Promise.reject(response);
  });
};

export const json: Middleware = (context: Context<{ json: boolean }>, next: NextFunction<Response>) => {
  return context.json === false
    ? next()
    : next()
        .then<string>((response) => response.text())
        .then<any>((responseText) => {
          try {
            return JSON.parse(responseText);
          } catch (_) {
            return responseText;
          }
        })
        .catch((error) => {
          if (error instanceof Response) {
            return error.text().then((responseText) => {
              let responseObj;

              try {
                responseObj = JSON.parse(responseText);
              } catch (_) {
                responseObj = responseText;
              }

              return Promise.reject(responseObj);
            });
          }

          return Promise.reject(error);
        });
};

export const timeout: Middleware = (context: Context<{ timeout?: number }>, next: NextFunction) => {
  const interval = context.timeout;

  if (interval && interval > 0 && interval < Infinity) {
    let controller: AbortController;
    if (!context.signal && typeof AbortController === 'function') {
      controller = new AbortController();
      context.signal = controller.signal;
    }

    return Promise.race([
      next(),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new TimeoutError());
          if (controller) controller.abort();
        }, interval);
      }),
    ]);
  }

  return next();
};
