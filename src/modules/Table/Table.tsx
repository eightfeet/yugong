import { useEffect } from "react";
import requester from "~/core/fetch";
import EventEmitter from "~/core/EventEmitter";
import { AppDataElementsTypes } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import s from './Table.module.less'
import useStyles from "./Table.useStyle";
import classNames from "classnames";

export interface TableProps extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

const Table: Modules<TableProps> = (props) => {
  const { eventEmitter, events = {}, api, style } = props;
  const userClass = useStyles(style);
  // API请求 注意依赖关系
  useEffect(() => {
    const apiArguments = api?.find((item) => item.apiId === "");
    requester(apiArguments || {});
  }, [api]);
  // 基本事件
  useEffect(() => {
    // 执行挂载事件
    eventEmitter.emit(events.mount);
    return () => {
      // 执行卸载事件
      eventEmitter.emit(events.unmount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper {...props} maxHeight maxWidth><table className={classNames(s.table, userClass.table)}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table></Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Table.exposeFunctions = [];

/**
 * 发布事件的静态描述
 */
Table.exposeEvents = [
  {
    name: "mount",
    description: "挂载",
  },
  {
    name: "unmount",
    description: "卸载",
  },
];

/**
 * 发布默认porps
 */
Table.exposeDefaultProps = {
  layout: {
    w: 20,
  },
};

/**
 * 发布默认Api
 */
Table.exposeApi = [];

export default Table;
