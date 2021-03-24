import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from "antd";
import React, { useCallback } from "react";
import Api from "~/components/App";
import { Api as ApiType } from "~/types/appData";
import ApiConfig from "../ApiConfig";
import Background from "../Background";
import EventGroup from "../EventsSetting/EventGroup";
import reject from "lodash/reject";
import { v4 as uuidv4 } from "uuid";
import s from "./PageSetting.module.less";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { Dispatch, RootState } from "~/redux/store";
import usePostMessage from "~/hooks/usePostMessage";
import useLocalStorage from "~/hooks/useLocalStorage";

const Option = Select.Option;
const { Panel } = Collapse;

interface Props {}

const units = ["px", "rem", "vw", "vh"];

const Pagesetting: React.FC<Props> = () => {
  const pageData = useSelector((state: RootState) => state.pageData);
  const updatePage = useDispatch<Dispatch>().pageData.updatePage;
  // const ref = useRef();

  // 监听App页面数据，同步到编辑器数据
  const sendMessage = usePostMessage((data) => {
    const { tag, value } = data;
    if (tag === "updatePage") {
      updatePage(value);
    }
  });

  // 本地存储编辑数据
  const [_, setPagedataLocalStorage] = useLocalStorage("pageData", null);

  const handleUpdatePage = useCallback(
    (pageData) => {
      // 1、更新redux数据
      updatePage(pageData);
      // 2、将页面数据本地缓存
      setPagedataLocalStorage(pageData);
      // 3、向下游发送数据
      const win = (document.getElementById("wrapiframe") as HTMLIFrameElement)
        .contentWindow;
      if (win) {
        sendMessage(
          {
            tag: "updatePage",
            value: pageData,
          },
          win
        );
      }
    },
    [sendMessage, setPagedataLocalStorage, updatePage]
  );

  const onChangeEnv = useCallback(
    (envinfo, data) => {
      const optPageData = cloneDeep(pageData);
      if (envinfo.name === "mount") {
        optPageData.mountEnvents = data;
      }
      if (envinfo.name === "unmount") {
        optPageData.unmountEnvents = data;
      }
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeBg = useCallback(
    (data: any) => {
      const optPageData = cloneDeep(pageData);
      const style = {
        ...(optPageData.style || {}),
      };
      if (data.type === "backgroundCommon") {
        style.backgroundCommon = data.values;
      }
      if (data.type === "backgroundGradient") {
        style.backgroundGradient = data.values;
      }
      optPageData.style = style;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeUnit = useCallback(
    (type: "unit" | "toUnit") => (e: any) => {
      const optPageData = cloneDeep(pageData);
      if (type === "unit") {
        optPageData.unit = e;
      }
      if (type === "toUnit") {
        optPageData.toUnit = e;
      }

      if (optPageData.unit !== "rem" && optPageData.toUnit !== "rem") {
        delete optPageData.UIWidth;
        delete optPageData.baseFont;
      }

      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeStatisticsId = useCallback(
    (e) => {
      const optPageData = cloneDeep(pageData);
      optPageData.statisticsId = e.target.value;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeUIWidth = useCallback(
    (e) => {
      const optPageData = cloneDeep(pageData);
      optPageData.UIWidth = e.target.value;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeBaseFont = useCallback(
    (e) => {
      const optPageData = cloneDeep(pageData);
      optPageData.baseFont = e.target.value;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeApi = useCallback(
    (data) => {
      const optPageData = cloneDeep(pageData);
      optPageData.onLoadApi = data;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onRemoveApi = useCallback(
    (_, data: ApiType) => {
      const optPageData = cloneDeep(pageData);
      optPageData.onLoadApi = reject(optPageData.onLoadApi, {
        apiId: data.apiId,
      });
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onPlus = useCallback(() => {
    const optPageData = cloneDeep(pageData);
    optPageData.onLoadApi?.push({
      name: `Api_${optPageData.onLoadApi.length + 1}`,
      apiId: uuidv4(),
    });
    handleUpdatePage(optPageData);
  }, [handleUpdatePage, pageData]);

  return (
    <>
      <Collapse bordered={false} defaultActiveKey="baseset">
        <Panel header="基本信息" key="baseset">
          <Row className={s.row}>
            <Col className={s.label} span={4}>
              页面名称：
            </Col>
            <Col span={19}>
              <Input
                placeholder="请输入页面名称"
                value={pageData.pageTitle}
                onChange={(e) => {
                  updatePage({ pageTitle: e.target.value });
                }}
                className={s.num}
              />
            </Col>
            <Col span={1} />
          </Row>
          <Row className={s.row}>
            <Col className={s.label} span={4}>
              背景设置：
            </Col>
            <Col span={19}>
              <div className={s.bg}>
                <Background
                  updateKey={"api"}
                  defaultBGCommonData={pageData.style?.backgroundCommon || {}}
                  defaultBGGradient={pageData.style?.backgroundGradient || {}}
                  onChange={onChangeBg}
                  unit={pageData.toUnit}
                />
              </div>
            </Col>
            <Col span={1} />
          </Row>
          <Row gutter={4} className={s.row}>
            <Col className={s.label} span={4}>
              页面单位：
            </Col>
            <Col span={7}>
              <Select
                placeholder="请选择"
                className={s.select}
                value={pageData.unit}
                onChange={onChangeUnit("unit")}
              >
                {units.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip title={<div>终端页面显示单位</div>}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
            <Col className={s.label} span={4}>
              编辑单位：
            </Col>
            <Col span={7}>
              <Select
                placeholder="请选择"
                className={s.select}
                value={pageData.toUnit}
                onChange={onChangeUnit("toUnit")}
              >
                {units.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip title={<div>编辑面板使用单位</div>}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>

          {pageData.toUnit === "rem" || pageData.unit === "rem" ? (
            <Row gutter={4} className={s.row}>
              <Col className={s.label} span={4}>
                UI宽度：
              </Col>
              <Col span={7}>
                <InputNumber
                  value={pageData.baseFont}
                  onChange={onChangeBaseFont}
                  placeholder="px"
                  className={s.num}
                />
              </Col>
              <Col className={s.info} span={1}>
                <Tooltip title={<div>终端页面显示单位</div>}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Col>
              <Col className={s.label} span={4}>
                基准字体：
              </Col>
              <Col span={7}>
                <InputNumber
                  value={pageData.UIWidth}
                  onChange={onChangeUIWidth}
                  placeholder="px"
                  className={s.num}
                />
              </Col>
              <Col className={s.info} span={1}>
                <Tooltip title={<div>编辑面板使用单位</div>}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Col>
            </Row>
          ) : null}
        </Panel>
        <Panel header="页面挂载" key="pagemount">
          <div className={s.events}>
            <h4 className={s.apititle}>
              <div className={s.title}>Api</div>
              <Button size="small" icon={<PlusOutlined onClick={onPlus} />} />
            </h4>
            <ApiConfig
              onRemove={onRemoveApi}
              apiData={pageData.onLoadApi}
              defaultApiData={pageData.onLoadApi}
              onChange={onChangeApi}
            />
          </div>
          <div className={s.events}>
            <h4>事件</h4>
            <>
              {Api.exposeEvents?.map((item, index) => (
                <EventGroup
                  key={index}
                  value={
                    item.name === "mount"
                      ? pageData.mountEnvents || []
                      : pageData.unmountEnvents || []
                  }
                  curentEventInfomation={item}
                  onChange={onChangeEnv}
                />
              ))}
            </>
          </div>
        </Panel>
        <Panel header="百度统计" key="pagecounter">
          <Row className={s.row}>
            <Col className={s.label} span={4}>
              统计Id：
            </Col>
            <Col span={20}>
              <Input
                placeholder="请在百度账号下创建站点，获取统计Id"
                className={s.num}
                value={pageData.statisticsId}
                onChange={onChangeStatisticsId}
              />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};

export default Pagesetting;
