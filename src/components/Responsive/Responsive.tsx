/**
 * 包含模式设置、响应式编辑通信iframe、与样式编辑面板MiniDashboard
 *
 */

import {
  CloseOutlined,
  CloudUploadOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
  GithubOutlined,
  PlusOutlined,
  QrcodeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Drawer, message } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePostMessage from '~/hooks/usePostMessage';
import { Dispatch, RootState } from '~/redux/store';
import MiniDashboard from '../MiniDashboard';
import s from './Responsive.module.less';
import Draggable from 'react-draggable';
import Ruler from './Ruler';
import Repository from '../MiniDashboard/Repository';
import PageSetting from '../MiniDashboard/PageSetting';
import CreateProject from '../CreateProject';
import classNames from 'classnames';
import { AppDataListTypes } from '~/types/appData';
import useLocalStorage from '~/hooks/useLocalStorage';
import { createTemplate, updateTemplate } from '~/api';
import { cloneDeep } from 'lodash';
import TemplateInfoModal from '../TemplateInfoModal';
import { TemplateInfo } from '../TemplateInfoModal/TemplateInfoModal';
import { Template } from '~/types/pageData';
import { useHistory } from 'react-router-dom';
import LoadingAnimate from './LoadingAnimate';
import { trackPageView } from '~/core/tracking';
import Undo from '../MiniDashboard/Undo';
import { saveRecord } from '~/core/helper/produce';
import QrcodeModal from '../QrcodeModal';
import { stringify } from 'query-string';
// import loading from "~/core/loading";

