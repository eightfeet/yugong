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
import { nanoid } from 'nanoid';
import s from "./PageSetting.module.less";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { Dispatch, RootState } from "~/redux/store";
import usePostMessage from "~/hooks/usePostMessage";
import useLocalStorage from "~/hooks/useLocalStorage";
import RunningTimesModal from "../RunningTimesModal";
import BackgroundGroup from "../BackgroundGroup";
import ReactJson from "react-json-view";
import { StyleContext, StyleType } from "~/context/StyleContext";
import produce from "~/core/helper/produce";
import { createDesc } from '~/core/constants';
import TotalControlHub from "../TotalControlHub";

const Option = Select.Option;
const { Panel } = Collapse;

interface Props {}

const units = ["px", "rem"];

const Pagesetting: React.FC<Props> = () => {
  const appData = useSelector((state: RootState) => state.appData);
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
      const optPageData = produce(pageData, draft => {
        if (envinfo.name === "mount") {
          draft.mountEnvents = data;
        }
        if (envinfo.name === "usergesture") {
          draft.usergestureEnvents = data;
        }
        if (envinfo.name === "unmount") {
          draft.unmountEnvents = data;
        }
      }, createDesc('页面', `修改${envinfo.name}事件`));
      
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChange = useCallback(
    (
      result: any,
      type: StyleType
    ) => {
      if (type === 'backgroundGroup') {
        const optPageData = produce(pageData, draft => {
          draft.style = {
            backgroundGroup: result
          }
        }, createDesc('页面', '修改背景样式'));
        handleUpdatePage(optPageData);
      }
    },
    [handleUpdatePage, pageData]
  );

  const onChangeUnit = useCallback(
    (type: "unit" | "toUnit") => (e: any) => {
      const optPageData = produce(pageData, draft => {
        if (type === "unit") {
          draft.unit = e;
        }
        if (type === "toUnit") {
          draft.toUnit = e;
        }
  
        if (draft.unit !== "rem" && draft.toUnit !== "rem") {
          delete draft.UIWidth;
          delete draft.baseFont;
        } else {
          draft.UIWidth = undefined;
          draft.baseFont = undefined;
        }
      }, createDesc('页面', '修改全局单位'));

      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeStatisticsId = useCallback(
    (e) => {
      const optPageData = produce(pageData, draft => {
        draft.statisticsId = e.target.value;
      }, createDesc('页面', '设置百度统计'));
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeUIWidth = useCallback(
    (e) => {
      const optPageData = produce(pageData, draft => {
        draft.UIWidth = e;
      }, createDesc('页面', '设置UI宽度'));
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeBaseFont = useCallback(
    (e) => {
      const optPageData = produce(pageData, draft => {
        draft.baseFont = e;
      }, createDesc('页面', '设置UI基准字体'));
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeApi = useCallback(
    (data) => {
      const optPageData = produce(pageData, draft => {
        draft.globalApi = data;
      }, createDesc('页面', '修改Api'));
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onRemoveApi = useCallback(
    (_, data: ApiType) => {
      const optPageData = produce(pageData, draft => {
        draft.globalApi = reject(draft.globalApi, {
          apiId: data.apiId,
        });
      }, createDesc('页面', '删除Api'));
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onPlus = useCallback(() => {
    const optPageData = produce(pageData, draft => {
      draft.globalApi?.push({
        name: '',
        apiId: nanoid(),
      });
    }, createDesc('页面', '新增Api'));
    handleUpdatePage(optPageData);
  }, [handleUpdatePage, pageData]);

  const onChangeRowHeight = useCallback(
    (e) => {
      const optPageData = produce(pageData, draft => {
        draft.rowHeight = e.target.value;
      }, createDesc('页面', '修改删格行高'));
      
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeCols = useCallback(
    (e) => {
      const optPageData = produce(pageData, draft => {
        draft.cols = e.target.value;
      }, createDesc('页面', '修改删格列宽'));
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangeSpace = useCallback(
    (e) => {
      const optPageData = produce(pageData, draft => {
        draft.space = e.target.value;
      }, createDesc('页面', '修改删格间距'));
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onChangePageTitle = useCallback(
    (e) => {
      const optPageData = produce(pageData, draft => {
        draft.pageTitle = e.target.value;
      }, createDesc('页面', '修改标题'));
      handleUpdatePage(optPageData);
    },
    [handleUpdatePage, pageData]
  );

  const onShowRunningTimes = useCallback((e) => {
    e.stopPropagation();
    setShowRunningTimes(true);
  }, []);

  const getDefaultData = useCallback(
    (type: StyleType) => pageData.style?.backgroundGroup || {},
    [pageData.style?.backgroundGroup]
  );

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
              基准单位：
            </Col>
            <Col span={19}>
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
              <Tooltip title={<div>页面的基准单位，用于单位换算；设置为rem时需要设置UI宽度和基准像素</div>}>
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
                基准像素：
              </Col>
              <Col span={7}>
                <InputNumber
                  min={5}
                  value={pageData.baseFont}
                  onChange={onChangeBaseFont}
                  placeholder="px"
                  className={s.num}
                />
              </Col>
              <Col className={s.info} span={1}>
                <Tooltip title={<div>UI设计下，1rem=1基准像素</div>}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Col>
            </Row>
          ) : null}
          <StyleContext.Provider
            value={{
              onChange,
              getDefaultData
            }}
          >
          <Row gutter={4} className={s.row}>
            <Col span={24}>
              <div className={s.bg}>
                <BackgroundGroup />
              </div>
            </Col>
            <Col span={1} />
          </Row>
          </StyleContext.Provider>
        </Panel>
        <Panel header="Api" key="pagemount">
          <div className={s.apiwrap}>
            <h4 className={s.apititle}>
              <Button size="small" icon={<PlusOutlined onClick={onPlus} />} />
            </h4>
            <ApiConfig
              sortable={false}
              onRemove={onRemoveApi}
              apiData={pageData.globalApi}
              defaultApiData={cloneDeep(pageData.globalApi)}
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
                  eventName={item.name}
                  value={
                    item.name === "mount"
                      ? pageData.mountEnvents || []
                      : pageData.unmountEnvents || []
                  }
                  curentEventInfomation={item}
                  onPlay={() => {}}
                  onChange={onChangeEnv}
                />
              ))}
            </>
          </div>
        </Panel>
        <Panel header="线程" key="tch">
          <div className={s.tch}>
              <TotalControlHub updatePage={handleUpdatePage} />
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
        <Panel header="数据视图" key="pagedata">
          <ReactJson src={{pageData, appData}} collapsed={1} name="project" />
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