import { PlusOutlined } from '@ant-design/icons';
import { Card, PageHeader, Modal } from 'antd';
import React, { useCallback } from 'react';
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
    goBack();
  }, [goBack, initData]);

  const confirmModal = useCallback(() => {
    if (!localAppData?.length && !localPageData) {
      createBlank();
      return;
    }
    confirm({
      content: <div>当前有历史页面正在编辑，创建空白模板将清除历史数据！</div>,
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: createBlank,
    });
  }, [createBlank, localAppData?.length, localPageData]);

  const getTemplate = useCallback((id) => {
    return queryTemplateById(id);
  }, []);

  const onSelectedTemplate = useCallback(
    (id, type: 'edit' | 'create') => {
      const fn = async () => {
        const data = await getTemplate(id);
        const { appData, pageData, ...templateArg } = data;

        /**初始化 */
        initData();

        const parseAppData: AppDataListTypes = JSON.parse(appData || '"[]"');
        const parsePageData: PageData = JSON.parse(pageData || '"{}"');

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
        onCancel: () => {},
        onOk: fn,
      });
    },
    [
      dispatch.appData,
      dispatch.pageData,
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
          onClick={confirmModal}
          cover={
            <div className={s.projectcove}>
              <PlusOutlined className={s.addicon} />
            </div>
          }
        >
          <Meta className={s.mate} title="创建空白模板" />
        </Card>
      </div>
      <TemplateList onSelectedTemplate={onSelectedTemplate} />
    </div>
  );
};

export default Createproject;
