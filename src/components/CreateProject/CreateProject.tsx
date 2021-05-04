import { PlusOutlined } from "@ant-design/icons";
import { Card, PageHeader, Modal } from "antd";
import React, { useCallback } from "react";
import CreateEditIcon from "./CreateEditIcon";
import s from "./CreateProject.module.less";
import useLocalStorage from "~/hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { Dispatch } from "~/redux/store";
import TemplateList from "../TemplateList";
import request from "~/core/request";

const { Meta } = Card;
const { confirm } = Modal;

interface Props {
  goBack: () => void;
}

const Createproject: React.FC<Props> = ({ goBack }) => {
  const [localAppData, setLocalAppData] = useLocalStorage("appData", null);
  const [localPageData, setLocalPageData] = useLocalStorage("pageData", null);
  const dispatch = useDispatch<Dispatch>();

  const initData = useCallback(() => {
    window.localStorage.removeItem("pageData");
    window.localStorage.removeItem("appData");
    dispatch.pageData.initPageData();
    dispatch.controller.initController();
    dispatch.controller.setIsEditing(true);
    dispatch.activationItem.removeActivationItem();
    dispatch.appData.initAppData();
  }, [
    dispatch.activationItem,
    dispatch.appData,
    dispatch.controller,
    dispatch.pageData,
  ]);

  const createBlank = useCallback(() => {
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
      okText: "确定",
      cancelText: "取消",
      onCancel: () => {},
      onOk: createBlank,
    });
  }, [createBlank, localAppData?.length, localPageData]);

  const onSelectedTemplate = useCallback(
    async (id) => {
      const { appData, pageData } = await request.get(`/template/${id}.json`);

      const fn = () => {
        /**初始化 */
        initData();
        setLocalAppData(appData);
        setLocalPageData(pageData);
        dispatch.appData.updateAppData(appData);
        dispatch.pageData.updatePage(pageData);
        goBack();
      };

      if (!localAppData?.length && !localPageData) {
        fn();
        return;
      }

      confirm({
        content: (
          <div>当前有历史页面正在编辑，创建新模板将清除历史数据！</div>
        ),
        okText: "确定",
        cancelText: "取消",
        onCancel: () => {},
        onOk: fn,
      });
    },
    [
      dispatch.appData,
      dispatch.pageData,
      goBack,
      initData,
      localAppData?.length,
      localPageData,
      setLocalAppData,
      setLocalPageData,
    ]
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
