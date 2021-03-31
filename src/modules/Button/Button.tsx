import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';

export interface ButtonProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Button:Modules<ButtonProps> = () => {
    return (
        <div>
            
        </div>
    )
}

/**
 * 注册方法的静态描述与默认参数定义
 */
 Button.exposeFunctions = [];

 /**
  * 发布事件的静态描述
  */
  Button.exposeEvents = [
    {
        name: 'mount',
        description: '挂载',
    },
    {
        name: 'unmount',
        description: '卸载',
    },
  ];
 
 /**
  * 发布默认porps
  */
  Button.exposeDefaultProps = {};
 
 /**
  * 发布默认Api
  */
  Button.exposeApi = [];

export default Button;


 