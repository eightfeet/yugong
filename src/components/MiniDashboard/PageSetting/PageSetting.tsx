import {
  ClusterOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
import React, { useCallback, useState } from "react";
import Output from '~/components/Output';
import { Api as ApiType } from "~/types/appData";
import ApiConfig from "../ApiConfig";
import EventGroup from "../EventsSetting/EventGroup";
import reject from "lodash/reject";
import { v4 as uuidv4 } from "uuid";
import s from "./PageSetting.module.less";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { Dispatch, RootState } from "~/redux/store";
import usePostMessage from "~/hooks/usePostMessage";
import useLocalStorage from "~/hooks/useLocalStorage";
import RunningTimesModal from "../RunningTimesModal";
import BackgroundGroup from "../BackgroundGroup";

const Option = Select.Option;
const { Panel } = Collapse;

interface Props {}

const units = ["px", "rem", "vw", "vh"];

const Pagesetting: React.FC<Props> = () => {
  const pageData = useSelector((state: RootState) => state.pageData);
  const updatePage = useDispatch<Dispatch>().pageData.updatePage;
  const [showRunningTimes, setShowRunningTimes] = useState(false);
  const runningTimes = useSelector((state: RootState) => state.runningTimes);
  // const ref = useRef();

  // 监听App页面数据，同步到编辑器数据
  const sendMessage = usePostMessage((data) => {
    const { tag, value } = data;
    if (tag === "updatePage") {
      updatePage(value);
    }
  });

  // 本地存储编辑数据
  const [, setPagedataLocalStorage] = useLocalStorage("pageData", null);

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

      optPageData.style = {
        backgroundGroup: data
      };
      console.log(2, optPageData);
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
      } else {
        optPageData.UIWidth = undefined;
        optPageData.baseFont = undefined;
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
      optPageData.UIWidth = e;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeBaseFont = useCallback(
    (e) => {
      const optPageData = cloneDeep(pageData);
      optPageData.baseFont = e;
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
      name: `ApiBeforMounted`,
      apiId: uuidv4(),
    });
    handleUpdatePage(optPageData);
  }, [handleUpdatePage, pageData]);

  const onChangeRowHeight = useCallback(
    (e) => {
      const optPageData = cloneDeep(pageData);
      optPageData.rowHeight = e.target.value;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeCols = useCallback(
    (e) => {
      const optPageData = cloneDeep(pageData);
      optPageData.cols = e.target.value;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeSpace = useCallback(
    (e) => {
      const optPageData = cloneDeep(pageData);
      optPageData.space = e.target.value;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangePageTitle = useCallback(
    (e) => {
      const optPageData = cloneDeep(pageData);
      optPageData.pageTitle = e.target.value;
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onShowRunningTimes = useCallback((e) => {
    e.stopPropagation();
    setShowRunningTimes(true);
  }, []);

  return (
    <>
      <Collapse accordion bordered={false} defaultActiveKey="baseset">
        <Panel
          header="基本信息"
          key="baseset"
          extra={
            <Tooltip title="查看全局发布变量">
              <ClusterOutlined onClick={onShowRunningTimes} />
            </Tooltip>
          }
        >
          <Row gutter={4} className={s.row}>
            <Col className={s.label} span={4}>
              页面名称：
            </Col>
            <Col span={19}>
              <Input
                placeholder="请输入页面名称"
                value={pageData.pageTitle}
                onChange={onChangePageTitle}
                className={s.num}
              />
            </Col>
            <Col span={1} />
          </Row>

          <Row gutter={4} className={s.row}>
            <Col className={s.label} span={4}>
              栅格列数：
            </Col>
            <Col span={7}>
              <Input
                value={pageData.cols}
                onChange={onChangeCols}
                className={s.num}
                placeholder="输入栅格列数"
              />
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip title={<div>屏幕栅格列数&gt;0 (默认12列)</div>}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
            <Col className={s.label} span={4}>
              栅格行高：
            </Col>
            <Col span={7}>
              <Input
                value={pageData.rowHeight}
                onChange={onChangeRowHeight}
                placeholder="输入栅格行高"
                className={s.num}
              />
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip
                title={
                  <div>屏幕栅格行高&gt;0(默认20px)，可使用运行时window计算高度</div>
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={4} className={s.row}>
            <Col className={s.label} span={4}>
              栅格间距：
            </Col>
            <Col span={7}>
              <Input
                value={pageData.space}
                onChange={onChangeSpace}
                className={s.num}
                placeholder="输入栅格间距"
              />
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip title={<div>栅格间距(默认0px)</div>}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={4} className={s.row}>
            <Col className={s.label} span={4}>
              页面单位：
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
                  value={pageData.UIWidth}
                  onChange={onChangeUIWidth}
                  placeholder="px"
                  className={s.num}
                />
              </Col>
              <Col className={s.info} span={1}>
                <Tooltip title={<div>UI设计的屏幕宽度(px)</div>}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Col>
              <Col className={s.label} span={4}>
                基准字体：
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
                <Tooltip title={<div>UI设计下1rem的字体大小(px)</div>}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Col>
            </Row>
          ) : null}
          <Row gutter={4} className={s.row}>
            <Col span={24}>
              <div className={s.bg}>
                <BackgroundGroup
                    updateKey={"api"}
                    onChange={onChangeBg}
                    defaultData={pageData.style?.backgroundGroup || {}}
                />
              </div>
            </Col>
            <Col span={1} />
          </Row>
        </Panel>
        <Panel header="初始化Api" key="pagemount">
          <div className={s.events}>
            <h4 className={s.apititle}>
              <Button size="small" icon={<PlusOutlined onClick={onPlus} />} />
            </h4>
            <ApiConfig
              onRemove={onRemoveApi}
              apiData={pageData.onLoadApi}
              defaultApiData={cloneDeep(pageData.onLoadApi)}
              onChange={onChangeApi}
            />
          </div>
        </Panel>
        <Panel header="页面事件" key="pageevent">
          <div className={s.events}>
            <>
              {Output.exposeEvents?.map((item, index) => (
                <EventGroup
                  key={index}
                  value={
                    item.name === "mount"
                      ? pageData.mountEnvents || []
                      : pageData.unmountEnvents || []
                  }
                  curentEventInfomation={item}
                  onPlay={() => console.log(2222)}
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
      <RunningTimesModal
        visible={showRunningTimes}
        data={runningTimes}
        onCancel={() => setShowRunningTimes(false)}
      />
    </>
  );
};

export default Pagesetting;
