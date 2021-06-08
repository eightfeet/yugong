import { InfoCircleOutlined, MinusOutlined } from "@ant-design/icons";
import { Select, Row, Col, Input, Divider, Tooltip, Button } from "antd";
import classNames from "classnames";
import { SortableHandle, SortableElement } from "react-sortable-hoc";
import { Api } from "~/types/appData";
import MoveIcon from "./MoveIcon";
import s from "./ApiConfig.module.less";
import ApiDataMap from "./ApiDataMap";

const selectSetting = (onChange: any, value: any) => (
  <Select
    value={value}
    onChange={onChange}
    style={{ width: "100px" }}
    placeholder="请选择"
  >
    <Select.Option value="mode">mode</Select.Option>
    <Select.Option value="headers">headers</Select.Option>
    <Select.Option value="credentials">credentials</Select.Option>
  </Select>
);

const methodArray = ["GET", "POST", "PUT", "DELETE"];
const selectMethod = (onChange: any, value: any) => (
  <Select
    value={value}
    onChange={onChange}
    style={{ width: "90px" }}
    placeholder="请选择"
  >
    {methodArray.map((item) => (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    ))}
  </Select>
);

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

const ApiItem = SortableElement(
  ({
    currentIndex,
    element,
    apiData,
    onRemove,
    onChangeUrl,
    onChangeMethod,
    onChangeSetting,
    onHandleUserArg,
    onchangeDatamap,
    sortable,
  }: {
    currentIndex: number;
    element: any;
    apiData?: Api[];
    onRemove?: (index: number, data: Api) => void;
    onChangeUrl: (index: number) => any;
    onChangeMethod: (index: number) => any;
    onChangeSetting: (index: number) => any;
    onHandleUserArg: (
      index: number,
      type: "body" | "successPublic" | "errorPublic"
    ) => void;
    sortable?: boolean;
    onchangeDatamap: (data: Api["dataMap"]) => void;
  }) => {
    const item = {
      ...(apiData?.length ? apiData[currentIndex] : {}),
      ...element,
    };
    return (
      <div className={classNames(s.item, "apiitem")} key={item.apiId}>
        {sortable ? <DragHandle /> : null}
        <div className={s.divide}>
          <div className={s.title}>
            {item.name || item.apiId || "接口名称"}{" "}
            <Tooltip
              title={
                <div>
                  返回数据结构(data: 原始数据, target: 目标数据)
                  <br />
                  {`{ `}<br />data: any, <br />
                  [target1]: any, <br />
                  [target2]: any, <br />
                  [target...n]: any <br />{`}`}
                </div>
              }
            >
              <InfoCircleOutlined />
            </Tooltip>
          </div>
          {onRemove instanceof Function ? (
            <Button
              size="small"
              icon={
                <MinusOutlined
                  onClick={() => onRemove(currentIndex, element)}
                />
              }
            />
          ) : null}
        </div>
        <Row className={s.row} gutter={4}>
          <Col span={24}>
            <Input
              onChange={onChangeUrl(currentIndex)}
              addonBefore={selectMethod(
                onChangeMethod(currentIndex),
                item.method
              )}
              addonAfter={selectSetting(
                onChangeSetting(currentIndex),
                "高级设置"
              )}
              value={item.url}
              placeholder="请输入Url 接口地址"
            />
          </Col>
        </Row>
        {item.hideBodyInput ? null : (
          <Row className={s.row} gutter={4}>
            <Col span={24}>
              <Button
                onClick={() => onHandleUserArg(currentIndex, "body")}
                className={s.w100}
              >
                入参设置
              </Button>
            </Col>
          </Row>
        )}
        <ApiDataMap onChange={onchangeDatamap} dataMap={item?.dataMap} />
        <Divider orientation="left" plain>
          结果发布
        </Divider>
        <Row gutter={4}>
          <Col span={12}>
            <Tooltip title={<div>将Api请求成功结果发布到全局</div>}>
              <Button
                onClick={() => onHandleUserArg(currentIndex, "successPublic")}
                className={s.w100}
              >
                success
              </Button>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip title={<div>将Api请求失败结果发布到全局</div>}>
              <Button
                onClick={() => onHandleUserArg(currentIndex, "errorPublic")}
                className={s.w100}
              >
                error
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </div>
    );
  }
);

export default ApiItem;
