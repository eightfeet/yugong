import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Card,
  PageHeader,
  Divider,
  Select,
  Button,
  Modal,
  Input,
  Tooltip,
} from "antd";
import React, { useCallback } from "react";
import CreateEditIcon from "./CreateEditIcon";
import EmptyIcon from "./EmptyIcon";
import data from "./template.json";
import s from "./CreateProject.module.less";
import useLocalStorage from "~/hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { Dispatch } from "~/redux/store";

const { Meta } = Card;
const { Option } = Select;
const { confirm } = Modal;

interface Props {
  goBack: () => void;
}

const Createproject: React.FC<Props> = ({ goBack }) => {
  const [localAppData] = useLocalStorage("appData", null);
  const [localPageData] = useLocalStorage("pageData", null);
  console.log('localPageData',  localPageData)
  const dispatch = useDispatch<Dispatch>();

  const initData = useCallback(() => {
    dispatch.pageData.initPageData();
    dispatch.controller.initController();
    dispatch.activationItem.removeActivationItem();
    dispatch.appData.initAppData();
    window.localStorage.removeItem("pageData");
    window.localStorage.removeItem("appData");
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

  const children: any[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i} value={i.toString(36) + i}>
        {i.toString(36) + i}
      </Option>
    );
  }
  return (
    <div>
      <PageHeader
        backIcon={null}
        onBack={goBack}
        title="创建"
        subTitle="创建空白项目或从模板创建新项目"
      />
      <Row gutter={[24, 24]}>
        {(localAppData?.length || localPageData) ? (
          <Col span={5}>
            <Card
              hoverable
              onClick={goBack}
              style={{ width: "90%" }}
              cover={
                <div className={s.projectcove}>
                  <CreateEditIcon />
                </div>
              }
            >
              <Meta className={s.mate} title="继续编辑" />
            </Card>
          </Col>
        ) : null}
        <Col span={5}>
          <Card
            hoverable
            onClick={confirmModal}
            style={{ width: "90%" }}
            cover={
              <div className={s.projectcove}>
                <PlusOutlined className={s.addicon} />
              </div>
            }
          >
            <Meta className={s.mate} title="创建空白模板" />
          </Card>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        从模板创建
      </Divider>
      <Row gutter={[5, 24]}>
        <Col span={4}>
          <Tooltip title="请输入模板名称">
            <Input type="text" placeholder="模版名称" />
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip title="按终端类型查找">
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="终端类型"
              defaultValue={"pc"}
              onChange={() => {}}
            >
              <Option value="mobile">移动端</Option>
              <Option value="pc">PC端</Option>
            </Select>
          </Tooltip>
        </Col>
        <Col span={8}>
          <Tooltip title="按模板类型查找">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="模板类型"
              defaultValue={["a10", "c12"]}
              onChange={() => {}}
            >
              {children}
            </Select>
          </Tooltip>
        </Col>
        <Col span={2}>
          <Button type="default" icon={<SearchOutlined />}>
            查找模板
          </Button>
        </Col>
      </Row>
      <br />

      <Row gutter={[24, 24]}>
        {data.map((item, index) => (
          <Col key={index} span={5}>
            <Card
              hoverable
              style={{ width: "90%" }}
              cover={
                <div className={s.projectcove}>
                  <EmptyIcon />
                </div>
              }
            >
              <Meta title={item.title} description={item.discript} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Createproject;