interface Props {}
const Responsive: React.FC<Props> = () => {
  useEffect(() => {
    trackPageView('/首页');
  }, []);
  /**
   * ----------
   * 定义编辑模式
   * ----------
   */
  const { isEditing, auth } = useSelector(
    (state: RootState) => state.controller,
  );

  const history = useHistory();

  const appData = useSelector((state: RootState) => state.appData);
  const activationItem = useSelector(
    (state: RootState) => state.activationItem,
  );
  const stateTag = useSelector((state: RootState) => state.controller.stateTag);

  const forceUpdateByStateTag =
    useDispatch<Dispatch>().controller.forceUpdateByStateTag;
  const setIsEditing = useDispatch<Dispatch>().controller.setIsEditing;
  const updateAppData = useDispatch<Dispatch>().appData.updateAppData;
  const updatePageData = useDispatch<Dispatch>().pageData.updatePage;
  const setWindowHeight = useDispatch<Dispatch>().pageData.setWindowHeight;
  const setWindowWidth = useDispatch<Dispatch>().pageData.setWindowWidth;
  const updateActivationItem =
    useDispatch<Dispatch>().activationItem.updateActivationItem;
  const removeActivationItem =
    useDispatch<Dispatch>().activationItem.removeActivationItem;

  const setRunningTimes = useDispatch<Dispatch>().runningTimes.setRunningTimes;

  const ref = useRef(null);

  const pageData = useSelector((state: RootState) => state.pageData);
  const runningTimes = useSelector((state: RootState) => state.runningTimes);
  const setIsReady = useDispatch<Dispatch>().record.setIsReady;

  const [, setLocalPageData] = useLocalStorage('pageData', null);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showPageDrawer, setShowPageDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [hideIframe, sethideIframe] = useState(true);
  const [visibleQrcode, setVisibleQrcode] = useState(false);

  // 创建postmessage通信 usePostMessage收集数据 redux 更新数据
  const sendMessage = usePostMessage(({ tag, value }) => {
    switch (tag) {
      case 'setIsEditing':
        setIsEditing(value);
        break;
      case 'updateAppData':
        updateAppData(value);
        // 同步更新被选模块的属性
        if (activationItem.moduleId === undefined) return;
        const asynAcactivationItem = (value as AppDataListTypes).find(
          (item) => item.moduleId === activationItem.moduleId,
        );
        if (asynAcactivationItem?.moduleId) {
          updateActivationItem(asynAcactivationItem);
        }
        break;
      case 'updateRunningTimes':
        setRunningTimes(value);
        break;
      case 'updatePage':
        updatePageData(value);
        break;
      case 'id':
        // 设置当前项正在被编辑
        // 禁止重复设置当前编辑项
        if (activationItem.moduleId === value) return;
        for (let index = 0; index < appData.length; index++) {
          const element = appData[index];
          if (element.moduleId === value) {
            updateActivationItem({ ...element });
            break;
          }
        }
        setShowDashboard(true);
        break;
      case 'record':
        saveRecord(value)
        break
      default:
        break;
    }
  });

  // 收发处理，子窗口onload时向子窗口发送信息, 通知当前正处于编辑模式下，
  const win: Window | null = ref.current
    ? (ref.current as any).contentWindow
    : null;

  useEffect(() => {
    const windows = (document.getElementById('wrapiframe') as any)
      ?.contentWindow;
    if (windows && !isCreate) {
      windows.onload = () => {
        sendMessage({ tag: 'setIsEditing', value: true }, windows);
        setIsEditing(true);
        setIsReady(true);
        sethideIframe(false);
      };
    }
  }, [sendMessage, setIsEditing, isCreate, setIsReady]);

  useEffect(() => {
    sendMessage({ tag: 'setIsEditing', value: true }, win);
    setIsEditing(true);
  }, [sendMessage, setIsEditing, win]);

  const toggleEdit = useCallback(() => {
    const states = !isEditing;
    sendMessage({ tag: 'setIsEditing', value: states }, win);
    setIsEditing(states);
  }, [isEditing, sendMessage, setIsEditing, win]);

  const toggleCreate = useCallback(() => {
    setIsCreate(!isCreate);
  }, [isCreate]);

  // 收发处理，编辑完数据后通过sendMessage向子窗口发送最新数据。
  useEffect(() => {
    sendMessage(
      {
        tag: 'updateAppData',
        value: appData,
      },
      win,
    );
  }, [sendMessage, win, appData]);

  const onChangeRule = (
    width: number,
    height: number = window.innerHeight - 140,
  ) => {
    setWindowWidth(width);
    setWindowHeight(height);
    const optPageData = { ...pageData };
    optPageData.windowWidth = width;
    optPageData.windowHeight = height;
    setLocalPageData(optPageData);
    if (win) {
      sendMessage({ tag: 'updatePage', value: true }, win);
      sendMessage({ tag: 'setIsEditing', value: isEditing }, win);
    }
    setIsEditing(true);
    forceUpdateByStateTag();
  };

  const [showDashboard, setShowDashboard] = useState(false);
  const [opacity, setOpacity] = useState('1');
  // 无激活模块时隐藏设置面板
  useEffect(() => {
    if (!activationItem.moduleId) {
      setShowDashboard(false);
    }
  }, [activationItem]);

  const hideDashboard = useCallback(() => {
    setShowDashboard(false);
    removeActivationItem();
    if (win) {
      sendMessage({ tag: 'removeActivationItem', value: undefined }, win);
    }
  }, [removeActivationItem, sendMessage, win]);

  const updateProject = useCallback(
    (data: Template) => {
      data.id = pageData.template?.id;
      return updateTemplate(data);
    },
    [pageData],
  );

  interface TemplateAll extends Template {
    pageData: string;
    appData: string;
  }

  // 保存或更新项目
  const onSaveProject = useCallback(
    async ({
      cove = [],
      terminal,
      isPublic,
      describe,
      tag,
      title,
      id,
    }: TemplateInfo) => {
      if (!auth?.isLogin) {
        history.push('/login');
        return;
      }

      // copy
      const pageDataCopy = cloneDeep(pageData);
      
      // template数据
      const templateData: Template = {
        title: title || pageData.pageTitle,
        terminal,
        cove: cove[0]?.thumbUrl,
        describe,
        tag: tag?.join(','),
        isPublic: isPublic === true ? 1 : 0,
      };
      // 存入模板信息到pageData
      if (!pageDataCopy.template) {
        pageDataCopy.template = templateData;
      }

      // 完整数据
      /**
       * 完整数据包含页面数据、组件数据与模板信息三个部分，
       * 页面数据同时也包含一份模板信息供页面处理
       */
      const params: TemplateAll = {
        pageData: JSON.stringify(pageData),
        appData: JSON.stringify(appData),
        id,
        userId: auth.session?.id,
        ...templateData,
      };

      // 更新
      if (!!pageData.template?.id) {
        await updateProject(params);
      } else {
        // 新增
        const newId = await createTemplate(params);
        pageDataCopy.template.id = newId;
      }
      message.success('已发布');
      // 更新
      updatePageData(pageDataCopy);
      // 关闭弹窗
      setShowTemplateModal(false);
      // todo 展示二维码与模板访问链接，支持扫码访问
      setVisibleQrcode(true);
    },
    [
      appData,
      auth?.isLogin,
      auth?.session?.id,
      history,
      pageData,
      updatePageData,
      updateProject,
    ],
  );

  const showPublishModal = useCallback(() => {
    if (!auth?.isLogin) {
      history.push('/login');
    }
    setShowTemplateModal(true);
  }, [auth?.isLogin, history]);

  const pageSearch = stringify({tpl: pageData.template?.id, ...runningTimes.search, isediting: true});

  const viewUrl = `${process.env.REACT_APP_SITE_PATH || ''}${pageSearch ? `?${pageSearch}` : ''}`;

  return (
    <>
      {isCreate ? (
        <CreateProject goBack={() => toggleCreate()} />
      ) : (
        <div className={s.main}>
          {showDashboard && isEditing ? (
            <Draggable
              axis="both"
              handle={`.${s.header}`}
              onDrag={() => setOpacity('0.5')}
              onStop={() => setOpacity('1')}
            >
              <div className={s.dashboard} style={{ opacity }}>
                <div className={s.header}>
                  <h3>设置面板</h3>
                  <CloseOutlined className={s.icon} onClick={hideDashboard} />
                </div>
                <MiniDashboard />
              </div>
            </Draggable>
          ) : null}
          <div className={s.topmenu}>
            <div className={s.create}>
              <Button
                type="primary"
                onClick={toggleCreate}
                icon={<FileAddOutlined />}
              />
              &nbsp;
              {!isEditing ? (
                <Button
                  type="default"
                  className={s.toggle}
                  onClick={toggleEdit}
                  icon={<EditOutlined />}
                />
              ) : null}
              {isEditing ? (
                <Button
                  type="default"
                  className={s.toggle}
                  onClick={toggleEdit}
                  icon={<EyeOutlined />}
                />
              ) : null}
              &nbsp;
              <Button
                type="default"
                icon={<SettingOutlined />}
                onClick={() => setShowPageDrawer(true)}
              >
                页面
              </Button>
              &nbsp;
              <Button
                type="default"
                icon={<PlusOutlined />}
                onClick={() => setShowDrawer(true)}
              >
                组件
              </Button>
              &nbsp;
              <Undo />
              {process.env.REACT_APP_DEMO === 'true' ? (
                <>
                  &nbsp;
                  <a href="https://github.com/eightfeet/yugong">
                    <Button type="default" icon={<GithubOutlined />}>
                      github
                    </Button>
                  </a>
                </>
              ) : null}
            </div>
            <div className={s.save}>
              <Button
                type="primary"
                icon={<CloudUploadOutlined />}
                onClick={showPublishModal}
              >
                {pageData.template?.id ? '修改' : '发布'}
              </Button>
              {pageData.template?.id ? <>
                &nbsp;
                <Button
                  icon={<QrcodeOutlined />}
                  onClick={() => setVisibleQrcode(true)}
                />
              </> : null}
              
            </div>
          </div>
          <Ruler onChange={onChangeRule} />
          <Drawer
            className={s.drawer}
            title="页面设置"
            width={580}
            onClose={() => setShowPageDrawer(false)}
            visible={showPageDrawer}
            bodyStyle={{ padding: '0', overflow: 'auto' }}
            maskStyle={{ backgroundColor: 'transparent' }}
            footer={null}
          >
            {showPageDrawer ? <PageSetting /> : null}
          </Drawer>
          <Drawer
            className={s.drawer}
            title="组件库"
            width={580}
            onClose={() => setShowDrawer(false)}
            visible={showDrawer}
            bodyStyle={{ padding: '0px' }}
            maskStyle={{ backgroundColor: 'transparent' }}
            footer={null}
          >
            <Repository />
          </Drawer>
          <div className={s.box}>
            <div
              className={classNames({
                [s.viewbg]: !isEditing,
              })}
              style={{ transition: 'all 0.5s' }}
            />
            {!stateTag ? (
              <div
                className={s.iframebox}
                style={{
                  width:
                    pageData.windowWidth === -1
                      ? `100%`
                      : `${pageData.windowWidth}px`,
                  height: `${pageData.windowHeight}px`,
                }}
              >
                <LoadingAnimate />
                <iframe
                  ref={ref}
                  id="wrapiframe"
                  title="wrapiframe"
                  src={viewUrl}
                  style={{
                    border: 'none',
                    opacity: hideIframe ? 0 : 1,
                    minWidth: '100%',
                    minHeight: `${pageData.windowHeight}px`,
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
      <TemplateInfoModal
        visible={showTemplateModal}
        onOk={onSaveProject}
        onCancel={() => setShowTemplateModal(false)}
      />
      <QrcodeModal 
        visible={visibleQrcode}
        onCancel={() => setVisibleQrcode(false)}
        sourceData={viewUrl}
        title="请扫码访问"
        info={<div className={s.viewurl}>访问地址:<a href={viewUrl} target={'_blank'} rel="noreferrer">{viewUrl}</a></div>}
        options={{
          width: 122,
          margin: 1
        }} 
      />
    </>
  );
};

export default Responsive;
