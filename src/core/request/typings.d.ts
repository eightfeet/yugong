/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
export interface KeyValuePair<T> {
  [key: string]: T;
}

export interface IOptions extends KeyValuePair<any> {
  headers?: KeyValuePair<string>;
  params?: KeyValuePair<any>;
}

export interface IContext extends IOptions {
  url: string;
  method: HttpMethod;
  headers: KeyValuePair<string>;
  body?: HttpPayload;
  credentials?: RequestCredentials;
  mode?: RequestMode;
  signal?: AbortSignal | null;
}

export declare type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
export declare type HttpPayload = Blob | FormData | KeyValuePair<any> | string | null;

export declare type Options<T = any> = IOptions & Partial<T>;
export declare type Context<T = any> = IContext & Partial<T>;

export declare type NextFunction<T = any> = () => Promise<T>;
export declare type Middleware<T = any> = (context: Context, next: NextFunction) => Promise<T>;
