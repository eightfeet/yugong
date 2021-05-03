/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import extend from 'extend';
import compose from './compose';
import { pick } from './utils';
import { Context, Middleware, Options, HttpMethod, HttpPayload } from './typings';

class Request {
  public static props: Array<keyof RequestInit> = ['method', 'headers', 'body', 'credentials', 'mode'];

  public static defaults: Options = {};

  private readonly middlewares: Middleware[];

  private options: Options;

  constructor(options: Options, middlewares: Middleware[]) {
    this.middlewares = middlewares.slice().reverse();
    this.options = options;
  }

  public use(fn: Middleware): this {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be a function!');
    }

    this.middlewares.unshift(fn);
    return this;
  }

  public get<T = any>(url: string, options?: Options): Promise<T> {
    return this.createFetch<T>(url, 'GET', null, options);
  }

  public post<T = any>(url: string, payload?: HttpPayload, options?: Options): Promise<T> {
    return this.createFetch<T>(url, 'POST', payload, options);
  }

  public put<T = any>(url: string, payload?: HttpPayload, options?: Options): Promise<T> {
    return this.createFetch<T>(url, 'PUT', payload, options);
  }

  public patch<T = any>(url: string, payload?: HttpPayload, options?: Options): Promise<T> {
    return this.createFetch<T>(url, 'PATCH', payload, options);
  }

  public delete<T = any>(url: string, options?: Options): Promise<T> {
    return this.createFetch<T>(url, 'DELETE', null, options);
  }

  private createContext(url: string, method: HttpMethod, payload?: HttpPayload, options?: Options): Context {
    return extend(true, {}, Request.defaults, this.options, options, {
      url,
      method,
      body: payload,
      headers: {},
    });
  }

  private createFetch<T>(url: string, method: HttpMethod, payload?: HttpPayload, options?: Options): Promise<T> {
    const context = this.createContext(url, method, payload, options);
    const applyMiddleware = compose(this.middlewares);
    return applyMiddleware(context, this.doRequest);
  }

  private doRequest(context: Context): Promise<Response> {
    const { url } = context;
    const options = pick<any>(context, Request.props);
    return fetch(url, options);
  }
}

export default Request;
