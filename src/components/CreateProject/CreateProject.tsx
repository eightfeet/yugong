import { PlusOutlined } from '@ant-design/icons';
import { Card, PageHeader, Modal } from 'antd';
import React, { useCallback, useState } from 'react';
import CreateEditIcon from './CreateEditIcon';
import s from './CreateProject.module.less';
import useLocalStorage from '~/hooks/useLocalStorage';
import { useDispatch } from 'react-redux';
import { Dispatch } from '~/redux/store';
import TemplateList from '../TemplateList';
import { AppDataListTypes } from '~/types/appData';
import { queryTemplateById } from '~/api';
import { PageData } from '~/types/pageData';
import { trackEvent } from '~/core/tracking';
import {
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_ROWHEIGHT,
  GRID_DEFAULT_SPACE,
  DEFAULT_PAGE_WIDTH,
  DEFAULT_PAGE_HEIGHT,
} from '~/core/constants';
import CreateMobile from '../Icon/CreateMobile';
import Mobile from '../Icon/Mobile';
import mobileData from './mobile.json';

const { Meta } = Card;
const { confirm } = Modal;

interface Props {
  goBack: () => void;
  /**创建项目时 */
  onCreating?: () => void;
}

const Createproject: React.FC<Props> = ({ goBack, onCreating }) => {
  const [localAppData, setLocalAppData] = useLocalStorage('appData', null);
  const [localPageData, setLocalPageData] = useLocalStorage('pageData', null);
  const [showMobile, setShowMobile] = useState(false);
  const dispatch = useDispatch<Dispatch>();

  const initData = useCallback(() => {
    if (onCreating instanceof Function) {
      onCreating();
    }
    window.localStorage.removeItem('pageData');
    window.localStorage.removeItem('appData');
    dispatch.pageData.initPageData({
      cols: GRID_DEFAULT_COLS,
      rowHeight: GRID_DEFAULT_ROWHEIGHT,
      space: GRID_DEFAULT_SPACE,
      windowWidth: DEFAULT_PAGE_WIDTH,
      windowHeight: DEFAULT_PAGE_HEIGHT,
    });
    dispatch.controller.initController();
    dispatch.controller.setIsEditing(true);
    dispatch.activationItem.removeActivationItem();
    dispatch.appData.initAppData();
  }, [
    dispatch.activationItem,
    dispatch.appData,
    dispatch.controller,
    dispatch.pageData,
    onCreating,
  ]);

  const createBlank = useCallback(() => {
    trackEvent('点击', '创建空白');
    /**初始化 */
    initData();
    dispatch.record.initRecord();
    goBack();
  }, [dispatch.record, goBack, initData]);

  const createMobile = useCallback((width: number) => {
    setShowMobile(false);
    /**初始化 */
    initData();
    trackEvent('点击', '创建移动端');
     /**重置记录 */
     dispatch.record.initRecord();
     /**序列化模板数据 */
     const parsePageData: PageData = {
      "unit": "px",
      "toUnit": "rem",
      "cols": width < 2048 ? 24 : 48,
      "rowHeight": width < 2048 ? "{{unit.rem}}" : "{{unit.rem/2}}",
      "space": 0,
      "windowWidth": width < 2048 ? 414 : 768,
      "UIWidth": width,
      "baseFont": width/24
     };
     setLocalPageData(parsePageData);
     dispatch.pageData.updatePage(parsePageData);
     goBack();
  }, [dispatch.pageData, dispatch.record, goBack, initData, setLocalPageData]);

  const confirmModal = useCallback(
    (type: 'mobile' | 'blank') => {
      if (!localAppData?.length && !localPageData) {
        if (type === 'blank') createBlank();
        if (type === 'mobile') setShowMobile(true);
        return;
      }
      confirm({
        content: (
          <div>当前有历史页面正在编辑，创建模板将清除历史数据！</div>
        ),
        okText: '确定',
        cancelText: '取消',
        onCancel: () => { },
        onOk: () => {
          if (type === 'blank') createBlank();
          if (type === 'mobile') setShowMobile(true);
        },
      });
    },
    [createBlank, localAppData?.length, localPageData],
  );

  const getTemplate = useCallback((id) => {
    return queryTemplateById(id);
  }, []);

  const onSelectedTemplate = useCallback(
    (id, type: 'edit' | 'create') => {
      const fn = async () => {
        /**根据id查找模板 */
        const data = await getTemplate(id);
        /**
         * 从模板中获取
         * 分为三块内容页面pageData、组件数据appData、与当前页面的模板信息templateArg
         * */
        const { appData, pageData, ...templateArg } = data;
        /**初始化 */
        initData();
        /**重置记录 */
        dispatch.record.initRecord();
        /**序列化模板数据 */
        const parseAppData: AppDataListTypes = JSON.parse(appData || '"[]"');
        const parsePageData: PageData = JSON.parse(pageData || '"{}"');
        /**清除模板信息中的id */
        if (type === 'create') {
          delete templateArg.id;
        }

        parsePageData.template = templateArg;
        setLocalAppData(parseAppData);
        setLocalPageData(parsePageData);
        dispatch.appData.updateAppData(parseAppData);
        dispatch.pageData.updatePage(parsePageData);
        goBack();
      };

      if (!localAppData?.length && !localPageData) {
        fn();
        return;
      }

      confirm({
        content: (
          <div>
            当前有历史页面正在编辑，{type === 'create' ? '创建新' : '编辑'}
            模板将清除历史数据！
          </div>
        ),
        okText: '确定',
        cancelText: '取消',
        onCancel: () => { },
        onOk: fn,
      });
    },
    [
      dispatch.appData,
      dispatch.pageData,
      dispatch.record,
      getTemplate,
      goBack,
      initData,
      localAppData?.length,
      localPageData,
      setLocalAppData,
      setLocalPageData,
    ],
  );

  return (
    <div>
      <PageHeader
        backIcon={null}
        onBack={goBack}
        title="创建"
        subTitle="创建空白项目或从模板创建新项目"
      />
      <div className={s.container}>
        {localAppData?.length || localPageData ? (
          <Card
            className={s.card}
            hoverable
            onClick={goBack}
            cover={
              <div className={s.projectcove}>
                <CreateEditIcon />
              </div>
            }
          >
            <Meta className={s.mate} title="继续编辑" />
          </Card>
        ) : null}
        <Card
          className={s.card}
          hoverable
          onClick={() => confirmModal('mobile')}
          cover={
            <div className={s.projectcove}>
              <CreateMobile className={s.addicon} />
            </div>
          }
        >
          <Meta className={s.mate} title="创建移动端页面" />
        </Card>
        <Card
          className={s.card}
          hoverable
          onClick={() => confirmModal('blank')}
          cover={
            <div className={s.projectcove}>
              <PlusOutlined className={s.addicon} />
            </div>
          }
        >
          <Meta className={s.mate} title="创建空白页面" />
        </Card>
      </div>
      <TemplateList onSelectedTemplate={onSelectedTemplate} />
      <Modal onCancel={() => setShowMobile(false)} width={800} className={s.mobileplan} footer={null} visible={showMobile} title="请选择设计稿宽度">
        <div className={s.uiwrap}>
          {mobileData.map((item) => (
            <Card
              key={item.width}
              className={s.mobilecard}
              hoverable
              onClick={() => createMobile(item.width)}
            >
              <div className={s.mobilecove}>
                <span className={s.mobileiconwrap}>
                  <Mobile />
                </span>
                <Meta
                  className={s.mobilemate}
                  title={`UI宽度: ${item.width}px`}
                  description={item.name}
                />
              </div>
            </Card>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Createproject;
