import { ArgumentsItem } from "./appData";

/**
 * 静态事件名称与描述
 * @member name 事件名
 * @member description 描述
 */
export interface ExposeEvents {
  name: string;
  description: string;
}

/**
 * 静态方法名称与描述
 */
export interface ExposeFunctions extends ExposeEvents {
    arguments?: ArgumentsItem[]
}

/**
 * 静态Api
 */
export interface ExposeApi extends RequestInit {
  /**
   * api 名称
   */
  name: string;
  /**
   * api 描述
   */
  description: string;
  /**
   * api 识别ID
   */
  apiId: string;
  /**
   * api Url
   */
  url: string;
} 


/**
 * 静态事件导出
 */
export interface ModulesProps<TProps> extends React.FC<TProps> {
    exposeEvents?: ExposeEvents[];
    exposeFunctions?: ExposeFunctions[];
    exposeApi?:  ExposeApi[];
}
